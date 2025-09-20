※このリポジトリは「Shai-Hulud」のサプライチェーン攻撃を疑似的に一部再現を試みたリポジトリです。あくまで検証のためなので、このコードをもとにパッケージなどに組み込むことを禁止します。

## 動作確認手順
1. get-info-appディレクトリに移動後、`pnpm install`を実行し、`pnpm run dev`でアプリケーションを起動してください。以下のログが出ていれば起動できています
```
サーバーが http://localhost:3000 で起動しました
POST /info エンドポイントが利用可能です
```
2. `trufflehog --version`を実行しても、コマンドが存在せず実行できないことを確認してください。
3. `ls -l /usr/local/`を実行し、binの権限がdrwxrwxrwxになっていないことを確認してください。
4. target-appディレクトリに移動後、`npm install`を実行してください。
5. installが終われば、`trufflehog --version`を実行し、trufflehogコマンドが実行できることを確認してください。
6. また、`ls -l /usr/local/`でbinの権限が`drwxrwxrwx`になっていることを確認してください。
7. そして、[http://localhost:3000/secret.txt](http://localhost:3000/secret.txt)にアクセスしserver.keyの値が出力されていることを確認してください。
