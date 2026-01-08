export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    excerpt: '最初のサンプル投稿です。',
    date: '2025-11-20',
    content:
      'これは簡単なブログのサンプル投稿です。内容はプレーンテキストで、静的に読み込まれます。必要であれば Markdown パーサや CMS と接続してください。',
  },
  {
    slug: 'second-post',
    title: '二つ目の投稿',
    excerpt: '別のサンプル投稿です。',
    date: '2025-11-20',
    content: 'これは二つ目のサンプルコンテンツです。',
  },
];
