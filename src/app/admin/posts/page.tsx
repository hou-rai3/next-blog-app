"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { PostWithCategory } from "@/lib/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("投稿の取得に失敗しました");
      const data = (await res.json()) as { posts: PostWithCategory[] };
      setPosts(data.posts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    const ok = window.confirm("この投稿を削除しますか？");
    if (!ok) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json();
      alert(body.error ?? "削除に失敗しました");
      return;
    }
    await load();
  };

  return (
    <section className="stack">
      <div className="btn-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="badge">Admin</p>
          <h1 style={{ margin: 0 }}>投稿管理</h1>
        </div>
        <Link className="btn" href="/admin/posts/new">
          新規投稿
        </Link>
      </div>

      <div className="surface">
        {loading && <p className="muted">読み込み中...</p>}
        {error && <p className="muted">{error}</p>}
        {!loading && posts.length === 0 && <p className="muted">投稿がありません。追加してください。</p>}

        {posts.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>タイトル</th>
                <th>カテゴリー</th>
                <th>更新日</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td data-label="タイトル">{post.title}</td>
                  <td data-label="カテゴリー">{post.category?.name ?? "未分類"}</td>
                  <td data-label="更新日">{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-row">
                      <Link className="btn secondary" href={`/posts/${post.id}`}>
                        公開ページ
                      </Link>
                      <Link className="btn" href={`/admin/posts/${post.id}`}>
                        編集
                      </Link>
                      <button className="btn danger" type="button" onClick={() => handleDelete(post.id)}>
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
