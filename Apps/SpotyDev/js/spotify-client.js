var client_id = '8ec67b44ea784b1f8ed1ad640d04646e';
var client_secret = '23aad376f3d24b038de5689e6be639a1';
var access_token = '';

let inputText = document.getElementById("artistName");
let resultados = document.getElementById("results");
let resultadosTracks = document.getElementById("resultsSongs");
let moreSongs = document.getElementById("moreSongs");
let help = document.getElementById("help");

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

  document.getElementById('detailedArtist').style.display = "none";

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist + '&limit=4',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    
    let arrLength = response.artists.items.length;
    let arrItems = response.artists.items;
    
    console.log(arrItems[0]);
    console.log();

    if (arrLength<1) {
      resultados.innerHTML = "No results available, check your search";
    }else{
      resultados.innerHTML = "";

    }
    
    for(i = 0; i<arrLength ; i++){
      resultados.innerHTML += "<div class='card text-dark m-2' style='width: 18rem;'><img class='card-img-top' src='"+ arrItems[i].images[0].url + "'><div class='card-body'><h3 class='artistId' data-id='"+ arrItems[i].id +"'>"+ arrItems[i].name +"</h3><div class='txt'><span class='popu'>Fame " +  arrItems[i].popularity + " / 100 pts</span></div></div><a class='artistLink artistId' data-id='"+ arrItems[i].id +"'>See Artist</a></div>"
    }

  });
};

// En premer sobre un album mostra les cansons d'aquest
Spotify.prototype.getAlbumTracks = function(album) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + album ,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done(function(response){
    
    console.log(response);

    arrLength = response.total_tracks;
    arrItems = response;

    console.log(arrLength);

    moreSongs.innerHTML = "<h3 class='text-light mt-5 ms-0'>"+ response.name +" · Album · " + arrLength + " tracks </h3> ";
  
    for(i = 0; i<arrLength ; i++){
      moreSongs.innerHTML += "<div class='conteiner albumTrackList'><div class='row'><div class='col-1'><img src='"+ arrItems.images[0].url +" 'class='img-fluid' alt=''></div><div class='col-10'><p class='text-light songName align-middle'>"+ arrItems.tracks.items[i].name +"</p><p class='songArtist'>"+ arrItems.tracks.items[i].artists[0].name +"</p></div><div class='col-1'><p class='songDuration mt-4'>"+ msToMin(arrItems.tracks.items[i].duration_ms) +"</p></div></div></div>"};
  });
};

//Search for tracks
Spotify.prototype.getTrack = function (track) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=track&q=' + track + '&limit=4',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){

    console.log(response);
    
    let arrLength = response.tracks.items.length;
    let arrItems = response.tracks.items;

    if (arrLength<1) {
      resultadosTracks.innerHTML = "<p class='text-center'>No results available, check your search </p>";
    }else{
      resultadosTracks.innerHTML = "";
    }
    
    for(i = 0; i<arrLength ; i++){
      resultadosTracks.innerHTML += "<div class='conteiner songDiv m-0 w-100'><div class='row'><div class='col-1'><img src='"+ arrItems[i].album.images[0].url +" ' class='img-fluid' style='height:100%' alt=''></div><div class='col-10 m-0 p-0'><p class='songName mt-1 align-middle'>"+ arrItems[i].name +"</p><p class='songArtist m-0 align-middle'>"+ arrItems[i].artists[0].name +"</p></div><div class='col-1'><p class='songDuration mt-4'>"+ msToMin(arrItems[i].duration_ms) +"</p></div></div></div>"};
    }
  );
};

function msToMin (ms) {

  min = Math.floor((ms/1000/60) << 0),
  sec = Math.floor((ms/1000) % 60);

  if(sec<10){
    sec+="0"
  }

  return min + ':' + sec;
  
}

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums' ,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    document.getElementById('detailedArtist').style.display = "block";
    console.log(response);
    // document.getElementById('help').innerHTML = "";
    // document.getElementById('help2').innerHTML = "";
    resultados.innerHTML = "";
    resultadosTracks.innerHTML = "";
    
    document.getElementById('detailedImg').src = response.items[0].images[0].url;   
    document.getElementById('artistNameH1').innerText = response.items[0].artists[0].name;    
    document.getElementById('artistType').innerText = response.items[0].artists[0].type; 
    document.getElementById('lastAlbum').innerText = response.items[0].name;    
    // document.getElementById('lastAlbumType').innerText = response.items[0].album_type;    
    document.getElementById('releaseDate').innerHTML = "Released on " + response.items[0].release_date + " - <span id='totalTracks'></span>";    
    document.getElementById('totalTracks').innerHTML = "<b>" + response.items[0].total_tracks + " </b> songs";    

    var arrItems = response.items;

    document.getElementById('moreAlbums').innerHTML = "";

    document.getElementById('help').style.display = "none";
    document.getElementById('help2').style.display = "none";

    let albumName =  arrItems[0].name;

    for(i = 0; i< arrItems.length ; i++){
      
      if (arrItems[i].name != albumName){
        document.getElementById('moreAlbums').innerHTML += "<div class='card text-dark m-2 col-2 albums albumId' data-id='"+ arrItems[i].id +"'><img class='card-img-top' src='"+ arrItems[i].images[0].url + "'><div class='card-body'><h3 class='fw-bold'>"+ arrItems[i].name +"</h3><h3 class='text-secondary'>"+ arrItems[i].release_date[0]+arrItems[i].release_date[1]+arrItems[i].release_date[2]+arrItems[i].release_date[3] + " · Album</h3></div></div>"
      }
      albumName = arrItems[i].name;
    }

  });  
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }
  }).done( function(response) {    
    access_token = response.access_token;    
  });

  var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    spotify.getArtist($('#artistName').val());
  });

  $('#artistName').on('keyup', function () {

    moreSongs.innerHTML="";

    if (inputText.value.length === 0) {
      help.style.display = "none"; 
      document.getElementById('help2').style.display = "none"; 
      resultados.innerHTML= "";
      resultadosTracks.innerHTML= "";
    }else{
      help.style.display = "block"; 
      document.getElementById('help2').style.display = "block"; 
      spotify.getArtist($('#artistName').val());
      spotify.getTrack($('#artistName').val());
    }
  }
);

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

  $('#moreAlbums').on('click', '.albumId', function () {
    spotify.getAlbumTracks($(this).attr("data-id"));
  });
});