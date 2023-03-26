const socket = io('http://localhost:3000');

export function PostData(results) {
    socket.emit('motion', results);
}
