// Make connection
var url = 'https://socketgame-mrmjcf.c9users.io/';
var socket = io.connect(url);

// Query DOM / Variables
var output = document.getElementById('output'),
    initbtn = document.getElementById('initbtn'),
    leaderbox = document.getElementById('infobox'),
    userbox = document.getElementById('infobox'),
    startbtn = document.getElementById('startbtn'),
    captionbox = document.getElementById('captionbox'),
    captionsubmit = document.getElementById('captionsubmit'),
    idClearButton = document.getElementById('clearcurrentids'),
    imagebox = document.getElementById('imagebox'),
    submittedcaptions = document.getElementById('submittedcaptions'),
    chatbox = document.getElementById('chatbox'),
    chatinput = document.getElementById('chatinput'),
    chatsubmit = document.getElementById('chatsubmit');


// Emit events

initbtn.addEventListener('click', function(){
   socket.emit('initialize');
});

startbtn.addEventListener('click', function(){
   socket.emit('start');
});

captionsubmit.addEventListener('click', function() {
   socket.emit('captionsubmit', { caption: captionbox.value, user: socket.id }); 
   captionbox.value = "";
});

idClearButton.addEventListener('click', function() {
   socket.emit('clear'); 
});

chatsubmit.addEventListener('click', function() {
   socket.emit('chatsanitizer', { message: chatinput.value, id:socket.id });
   chatinput.value = '';
})

//Listen to events

function leaderSelection(elementID) {
   submittedcaptions.innerHTML = '';
   socket.emit('nextLeader', { userIndex: elementID });
   captionsubmit.style.pointerEvents = "pointer";
}

socket.on('getID', function(){
   var userID = socket.id;
   socket.emit('userID', userID);
});

socket.on('getUsername', function() {
    var username = prompt('Username:');
    socket.emit('username', username);
})

socket.on('leader', function(data){
   userbox.innerHTML = '';
   leaderbox.innerHTML += data.message;
 });

socket.on('user', function(data){
   leaderbox.innerHTML = '';
   userbox.innerHTML += data + "<br>";
});

socket.on('captions', function(data) {
    submittedcaptions.innerHTML = '';
    submittedcaptions.innerHTML += data + "<br>";
});

socket.on('toggleCaptionSubmit', function(data) {
   captionbox.disabled = data;
   captionsubmit.disabled = data;
});

socket.on('displayClientNumber', function(data){
   output.innerHTML = "";
   output.innerHTML += data + "<br>";
});

socket.on('newImage', function(data){
   imagebox.innerHTML = '';
   imagebox.innerHTML += '<img src="' + url + 'images/' + data + '">';
});

socket.on('chat', function(data) {
   chatbox.innerHTML += data + "<br>";
});

//\\3. CREATE Prevent users from making multiple captions | Client-side filter
//4. CREATE Add sanitization all inputs and limits to length
//6. CREATE Add username
//\\7. CREATE Prevent users from interacting after game ended | #3 did that
//8. CREATE Show users that have and havent sent their captions
//9. MAYBE  Chat? FINISH THIS
//10 CREATE gui
//11.CREATE Namespaces and rooms
//12.CREATE Instruction/Landing Page
//13.MAYBE  Moderators and Admin? 
//14.REVISE Revise code and make keywords more descriptive

