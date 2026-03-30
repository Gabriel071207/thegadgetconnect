
-- Drop the overly permissive SELECT policy
DROP POLICY "Anyone can read orders" ON public.orders;

-- Drop the insecure UPDATE policy that uses current_setting('role')
DROP POLICY "Service role can update orders" ON public.orders;

-- No new SELECT/UPDATE policies needed: service_role bypasses RLS by default,
-- and edge functions already use service_role key for reads/updates.

-- Tighten INSERT policy with better validation
DROP POLICY "Allow order insertion" ON public.orders;

CREATE POLICY "Allow order insertion with validation" ON public.orders
  FOR INSERT TO public
  WITH CHECK (
    customer_name IS NOT NULL
    AND customer_email IS NOT NULL
    AND customer_phone IS NOT NULL
    AND shipping_address IS NOT NULL
    AND payment_status = 'pending'
    AND total_amount > 0
    AND length(customer_name) <= 200
    AND length(customer_email) <= 255
    AND length(customer_phone) <= 30
    AND length(shipping_address) <= 500
    AND customer_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  );
