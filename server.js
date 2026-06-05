const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let leaderboard = [];

io.on('connection', (socket) => {
    socket.on('submitScore', (score) => {
        leaderboard.push({ id: socket.id.slice(0, 4), score: score });
        leaderboard.sort((a, b) => b.score - a.score);
        io.emit('updateLeaderboard', leaderboard.slice(0, 5));
    });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));