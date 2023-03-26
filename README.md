# vtuber-app 

# Overview
kalidokitのトラッキング結果を複数端末からリアルタイムに表示できるアプリ。

# DEMO
![demo](/demo.gif)
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