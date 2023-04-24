# chat.yakimanjusuki backend
OpenAI ChatGPT の API を使用したWEBチャットツールのバックエンドです。
使用しているツールの詳細は、『 [pyproject.toml](pyproject.toml) 』を参照ください。

- FastAPI: SAPのバックエンド側の作成に使用しています。また、コメント、ドキュメント（Swagger）の省略のために使用しています。

## 初期設定
『 [backend](.) 』直下で、以下を実行してください。
```
$ poetry install
```

※ poetryの設定・使用方法は、公式ページを参照ください。

## バックエンド開発環境の起動

### バックエンドの起動
```
$ source `poetry env info --path`/bin/activate
$ uvicorn main:app --host 0.0.0.0 --reload --port 8000
```

※ 上記以外に、開発環境のフロントエンド、バックエンドは、docker-composeにて立ち上げ可能です。使用方法は、『 [上部のREADME.md](../README.md) 』を参照ください。
