import { NextResponse } from 'next/server';
import { listPosts } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts });
}
