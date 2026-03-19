
-- Fix permissive policies: restrict INSERT to only allow specific fields and UPDATE to service role only
DROP POLICY "Anyone can insert orders" ON public.orders;
DROP POLICY "Anyone can update orders" ON public.orders;

-- More restrictive insert - still open but prevents abuse via edge function validation
CREATE POLICY "Allow order insertion" ON public.orders FOR INSERT WITH CHECK (
  customer_name IS NOT NULL AND customer_email IS NOT NULL AND payment_status = 'pending'
);

-- Updates only through service role (edge functions)
CREATE POLICY "Service role can update orders" ON public.orders FOR UPDATE USING (
  (current_setting('role') = 'service_role')
);
