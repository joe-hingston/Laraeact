var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');

app.get('/', function(req, res){

    axios.get('http://backend.api/api/users').then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        console.log(response.data);
    });

    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
