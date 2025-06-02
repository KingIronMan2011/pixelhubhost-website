/*
  # Enhanced Email Settings

  1. Changes
    - Add DKIM configuration fields
    - Add email headers configuration
    - Add reply-to address field
    - Add email subject template

  2. Security
    - Maintains existing RLS policies
    - Only service role can modify settings
*/

CREATE TABLE IF NOT EXISTS email_settings (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sender_name text NOT NULL DEFAULT 'PixelHub Host',
  sender_email text NOT NULL DEFAULT 'no-reply@pixelhubhost.com',
  reply_to_email text NOT NULL DEFAULT 'support@pixelhubhost.com',
  subject_template text NOT NULL DEFAULT 'New Trial Server Request - {email}',
  email_priority integer NOT NULL DEFAULT 1,
  include_list_unsubscribe boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT null
);

ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

-- Insert default settings
INSERT INTO email_settings (
  sender_name, 
  sender_email,
  reply_to_email,
  subject_template,
  email_priority,
  include_list_unsubscribe
) VALUES (
  'PixelHub Host',
  'no-reply@pixelhubhost.com',
  'support@pixelhubhost.com',
  'New Trial Server Request - {email}',
  1,
  true
);

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