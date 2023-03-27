const socket = io('http://localhost:3000');

export function PostData(target, results) {
    socket.emit('motion', target, results);
}
