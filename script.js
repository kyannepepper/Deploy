let songsList = []
var submitButton = document.querySelector("#submit-button");
var signUpButton = document.querySelector("#sign-up-button");
var Up = document.querySelector("#up");
var In = document.querySelector("#in");
var signInButton = document.querySelector("#sign-in-button");
var edit_form = document.getElementById("edit_form");
var saved = document.getElementById("saved");
var wrapper = document.getElementById("wrapper");
var signUp = document.getElementById("sign-up");
var signIn = document.getElementById("sign-in");
var authenticate = document.getElementById("authenticate");
var invalid = document.getElementById("invalid");
var invalidSignUp = document.getElementById("invalidSignUp");
var usersName = document.getElementById("usersName");

invalid.innerHTML = "";
invalidSignUp.innerHTML = "";
signUp.style.display = "none";
signIn.style.display = "none";
authenticate.style.display = "flex";
wrapper.style.display = "none";
saved.style.display = "none";
edit_form.style.display = "none";

Up.onclick = function () {
    signUp.style.display = "flex";
    signIn.style.display = "none";
    authenticate.style.display = "none";
    wrapper.style.display = "none";
    saved.style.display = "none";
    edit_form.style.display = "none";
}
In.onclick = function () {
    signIn.style.display = "flex";
    signUp.style.display = "none";
    authenticate.style.display = "none";
    wrapper.style.display = "none";
    saved.style.display = "none";
    edit_form.style.display = "none";
   
}


submitButton.onclick = function () {
    
    var nameInput = document.querySelector('#name-input');
    var artistInput = document.querySelector('#artist-input');
    var ratingInput = document.querySelector('#rating-input');
    var timeInput = document.querySelector('#time-input');
    var explicitInput = document.querySelector('#explicit-input');
    var exp = 0;
    if(explicitInput.checked) {
        exp = 1;
    } else {
        exp = 0;
    }
    createSongOnServer(nameInput.value, artistInput.value, parseInt(ratingInput.value),  exp, parseInt(timeInput.value),);
    nameInput.value = "";
    artistInput.value = "";
    ratingInput.value = "";
    timeInput.value = "";
    explicitInput.checked = false;
}
signUpButton.onclick = function () {
    console.log("hi")
    var firstName = document.querySelector('#first-name-signup');
    var lastName = document.querySelector('#last-name-signup');
    var email = document.querySelector('#email-signup');
    var password = document.querySelector('#password-signup');
    
    authenticate.style.display = "none";
    wrapper.style.display = "none";
    saved.style.display = "none";
    edit_form.style.display = "none";
    createUser(firstName.value, lastName.value, email.value, password.value);
    
}

signInButton.onclick = function () {
    console.log("Maybe");
    var email = document.querySelector('#email-signin');
    var password = document.querySelector('#password-signin');
    SignIn(email.value, password.value);
}

function loadSongsFromServer() {
    //https://api.jsonbin.io/v3/b/630e7387a1610e638615f299
    fetch("https://gentle-bayou-67266.herokuapp.com/songs", {credentials: "include"}).then(function (response) {
    // the server has now responded to the request
    // .... 
    if (response.status == 200) {
        console.log(response)
        console.log("yes")
        signIn.style.display = "none";
        signUp.style.display = "none";
        authenticate.style.display = "none";
        wrapper.style.display = "flex";
        


        edit_form.style.display = "none";
        response.json().then(function (data) {
            // the JSON data is unpacked and ready for us
            console.log('data from the server', data);
            songsList = data;
            // or
            
            // my Freinds = data.record;
            var Songs = document.querySelector("#song-list");
            Songs.innerHTML = "";

            songsList.forEach(function (song) {

                var newListItem = document.createElement("li");
                var flexy = document.createElement("div");
                flexy.classList.add("flexy");
               
                var flexy2 = document.createElement("div");
                flexy2.classList.add("flexy");

                var nameDiv = document.createElement("div");
                nameDiv.innerHTML = song.name;
                nameDiv.classList.add("song-name");

                var artistDiv = document.createElement("div");
                artistDiv.innerHTML = song.artist;
                artistDiv.classList.add("song-artist");

                var ratingDiv = document.createElement("div");
                
                ratingDiv.innerHTML = "You rated this song: " + song.rating + "/10";
                ratingDiv.classList.add("song-rating");

                var explicitDiv = document.createElement("div");
                if( song.explicit == 1 ) {
                    explicitDiv.style.height = "20px";
                    explicitDiv.style.width = "20px";
                    explicitDiv.style.backgroundColor = "rgb(113, 113, 113)";
                    explicitDiv.innerHTML = "E";
                    explicitDiv.style.color = "white"
                } else {
                    explicitDiv.innerHTML = "";

                }
                
                explicitDiv.classList.add("song-explicit");
                
                var timeDiv = document.createElement("div");
                if ( song.time > 60 ) {
                    minutes = Math.floor(song.time / 60);
                    s = song.time % 60;
                    if ( s.toString().length < 2 ) {
                        if ( s < 10 ) {
                            total = minutes.toString() + ":0" + s.toString();
                        } else {
                            total = minutes.toString() + ":" + s.toString() + "0";
                        }
                        
                    } else {
                        total = minutes.toString() + ":" + s.toString();
                    }
                    
                } else {
                    total = "00:" + song.time.toString();
                }
                timeDiv.innerHTML = total + " min";
                timeDiv.classList.add("song-time");

                flexy.appendChild(nameDiv);
                flexy.appendChild(explicitDiv);
                flexy.appendChild(timeDiv)
                flexy2.appendChild(artistDiv)
                flexy2.appendChild(ratingDiv)
                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "delete";
                deleteButton.classList.add("delete")
                deleteButton.onclick = function () {
                    // what to do when the delete button was clicked
                    console.log(artistDiv, "delete click");
                    console.log("delete clicked", song.id);
                    if (confirm("Are you srue you want to delete " + song.name + "?")) {
                        deleteSongFromServer(song.id)
                    }
                }

                var updateButton = document.createElement("button");
                updateButton.innerHTML = "edit";
                updateButton.classList.add("edit")
                document.getElementById("saved").onclick = function () {
                    edit_form.style.display = "none";
                    saved.style.display = "none";
                    form.style.display = "flex";
                }
                updateButton.onclick = function () {
                    // what to do when the delete button was clicked
                    console.log(artistDiv, "Edit click");
                    console.log("Edit clicked", song.id);
                    var form = document.getElementById("form");
                    var edit_form = document.getElementById("edit_form");
                    var title = document.getElementById("title");
                    title.innerHTML = "You are Editting " + song.name;
                    
                    var name = document.getElementById("edit-name-input");
                    name.value = song.name;
                    var artist = document.getElementById("edit-artist-input")
                    artist.value = song.artist;
                    var rating = document.getElementById("edit-rating-input")
                    rating.value = song.rating;
                    var time = document.getElementById("edit-time-input")
                    time.value = song.time;
                    var explicit = document.getElementById("edit-explicit-input")
                    if (song.explicit == 0 ) {
                        explicit.checked = false;
                    } else {
                        explicit.checked = true;
                    }

                    form.style.display = "none";
                    edit_form.style.display = "flex";
                    saved.style.display = "none";
                    // var name = prompt("Song Title?");
                    // var quisine = prompt("Artist?");
                    // var rating = prompt("Rate the song");
                    document.getElementById("save-button").onclick = function () {
                        console.log(name.value);
                        console.log("hi")
                        var exp = 0;
                        if(explicit.checked) {
                            exp = 1;
                        } else {
                            exp = 0;
                        }
                        console.log(exp)
                        updateSongFromServer( name.value, artist.value, rating.value, exp, time.value, song.id);
                        edit_form.style.display = "none";
                        saved.style.display = "flex";
                    }
                }

                newListItem.appendChild(flexy);
                newListItem.appendChild(flexy2)
                newListItem.appendChild(deleteButton);
                newListItem.appendChild(updateButton);
                Songs.appendChild(newListItem);
            });
        });
    } else if (response.status == 401) {
        console.log("nooo")
        wrapper.style.display = "none";
        authenticate.display = "flex";
        }
        
    });
}

