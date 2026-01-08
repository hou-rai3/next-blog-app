import { NextResponse } from 'next/server';
import { listCategories } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json({ categories });
}
