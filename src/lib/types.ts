export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type PostWithCategory = Post & {
  category?: Category | null;
};

export type PostPayload = {
  title: string;
  excerpt?: string;
  content: string;
  categoryId: number;
};

export type CategoryPayload = {
  name: string;
};
