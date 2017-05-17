// NOMBRE DE DÉS

// variables éléments
var nbspan = document.getElementById('nb');
var txtnbdes = document.getElementById('txtnbdes');
var desplur = document.getElementById('desortho');
var less = document.getElementById('less');
var more = document.getElementById('more');

// Variables page
var pHeight = window.innerHeight;
var pWidth = window.innerWidth;
var responsive = 779;

var resultFixLeft = "11px";

// variables dés
var nbdes = 2;
var nbpreced = 2;

var play1 = false;



// Click & keydown events

document.addEventListener("keydown", keydown);

function keydown(evt){
	if((evt.keyCode === 37) || (evt.keyCode === 40)){
		if(nbdes>1){
			nbpreced = nbdes;
			nbdes --;
			tapNb(nbdes);
		}
	}
	if((evt.keyCode === 39) || (evt.keyCode === 38)){
		if(nbdes<10){
			nbpreced = nbdes;
			nbdes ++;
			tapNb(nbdes);
		}
	}
	if((evt.keyCode === 32) || (evt.keyCode === 13)){
		play();
		evt.preventDefault();
	}
};



// GAME

// Variables
var go = document.getElementById('go');
var terrain = document.getElementById('terrain');
var game = document.getElementById('game');
var result = document.getElementById('resulttxt');
var resultbox = document.getElementById('result');
var resulttitle = document.getElementById('resulttitle');
var scrollnbdisp = document.getElementById('scrollnbdisp');

var cote = 54;

// Var Play

var resulttxt;
var resultaddtxt;

var posX = [];
var posY = [];
var newPosX;
var newPosY;
var des = 0;
var tWidth;
var tHeight;

var de;


// Event Clic
go.addEventListener("click", play);
terrain.addEventListener("click", play);
scrollnbdisp.addEventListener("click", play);


// 1er lancer
function firstPlay(){
	play1 = true;
	if(pWidth < responsive){
		document.getElementById('h1resize').className = "h1resized";
		scrollnbdisp.style.top = "12px";
		resultbox.style.margin = "calc(55vh + 124px) 0px 0px 0px";
	}
}

// LE JEU DE DÉS : DÈS QU'ON DÉCLENCHE UN LANCER
function play(){

	if(play1 == false)
		firstPlay();

	terrain.innerHTML = "";

	resulttxt = result.innerHTML;
	resultaddtxt = "<p class='resulttxt'>";

	// variables
	posX = [];
	posY = [];
	des = 0;
	tWidth = terrain.clientWidth - 64;
	tHeight = terrain.clientHeight - 64;

	// Boucle création dé
	for (var i = 1; i <= nbdes; i++) {
		de = Math.ceil(6*((Math.random())));
		des += de;

		newPosX = 10 + (Math.random() * tWidth);
		newPosY = 10 + (Math.random() * tHeight);

		if (i > 1){
			for (var j = nbdes; j > 0; j--) {
				if ( (newPosX > (posX[j-1] - cote) && newPosX < (posX[j-1] + cote)) && (newPosY > (posY[j-1] - cote) && newPosY < (posY[j-1] + cote)) ){
					//console.log("FALSE nPX : "+newPosX+" - pX : "+posX[j-1] +" - nPY : "+ newPosY+" - pY : "+posY[j-1])
					newPosX = 10 + (Math.random() * tWidth);
					newPosY = 10 + (Math.random() * tHeight);
					j = nbdes;
				}
			}
		}

		posX[i-1] = newPosX;
		posY[i-1] = newPosY;

		terrain.innerHTML += "<div class='de' style='transform:rotate("+ Math.random() * 360 +"deg); top:"+ newPosY +"px; left:"+ newPosX +"px'><div class='dediv de"+de+"'><div class='dot1'></div><div class='dot2'></div><div class='dot3'></div><div class='dot4'></div><div class='dot5'></div><div class='dot6'></div><div class='dot7'></div></div></div>";

		resultaddtxt += de;
		if(!(i==nbdes))
			resultaddtxt += " + ";
	}

	resultaddtxt += " = <span class='total'>" + des + "</span></p>" + resulttxt;
	result.innerHTML = resultaddtxt;
};


