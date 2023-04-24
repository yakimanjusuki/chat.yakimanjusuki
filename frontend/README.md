# chat.yakimanjusuki frontend
OpenAI ChatGPT の API を使用したWEBチャットツールのフロントエンドです。
使用しているツールの詳細は、『 [package.json](package.json) 』を参照ください。

- React: SAPのフロント側で使用しています。
- TypeScript: 作業効率、コメント、ドキュメントの省略のために使用しています。

## 初期設定
『 [frontend](.) 』直下で、以下を実行してください。
```
$ npm install
```

※ npmの設定・使用方法は、公式ページを参照ください。

## フロントエンド開発環境の起動

### フロントエンドの起動
```
$ npm run start
```

### ビルド
```
$ npm run build
```

### eslint
```
$ npm run lint
$ npm run lint:fix
```

### prettier
```
$ npm run format
$ npm run format:fix
```

※ 上記以外に、開発環境のフロントエンド、バックエンドは、docker-composeにて立ち上げ可能です。使用方法は、『 [上部のREADME.md](../README.md) 』を参照ください。
