import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a standard Supabase client for server-side usage
 */
export function createClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

/**
 * Creates an admin Supabase client that bypasses Row Level Security (RLS).
 * Use this for server-side operations that need to insert/update data
 * without user authentication constraints.
 */
export function createAdminClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
