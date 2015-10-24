var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//static file directory
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/css'));

//Displays default page
app.get('/', function (req, res) {
    //res.send('<h1>Hello World from Node Application</h1>');
    res.sendFile(__dirname + '/index.html');
});


//Displays Remote Page
app.get('/remote', function (req, res) {
    //res.send('<h1>Hello World from Node Application</h1>');
    res.sendFile(__dirname + '/remote.html');
});

//Displays animation Page
app.get('/animation', function (req, res) {
    //res.send('<h1>Hello World from Node Application</h1>');
    res.sendFile(__dirname + '/animation.html');
});

//Start the Server and listen it on port 3000
server.listen(3000, function () {
    console.log("Listening on port *:3000");
});


//Define all the websocket connection here... Do the magic below

//Remote and animation both will connect to the same room and room name will be decided based on the query parameter
//Remote will emit the events and animation page will just work on that events
//Following Four Commands should be supported 
//There will be code for "UP", "DOWN", "CHANGEPAGE", "FULLScreen",
//Need to decide on the JSON Structure for the same

io.on('connection', function (socket) {

    console.log('Connected !!');
    console.log('Query', socket.handshake.query);
    //console.log('URL', socket.handshake.url);

    //Do the things you want to do, when the user disconnects
    socket.on('disconnect', function () {
        console.log('user disconnected');

    });

    socket.on('UP', function (msg) {
        //console.log('message: ' + msg);
        //io.emit('chat message', msg);
        console.log('UP Event called');
        io.emit('UP', msg);
    });

    socket.on('DOWN', function (msg) {
        console.log('DOWN Event Called');
        io.emit('DOWN', msg);
    });

    socket.on('CHANGE_LOCATION', function (msg) {
        console.log('Change Location Event Called');
    });

    socket.on('FULL_SCREEN', function (msg) {
        console.log('Full Screen Event Called');
    });


});

//
//io.on('disconnect', function (socket) {
//    console.log('Connected !!');
//});


//var server = require('http').createServer();
//var io = require('socket.io')(server);
//io.on('connection', function (socket) {
//    socket.on('event', function (data) {});
//    socket.on('disconnect', function () {});
//});
//server.listen(3000);