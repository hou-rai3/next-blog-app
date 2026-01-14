export const metadata = {
  title: "About | Marbling Dev Log",
};

export default function AboutPage() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <h1>このサイトについて</h1>
      <p className="muted">
        このブログは、ロボコン「marbling」の開発記録を残すために作られました。
        赤・青・緑の3チームで地面を塗り合い、最も多くの面積を塗ったチームが勝利するというルールのもと、
        機体の設計、制御アルゴリズム、戦略立案などの開発過程を記録していきます。
      </p>
      <div className="stack" style={{ marginTop: 16 }}>
        <div>
          <h3 className="section-title">記録する内容</h3>
          <ul className="muted" style={{ lineHeight: 1.8 }}>
            <li>機体設計・製作の記録</li>
            <li>センサー・アクチュエータの選定と検証</li>
            <li>制御アルゴリズムの実装</li>
            <li>戦略・戦術の考察</li>
            <li>トラブルシューティングと解決策</li>
            <li>参考にした技術資料やコード例</li>
          </ul>
        </div>
        <div>
          <h3 className="section-title">技術スタック</h3>
          <ul className="muted" style={{ lineHeight: 1.8 }}>
            <li>ロボット: 卍太郎</li>
            <li>制御: ROS2</li>
            <li>ブログ: Next.js 15 + TypeScript</li>
          </ul>
        </div>
        <div>
          <h3 className="section-title">制作者</h3>
          <p className="muted">
            実機での試行錯誤を通じて学んだことを、後から振り返れるように記録しています。
          </p>
        </div>
      </div>
    </section>
  );
}
