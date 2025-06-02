/*
  # Add Email Settings Table

  1. New Table
    - `email_settings`: Stores email configuration
      - Includes sender display name
      - Implements soft delete
      - Default values for initial setup

  2. Security
    - Enables RLS
    - Only admins can modify settings
*/

CREATE TABLE IF NOT EXISTS email_settings (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sender_name text NOT NULL DEFAULT 'PixelHub Host',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT null
);

ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

-- Insert default settings
INSERT INTO email_settings (sender_name) VALUES ('PixelHub Host');

-- Only allow authenticated users to read settings
CREATE POLICY "Anyone can view email settings"
  ON email_settings
  FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Only allow service role to update settings
CREATE POLICY "Service role can update email settings"
  ON email_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);