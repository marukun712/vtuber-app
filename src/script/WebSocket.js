//socket.ioの設定
export const socket = io('http://localhost:3000');

//WebSocketでデータを送信する関数
export function PostData(target, results) {
    socket.emit('motion', target, results);
}