// Result height // overflow scroll

// Variable marge au desus de result
if (pWidth <= responsive)
	var hResult = (0.55 * pHeight) + 134;
else
	var hResult = (0.55 * pHeight) + 162;

window.addEventListener("scroll", setResultScroll, false);

function setResultScroll(){
	if(window.pageYOffset >= hResult){
		if (resulttitle.className != "resultfixed"){
			resulttitle.className = "resultfixed";
			resulttitle.style.left = resultFixLeft;
			document.getElementById("dball1").className = "dbfix";
			document.getElementById("dball1").style.left = "17px";
			document.getElementById("dball2").className = "dbfix";
			document.getElementById("dball2").style.right = "17px";
		}
	} else {
		if (resulttitle.className != ""){
			resulttitle.className = "";
			resulttitle.style.left = "0px";
			document.getElementById("dball1").className = "designball";
			document.getElementById("dball1").style.left = "6px";
			document.getElementById("dball2").className = "designball";
			document.getElementById("dball2").style.right = "6px";
		}
	}
}




// ADAPT SCREEN DISPOSITION TO WIDTH/HEIGHT


if (window.innerWidth > window.innerHeight){
	game.className = "game_portrait";
	resultbox.className = "result_portrait";
}




// SCROLL NB

// variables
var scrollnbctnr = document.getElementById('scrollnbctnr');
var scrollnb = document.getElementById('scrollnb');
// déjà déclarée : scrollnbdisp
var snbWidth = 556;
var x = 0;
var posNbScrolled = 0;


// SCROLL DESKTOP

scrollnbctnr.addEventListener("scroll", scrollingNb, false);

var scrollInit = 0;
function scrollingNb(){
	x = scrollnbctnr.scrollLeft;
    if (nbdes != 1 + Math.round(10 * (x / snbWidth))){
    	nbdes = 1 + Math.round(10 * (x / snbWidth))
	    scrollnbdisp.innerHTML = nbdes;
	}
}



// SCROLL SMARTPHONE


// scroll auto + nouveau nbdes
function scrollauto(){

    x = scrollnbctnr.scrollLeft;
    posNbScrolled = (snbWidth / 10) * Math.round(10 * (x / snbWidth));
    scrollnbctnr.scrollLeft = posNbScrolled;

    nbdes = 1 + Math.round(10 * (x / snbWidth));
    scrollnbdisp.innerHTML = nbdes;

	scrollnb.removeEventListener('touchend', scrollauto, false);

    play();
}

//scrollnb.addEventListener('touchend', scrollauto, false);

scrollnb.addEventListener('touchmove', function(){
	scrollnb.addEventListener('touchend', scrollauto, false);
}
, false);



// tap number

var posNbTapped = 0;
var nbToScroll = document.getElementsByClassName('nbtoscroll');

function tapNb(nbtouch){

	posNbTapped = (snbWidth / 10) * (nbtouch - 1);
    scrollnbctnr.scrollLeft = posNbTapped;

    nbdes = nbtouch;
    scrollnbdisp.innerHTML = nbdes;

    play();
}

// tapNb execution à l'ouverture, sans play()
function tapNbNoPlay(nbtouch){
	posNbTapped = (snbWidth / 10) * (nbtouch - 1);
    scrollnbctnr.scrollLeft = posNbTapped;

    nbdes = nbtouch;
    scrollnbdisp.innerHTML = nbdes;
}

// A L'OUVERTURE DE LA PAGE
function init(){
	tapNbNoPlay(nbdes);
}
init();


function safariAdjust(){
	resultbox.style.left = "-1px";
	resultFixLeft = "10px";
}

if ( ( /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification) ) || (( typeof InstallTrigger === 'undefined' ) && (!(!!window.chrome && !!window.chrome.webstore)) ) ){
	safariAdjust();
}












