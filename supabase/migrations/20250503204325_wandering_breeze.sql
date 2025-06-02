/*
  # Add Billing Intervals Support

  1. Changes
    - Add billing_interval column to stripe_subscriptions table
    - Add quarterly_discount column to store the discount percentage
    - Update existing subscriptions to have 'monthly' as default interval
*/

ALTER TABLE stripe_subscriptions
ADD COLUMN billing_interval text NOT NULL DEFAULT 'monthly',
ADD COLUMN quarterly_discount integer NOT NULL DEFAULT 15;

-- Update existing subscriptions to monthly billing
UPDATE stripe_subscriptions 
SET billing_interval = 'monthly' 
WHERE billing_interval IS NULL;