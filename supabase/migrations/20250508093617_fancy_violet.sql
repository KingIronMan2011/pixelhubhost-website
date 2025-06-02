/*
  # Add Billing Fields to Pterodactyl Credentials

  1. Changes
    - Add billing_id to track associated subscription/order
    - Add billing_type to distinguish between subscription and one-time purchases
    - Add billing_status to track payment status
*/

ALTER TABLE pterodactyl_credentials
ADD COLUMN billing_id text,
ADD COLUMN billing_type text CHECK (billing_type IN ('subscription', 'order')),
ADD COLUMN billing_status text;

-- Index for faster lookups
CREATE INDEX pterodactyl_credentials_billing_idx ON pterodactyl_credentials(billing_id, billing_type);