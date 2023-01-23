/*------------------------BDD-----------------------------*/

/*---Edith Piaf---*/
const vieroseC = new Audio('https://ia903401.us.archive.org/21/items/la-vie-en-rose/La%20vie%20en%20rose.mp4');

var vierose = [vieroseC, "La Vie En Rose · Edith Piaf"];

var vierose_album = [vierose, '\0'];


/*---J Cole---*/
const changeC = new Audio('https://ia902305.us.archive.org/28/items/j-cole-4-your-eyez-only/4%20Your%20Eyez%20Only/06-Change.mp3');
const neighborsC  = new Audio('https://ia902305.us.archive.org/28/items/j-cole-4-your-eyez-only/4%20Your%20Eyez%20Only/07-Neighbors.mp3');

var change = [changeC, "Change · J. Cole"];
var neighbors = [neighborsC, "Neighbors · J. Cole"];

var forYourEyezOnly = [change, neighbors, '\0'];


/*----------------------------------------------------------*/

/*---Linkin Park---*/
const intheendC = new Audio('https://ia801508.us.archive.org/19/items/youtube-oIwWqYSbzGA/Linkin_Park_-_In_The_End_Official_Video-oIwWqYSbzGA.mp4');
const crawlingC  = new Audio('https://ia904707.us.archive.org/24/items/vk-165014402/Linkin_Park_-_Crawling-165014402.mp4');

var intheend = [intheendC, "In The End · Linkin Park"];
var crawling = [crawlingC, "Crawling · Linkin Park"];

var hybridTheory = [intheend, crawling, '\0'];


/*----------------------------------------------------------*/

var n = 0;
var album = ['\0'];

var play=0;


//gestion de la barre de volume
var volumeBar = document.getElementById("volumeBar");
volumeBar.oninput = function() {
    album[n][0].volume = this.value;
  }

//gestion de l'avancement du son
function progressionSong(){
	var seekBar = document.getElementById("seekBar");
	album[n][0].addEventListener("timeupdate", function() {
	  var value = (100 / album[n][0].duration) * album[n][0].currentTime;
	  seekBar.value = value;
	});
	seekBar.addEventListener("change", function() {
	  var time = album[n][0].duration * (seekBar.value / 100);
	  album[n][0].currentTime = time;
	});
}


var lecteurContainer = document.getElementById("lecteurContainer");

function chooseAlbum(nameAlbum, nameAlbumString,idPlayer, idPause, idNext, idBack){
	if(play===1){
		album[n][0].pause();
		album[n][0].currentTime = 0;
		n=0;
	}
	document.getElementById(idBack).classList.remove("show");
	album = nameAlbum;
	isPlay(idPlayer, idPause, idNext, idBack);
	
}


function isPlay(idPlayer, idPause, idNext, idBack){
	play=1;
	if(album[0]==='\0'){
		lecteurContainer.innerHTML="Choisissez un album";
	}
	else
	{
	lecteurContainer.innerHTML=album[n][1];
	album[n][0].volume=0.25;
	progressionSong();
	album[n][0].play();
	document.getElementById(idPlayer).classList.add("hide");
	document.getElementById(idPause).classList.add("show");
	document.getElementById(idNext).classList.add("show");
	if(n>0){
		document.getElementById(idBack).classList.add("show");
	}
	}
}

function isPause(idPause, idPlayer, idBack){
	lecteurContainer.innerHTML=album[n][1];
	album[n][0].pause();
	document.getElementById(idPlayer).classList.remove("hide");
	document.getElementById(idPause).classList.remove("show");
	if(n>0){
		document.getElementById(idBack).classList.add("show");
	}
}

function isNext(idNext, idPlayer, idPause, idBack){
	lecteurContainer.innerHTML="";
	document.getElementById(idPlayer).classList.add("hide");
	document.getElementById(idPause).classList.add("show");
	album[n][0].pause();
	album[n][0].currentTime = 0;
	n+=1;
	if(album[n][0]==='\0'){
		n=0;
		lecteurContainer.innerHTML='Album finis, cliquez sur Play pour écouter !';
		document.getElementById(idPlayer).classList.remove("hide");
		document.getElementById(idPause).classList.remove("show");
		document.getElementById(idNext).classList.remove("show");
		document.getElementById(idBack).classList.add("show");
	}
	else{
		lecteurContainer.innerHTML=album[n][1];
		album[n][0].volume=0.25;
		progressionSong();
		album[n][0].play();
	}
	if(n===0){
		document.getElementById(idBack).classList.remove("show");
	}
	else{
		document.getElementById(idBack).classList.add("show");
	}
}

function isBack(idNext, idPlayer, idPause, idBack){
	
	album[n][0].pause();
	album[n][0].currentTime = 0;
	n-=1;
	if(n<0){
		n=0;
		document.getElementById(idBack).classList.remove("show");
		document.getElementById(idPlayer).classList.remove("hide");
		document.getElementById(idPause).classList.remove("show");
		document.getElementById(idNext).classList.remove("show");
	}
	else if(n===0){
		document.getElementById(idBack).classList.remove("show");
		document.getElementById(idPlayer).classList.add("hide");
		document.getElementById(idPause).classList.add("show");
		lecteurContainer.innerHTML=album[n][1];
		progressionSong();
		album[n][0].play();
	}
	else{
		document.getElementById(idPlayer).classList.add("hide");
		document.getElementById(idPause).classList.add("show");
		lecteurContainer.innerHTML=album[n][1];
		progressionSong();
		album[n][0].play();
	}
}




