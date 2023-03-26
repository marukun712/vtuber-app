# vtuber-app 

# Overview
kalidokitのトラッキング結果をリアルタイムに表示できるアプリ。

# installation

依存パッケージをインストール。
```
yarn install 
```

# Usage
Socket.ioサーバーを起動。
```
node server.js
```

開発サーバーを起動
```
yarn run dev
```

/realtime.html でWebSocketで送信されたモーションデータをリアルタイムに表示できます。