import { headers } from 'next/headers';

/**
 * Derive base URL for server-side fetch calls so API routes work in both dev and prod.
 */
export function getBaseUrl(): string {
  const host = headers().get('host') || 'localhost:3000';
  const isLocalhost = host.includes('localhost') || host.startsWith('127.');
  const protocol = isLocalhost ? 'http' : 'https';
  return `${protocol}://${host}`;
}
