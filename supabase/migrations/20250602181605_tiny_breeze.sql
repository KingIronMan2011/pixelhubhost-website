/*
  # Add Status Field to Pterodactyl Credentials

  1. Changes
    - Add status to track server status
*/

ALTER TABLE pterodactyl_credentials
ADD COLUMN status text;