function createSongOnServer(name, artist, rating, explicit, time) {
    var data = "name=" + encodeURIComponent(name);
    data += "&artist=" + encodeURIComponent(artist);
    data += "&rating=" + encodeURIComponent(rating);
    data += "&explicit=" + encodeURIComponent(explicit);
    data += "&time=" + encodeURIComponent(time);


    fetch("https://gentle-bayou-67266.herokuapp.com/songs", {
        // additional options to the fetch request
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(function (response) {
        // server has responded
        loadSongsFromServer()
    }).catch(function(error) {
        console.log(error)
        if (error instanceof TypeError) {
            alert("You need to enter data into all of the positions")
        }
        
    }) ;
}

function createUser(firstName, lastName, email, password) {
    var data = "first_name=" + encodeURIComponent(firstName);
    data += "&last_name=" + encodeURIComponent(lastName);
    data += "&email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);

    
    fetch("https://gentle-bayou-67266.herokuapp.com/users", {
        
        // additional options to the fetch request
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(function (response) {
        console.log("pie")
        // server has responded
        if (response.status == 422) {
            invalidSignUp.innerHTML = "There is already and account with this email";
            console.log("YOU DID NOT DO IT YOU DID NOT CREATE AN ACCOUNT")

        } else if (response.status == 201 ) {
            console.log("YOU DID IT YOU CREATED AN ACCOUNT")
            signIn.style.display = "flex";
            signUp.style.display = "none";
            loadSongsFromServer()
        }
    }).catch(function(error) {
        console.log(error)
        if (error instanceof TypeError) {
            alert("You need to enter data into all of the positions")
        }
        
    }) ;
}
function SignIn(email, password) {
    var data = "email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);


    fetch("https://gentle-bayou-67266.herokuapp.com/sessions", {
        // additional options to the fetch request
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(function (response) {
        // server has responded
        if (response.status == 401) {
            invalid.innerHTML = "Invalid Email or Password";
            console.log("YOU DID NOT DO IT YOU DID NOT LOG IN")

        } else if (response.status == 201 ) {
            console.log("YOU DID IT YOU LOGGED IN")
            loadSongsFromServer()
        }
        
    }).catch(function(error) {
        console.log(error)

        if (error instanceof TypeError) {
            alert("You need to enter data into all of the positions")
        }
        
    }) ;
}

function deleteSongFromServer(songId) {
    fetch("https://gentle-bayou-67266.herokuapp.com/songs/" + songId,  {
    credentials: "include",
    method: "DELETE"

    }).then(function (response) {
        loadSongsFromServer();
    })
}
function updateSongFromServer( name, artist, rating, explicit, time, songId) {
    var data = "name=" + encodeURIComponent(name);
    data += "&artist=" + encodeURIComponent(artist);
    data += "&rating=" + encodeURIComponent(rating);
    data += "&explicit=" + encodeURIComponent(explicit);
    data += "&time=" + encodeURIComponent(time);

    fetch("https://gentle-bayou-67266.herokuapp.com/songs/" + songId,  {
        credentials: "include",
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(function (response) {
        loadSongsFromServer();
    })
}
loadSongsFromServer();
