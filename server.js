/**
	server
**/
var express = require('express');
var app = express();

// wwwディレクトリを静的ファイルディレクトリとして登録
app.use(express.static('www'));

// サーバを開始
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;


	console.log('Server listening at http://%s:%s', host, port);
});

var socketIO = require('socket.io');
var scoa_io = socketIO.listen(8081);



scoa_io.sockets.on("connection", function (socket) {

	console.log("クライアント接続したよ");

	socket.on("text", function (data) {
		socket.emit("html", data);
	});


});
