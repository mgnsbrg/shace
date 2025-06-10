/*
  # Initial Database Schema

  1. New Tables
    - `offices`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (integer)
      - `address` (text)
      - `lat` (numeric)
      - `lng` (numeric)
      - `image` (text)
      - `host_name` (text)
      - `host_email` (text)
      - `created_at` (timestamp)
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `office_id` (uuid, foreign key to offices)
      - `price` (integer)
      - `status` (text)
      - `created_at` (timestamp)
    - `conversations`
      - `id` (uuid, primary key)
      - `guest_id` (uuid, foreign key to auth.users)
      - `host_id` (uuid, foreign key to auth.users)
      - `subject` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key to conversations)
      - `sender_id` (uuid, foreign key to auth.users)
      - `content` (text)
      - `created_at` (timestamp)
    - `support_messages`
      - `id` (uuid, primary key)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create offices table
CREATE TABLE IF NOT EXISTS offices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  address text DEFAULT '',
  lat numeric,
  lng numeric,
  image text DEFAULT 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
  host_name text DEFAULT '',
  host_email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  office_id uuid REFERENCES offices(id) ON DELETE CASCADE,
  price integer NOT NULL DEFAULT 0,
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  host_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text DEFAULT 'Direktmeddelande',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create support_messages table
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for offices
CREATE POLICY "Anyone can view offices"
  ON offices FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Hosts can insert their own offices"
  ON offices FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = host_email);

CREATE POLICY "Hosts can update their own offices"
  ON offices FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = host_email);

CREATE POLICY "Hosts can delete their own offices"
  ON offices FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = host_email);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for conversations
CREATE POLICY "Users can view their conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = guest_id OR auth.uid() = host_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = guest_id OR auth.uid() = host_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND (conversations.guest_id = auth.uid() OR conversations.host_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND (conversations.guest_id = auth.uid() OR conversations.host_id = auth.uid())
    )
  );

-- RLS Policies for support_messages
CREATE POLICY "Anyone can create support messages"
  ON support_messages FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample data
INSERT INTO offices (title, description, price, address, lat, lng, host_name, host_email) VALUES
('Modern Coworking Space', 'Ett modernt kontorsutrymme i hjärtat av Stockholm', 500, 'Drottninggatan 1, Stockholm', 59.3293, 18.0686, 'Anna Andersson', 'anna@example.com'),
('Creative Studio', 'Kreativ studio perfekt för designteam', 750, 'Södermalm, Stockholm', 59.3165, 18.0707, 'Erik Eriksson', 'erik@example.com'),
('Executive Office', 'Exklusivt kontor med utsikt över vattnet', 1200, 'Östermalm, Stockholm', 59.3378, 18.0895, 'Maria Larsson', 'maria@example.com'),
('Startup Hub', 'Flexibelt utrymme för startups och entreprenörer', 400, 'Vasastan, Stockholm', 59.3467, 18.0508, 'Johan Johansson', 'johan@example.com');