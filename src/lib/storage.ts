import fs from 'fs/promises';
import path from 'path';
import type { Category, CategoryPayload, Post, PostPayload, PostWithCategory } from './types';
import seed from '../../data/store.json';

export type DataShape = {
  categories: Category[];
  posts: Post[];
};

const dataPath = path.join(process.cwd(), 'data', 'store.json');

const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }
  return null;
};

const now = () => new Date().toISOString();

async function ensureFile(): Promise<void> {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(seed, null, 2), 'utf8');
  }
}

async function readData(): Promise<DataShape> {
  await ensureFile();
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw) as DataShape;
}

async function writeData(data: DataShape): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

function nextId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
}

function buildExcerpt(input: string, fallbackFrom: string): string {
  const base = input?.trim() ? input.trim() : fallbackFrom;
  if (!base) return '';
  const plain = base.replace(/\n+/g, ' ');
  return plain.length > 140 ? `${plain.slice(0, 140)}...` : plain;
}

export async function listCategories(): Promise<Category[]> {
  const data = await readData();
  return data.categories.sort((a, b) => a.id - b.id);
}

export async function createCategory(payload: CategoryPayload): Promise<Category> {
  const name = payload.name?.trim();
  if (!name) {
    throw new Error('カテゴリー名を入力してください');
  }

  const data = await readData();
  if (data.categories.some((c) => c.name === name)) {
    throw new Error('同じ名前のカテゴリーが既に存在します');
  }

  const category: Category = {
    id: nextId(data.categories),
    name,
    createdAt: now(),
    updatedAt: now(),
  };

  data.categories.push(category);
  await writeData(data);
  return category;
}

export async function updateCategory(id: number, payload: CategoryPayload): Promise<Category> {
  const data = await readData();
  const category = data.categories.find((c) => c.id === id);

  if (!category) {
    throw new Error('指定されたカテゴリーが見つかりません');
  }

  const name = payload.name?.trim();
  if (!name) {
    throw new Error('カテゴリー名を入力してください');
  }

  category.name = name;
  category.updatedAt = now();
  await writeData(data);
  return category;
}

export async function deleteCategory(id: number): Promise<void> {
  const data = await readData();
  const beforeLength = data.categories.length;
  data.categories = data.categories.filter((c) => c.id !== id);

  if (data.categories.length === beforeLength) {
    throw new Error('指定されたカテゴリーが見つかりません');
  }

  // Clean up posts that belonged to this category.
  data.posts = data.posts.filter((p) => p.categoryId !== id);
  await writeData(data);
}

export async function listPosts(): Promise<PostWithCategory[]> {
  const data = await readData();
  return data.posts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((post) => ({
      ...post,
      category: data.categories.find((c) => c.id === post.categoryId) ?? null,
    }));
}

export async function getPost(id: number): Promise<PostWithCategory | null> {
  const data = await readData();
  const post = data.posts.find((p) => p.id === id);
  if (!post) return null;
  return { ...post, category: data.categories.find((c) => c.id === post.categoryId) ?? null };
}

export async function createPost(payload: PostPayload): Promise<PostWithCategory> {
  const data = await readData();
  const categoryId = toNumber(payload.categoryId);
  if (!categoryId || !data.categories.some((c) => c.id === categoryId)) {
    throw new Error('有効なカテゴリーを選択してください');
  }

  const title = payload.title?.trim();
  const content = payload.content?.trim();
  if (!title || !content) {
    throw new Error('タイトルと本文は必須です');
  }

  const post: Post = {
    id: nextId(data.posts),
    title,
    content,
    excerpt: buildExcerpt(payload.excerpt ?? '', content),
    categoryId,
    createdAt: now(),
    updatedAt: now(),
  };

  data.posts.push(post);
  await writeData(data);
  return { ...post, category: data.categories.find((c) => c.id === categoryId) ?? null };
}

export async function updatePost(id: number, payload: Partial<PostPayload>): Promise<PostWithCategory> {
  const data = await readData();
  const post = data.posts.find((p) => p.id === id);
  if (!post) {
    throw new Error('指定された投稿が見つかりません');
  }

  if (payload.title !== undefined) {
    const title = payload.title.trim();
    if (!title) throw new Error('タイトルを入力してください');
    post.title = title;
  }

  if (payload.content !== undefined) {
    const content = payload.content.trim();
    if (!content) throw new Error('本文を入力してください');
    post.content = content;
  }

  if (payload.excerpt !== undefined) {
    post.excerpt = buildExcerpt(payload.excerpt, post.content);
  } else if (payload.content !== undefined && !payload.excerpt) {
    post.excerpt = buildExcerpt('', payload.content);
  }

  if (payload.categoryId !== undefined) {
    const categoryId = toNumber(payload.categoryId);
    if (!categoryId || !data.categories.some((c) => c.id === categoryId)) {
      throw new Error('有効なカテゴリーを選択してください');
    }
    post.categoryId = categoryId;
  }

  post.updatedAt = now();
  await writeData(data);
  return { ...post, category: data.categories.find((c) => c.id === post.categoryId) ?? null };
}

export async function deletePost(id: number): Promise<void> {
  const data = await readData();
  const beforeLength = data.posts.length;
  data.posts = data.posts.filter((p) => p.id !== id);
  if (beforeLength === data.posts.length) {
    throw new Error('指定された投稿が見つかりません');
  }
  await writeData(data);
}
