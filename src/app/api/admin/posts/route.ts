import { NextResponse } from 'next/server';
import { createPost, listPosts } from '@/lib/storage';
import type { PostPayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PostPayload;
    const post = await createPost(payload);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : '投稿の作成に失敗しました';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
