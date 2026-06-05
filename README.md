Bungee Jump Action Game
このプロジェクトは、Node.jsとHTML5 Canvasを使用して構築されたリアルタイム・バンジージャンプ・アクションゲームです。プレイヤーは落下しながら障害物を避け、最深地点を目指します。
<img width="858" height="1047" alt="スクリーンショット 2026-06-05 192331" src="https://github.com/user-attachments/assets/a9179498-3cb0-498e-89a3-63ae9bfb8848" />

🎮 ゲームの特徴
リアルタイム物理演算: 重力、ゴムの復元力（フックの法則）、空気抵抗をシミュレートした本格的な落下挙動。

マルチプレイヤー対応: Socket.ioを使用し、リアルタイムでのスコア同期・ランキング表示が可能。

難易度選択: プレイスタイルに合わせて「EASY」「NORMAL」「HARD」を選択可能。

アクション要素: 左右キーによる慣性を利用した障害物回避、無敵時間、ライフ制を導入。

🚀 インストールと実行方法
1. 前提条件
Node.js がインストールされていること。

2. セットアップ
Bash
# プロジェクトフォルダへ移動
cd bungee-game

# 依存パッケージのインストール
npm install
3. サーバー起動
Bash
node server.js
サーバーが起動したら、ブラウザで http://localhost:3000 にアクセスしてください。

🕹 操作方法
クリック: ゲーム開始 / ゲームオーバー時のリトライ

← / → キー: 左右の移動（慣性を利用して障害物を回避）

R キー: 落下中の強制リセット

🛠 技術スタック
Backend: Node.js, Express

Communication: Socket.io

Frontend: JavaScript (ES6+), HTML5 Canvas, CSS3

ライセンス
このプロジェクトは学習目的で作成されたものです。自由に改変・拡張して楽しんでください！
