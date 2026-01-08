export const metadata = {
  title: "About | Winter Blog Studio",
};

export default function AboutPage() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <h1>このサイトについて</h1>
      <p className="muted">
        Next.js 15 の App Router と Route Handlers を使って、フロントエンドと API を同じリポジトリで構築する練習用のブログです。
        冬休みの課題として、microCMS から自前の API へ移行する流れを体験することをゴールにしています。
      </p>
      <div className="stack" style={{ marginTop: 16 }}>
        <div>
          <h3 className="section-title">技術スタック</h3>
          <ul className="muted" style={{ lineHeight: 1.8 }}>
            <li>Next.js 15 (App Router / Route Handlers)</li>
            <li>TypeScript / React 19</li>
            <li>簡易的な JSON ストレージでのデータ永続化</li>
          </ul>
        </div>
        <div>
          <h3 className="section-title">作者プロフィール</h3>
          <p className="muted">
            フロントエンドとバックエンドの両方に触れるのが好きな学生エンジニアです。UI の遊び心と実用性のバランスを意識しています。
          </p>
        </div>
      </div>
    </section>
  );
}
