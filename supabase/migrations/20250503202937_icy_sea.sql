/*
  # Add Pterodactyl Integration Tables

  1. New Tables
    - `pterodactyl_credentials`: Stores user credentials for Pterodactyl panel
      - Links to Supabase users
      - Stores encrypted password
      - Implements soft delete
    
    - `pterodactyl_servers`: Stores server information
      - Links to stripe_customers
      - Stores server configuration
      - Implements soft delete

  2. Security
    - Enables RLS on all tables
    - Implements policies for authenticated users
*/

-- Create table for storing Pterodactyl credentials
CREATE TABLE pterodactyl_credentials (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  email text NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT null
);

ALTER TABLE pterodactyl_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credentials"
  ON pterodactyl_credentials
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

-- Create enum for server types
CREATE TYPE minecraft_server_type AS ENUM (
  'vanilla',
  'spigot',
  'paper',
  'forge',
  'fabric',
  'neoforge'
);

-- Create table for storing server information
CREATE TABLE pterodactyl_servers (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id text NOT NULL REFERENCES stripe_customers(customer_id),
  server_id text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  server_type minecraft_server_type NOT NULL DEFAULT 'vanilla',
  minecraft_version text NOT NULL DEFAULT '1.20.4',
  subdomain text,
  memory integer NOT NULL,
  disk integer NOT NULL,
  cpu integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT null
);

ALTER TABLE pterodactyl_servers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own servers"
  ON pterodactyl_servers
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id 
      FROM stripe_customers 
      WHERE user_id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- Create view for user servers
CREATE VIEW user_pterodactyl_servers WITH (security_invoker = true) AS
SELECT 
  ps.*,
  pc.email as pterodactyl_email,
  pc.password as pterodactyl_password
FROM pterodactyl_servers ps
JOIN stripe_customers sc ON ps.customer_id = sc.customer_id
JOIN pterodactyl_credentials pc ON sc.user_id = pc.user_id
WHERE sc.user_id = auth.uid()
AND ps.deleted_at IS NULL
AND sc.deleted_at IS NULL
AND pc.deleted_at IS NULL;