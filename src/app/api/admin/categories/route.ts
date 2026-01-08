import { NextResponse } from 'next/server';
import { createCategory, listCategories } from '@/lib/storage';
import type { CategoryPayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CategoryPayload;
    const category = await createCategory(payload);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'カテゴリーの作成に失敗しました';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
