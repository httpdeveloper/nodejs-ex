var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {


    console.log('Network Connected');

    
    socket.emit('onConnect', 'Network Connected');


    socket.on('disconnect', function() {
          console.log('Network Disconnected')
      
    });

    socket.on('onChat', function(data) {
        socket.broadcast.emit('onChat', data);
    });

});


http.listen(port, function() {
  console.log("Server running @ http://" + ip + ":" + port);
});