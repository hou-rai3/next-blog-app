import Link from "next/link";
import { getBaseUrl } from "@/lib/base-url";
import type { PostWithCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

async function fetchPosts(): Promise<PostWithCategory[]> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to load posts", await res.text());
    return [];
  }
  const data = (await res.json()) as { posts: PostWithCategory[] };
  return data.posts;
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="page-body">
      <section className="hero">
        <p className="badge">Marbling 2026</p>
        <h1>ロボコン開発記録</h1>
        <p className="muted">
          2026年度に開催されるDISCO ROBOT CONTEST「marbling」の開発過程を記録するブログです。
          技術検証、参考事例、実装の工夫、トラブルシューティングなどを書き残していきます。
        </p>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <Link className="btn" href="/admin/posts/new">
            新規投稿を追加
          </Link>
          <Link className="btn secondary" href="/about">
            このサイトについて
          </Link>
        </div>
      </section>

      <section className="stack">
        <div className="section-title">最新の開発記録</div>
        <div className="grid">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <div className="meta">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                {post.category && <span className="badge">{post.category.name}</span>}
              </div>
              <h2>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="muted">{post.excerpt}</p>
              <div className="btn-row" style={{ marginTop: 10 }}>
                <Link className="btn secondary" href={`/posts/${post.id}`}>
                  詳細を読む
                </Link>
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && <p className="muted">投稿がまだありません。管理画面から追加してください。</p>}
      </section>
    </div>
  );
}
