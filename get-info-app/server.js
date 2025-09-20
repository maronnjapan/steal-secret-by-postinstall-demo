const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS設定 - どのドメインからでもリクエストを許可
app.use(cors());

// JSONパースミドルウェア
app.use(express.json());

// シークレットを表示するための静的ファイル提供
app.use(express.static("public"));

// POST /info エンドポイント
app.post("/info", (req, res) => {
  const { info } = req.body;
  fs.appendFileSync(
    "public/secret.txt",
    `${new Date().toISOString()} - ${info}\n`
  );

  // 成功レスポンス
  res.json({
    message: "情報を受信しました",
    receivedInfo: info,
    timestamp: new Date().toISOString(),
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
  console.log(`POST /info エンドポイントが利用可能です`);
});
