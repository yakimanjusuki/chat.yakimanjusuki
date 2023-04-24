# chat.yakimanjusuki
OpenAI ChatGPT の API を使用したWEBチャットツールです。
自身の「JavaScript（React）、python（FastAPI）の習得」を目的としたポートフォリオになります。

## 使用方法

### 開発環境
docker-composeにて、開発環境を作成しています。
『 [dev-Makefile](dev-Makefile) 』 ⇒ 『 Makefile 』にすることで、以下が実行可能です。

docker-composeにて開発環境の起動
```
$ make dev-start
```

docker-composeにて開発環境の停止、削除
```
$ make dev-clean
```

docker-composeのバックエンドのログ確認
```
$ make dev-backend-logs
```

docker-composeのフロントエンドのログ確認
```
$ make dev-frontend-logs
```

※ 本番環境については、セキュリティーの都合、公開を控えています。

### 初期設定
初期設定は、
- フロントエンド『 [frontendのREADME](frontend/README.md) 』を参照ください。
- バックエンド『 [backendのREADME](backend/README.md) 』を参照ください。

## その他
- 今後の課題等は、『 [GitHubのissue](https://github.com/yakimanjusuki/chat.yakimanjusuki/issues) 』へ記載してます。
