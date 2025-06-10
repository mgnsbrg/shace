import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // Fetch conversations for user
  useEffect(() => {
    if (!user) return;
    const fetchConversations = async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .or(`guest_id.eq.${user.id},host_id.eq.${user.id}`)
        .order("updated_at", { ascending: false });
      setConversations(data || []);
    };
    fetchConversations();
  }, [user]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConv) return;
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedConv.id)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();

    // Real-time subscription for new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selectedConv.id}` },
        (payload) => {
          setMessages((msgs) => [...msgs, payload.new]);
          setNotifications((n) => [
            ...n,
            {
              id: payload.new.id,
              text:
                payload.new.sender_id === user.id
                  ? "Meddelande skickat!"
                  : "Nytt svar från värd/gäst!",
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConv, user]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !selectedConv) return;
    await supabase.from("messages").insert([
      {
        conversation_id: selectedConv.id,
        sender_id: user.id,
        content: input,
      },
    ]);
    setInput("");
    // Conversation updated_at will be updated via trigger or manually if needed
  };

  // Notification for booking updates (simulate, real implementation would use triggers/functions)
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("bookings")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setNotifications((n) => [
            ...n,
            {
              id: payload.new.id,
              text: "Din bokning har uppdaterats!",
            },
          ]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="flex h-[80vh]">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-xl mb-2">Konversationer</h2>
        {conversations.length === 0 && <div>Inga konversationer än.</div>}
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`p-2 mb-2 cursor-pointer rounded ${selectedConv?.id === conv.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
            onClick={() => setSelectedConv(conv)}
          >
            {conv.subject || "Direktmeddelande"}
          </div>
        ))}
        <div className="mt-4">
          <h3 className="font-bold">Aviseringar</h3>
          {notifications.map((n) => (
            <div key={n.id} className="text-green-700 text-sm">{n.text}</div>
          ))}
        </div>
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {selectedConv ? (
          <>
            <div className="flex-1 overflow-y-auto mb-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded ${msg.sender_id === user.id ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}
                >
                  {msg.content}
                  <div className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border p-2 rounded-l"
                placeholder="Skriv ett meddelande..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
                Skicka
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500 flex-1 flex items-center justify-center">
            Välj en konversation för att börja chatta.
          </div>
        )}
      </div>
    </div>
  );
}
