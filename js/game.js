document.addEventListener('DOMContentLoaded', function() {

  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

  var courtain = document.getElementById("courtain");
  var pad = document.getElementById("pad");
  var square = document.getElementsByClassName("card");

  var resizePad = function(e) {
    pad.style.width = window.innerWidth;
    pad.style.height = window.innerHeight;
    if (window.innerHeight < window.innerWidth) { 
      pad.style.width = window.innerHeight;
      courtain.style.top = pad.style.width * 3/8;
    }
    else { 
      pad.style.height = window.innerWidth;
      courtain.style.top = pad.style.height * 3/8;
    }
    courtain.style.top = pad.querySelector("li").offsetHeight * 1.5;
    courtain.style.fontSize = pad.querySelector("li").offsetHeight * 2 + "%";
  }
  window.onresize = function (event) {
    resizePad();
  }
  resizePad();

  Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i == 0 ) return;
    while ( --i ) {
      j = Math.floor( Math.random() * ( i + 1 ) );
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  };

  var all = {
    "texts": ["Table", "Uncle", "Book", "Road", "Music", "Talk", "Know", "think", "XXX"],
    "images": ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"],
    "preview": ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"]
  };


  var startGame = function(version) {
    var temp = all[version].slice(0);
    temp.shuffle();

    // Select 8 cards
    var cards = temp.slice(0, 8);
    var cardsRandom1 = cards.slice(0);
    var cardsRandom2 = cards.slice(0);

    var shuffle = [];
    shuffle = shuffle.concat(cardsRandom1, cardsRandom2);
    shuffle.shuffle();

    if (version === "texts") {
      Object.keys(shuffle).forEach(function(i) {
        var li = pad.querySelectorAll("li")[i];
        li.setAttribute('value', shuffle[i]);
        li.className = "card";
        li.innerHTML = "<span> class='front'" + shuffle[i] + "</span>"
          + "<img class='back' src='img/back.jpg'></img>";
      });
    }
    else if (version === "images") {
      Object.keys(shuffle).forEach(function(i) {
        var li = pad.querySelectorAll("li")[i];
        li.setAttribute('value', shuffle[i]);
        li.className = "card";
        li.innerHTML = "<img class='card front' src='img/pic" + shuffle[i] + ".jpg'></img>"
          + "<img class='card back' src='img/back.jpg'></img>";
      });
    }
    else if (version === "preview") {
      Object.keys(shuffle).forEach(function(i) {
        var li = pad.querySelectorAll("li")[Number(i)];
        li.className = "card";
        li.setAttribute('value', shuffle[Number(i)]);
        li.innerHTML = "<img class='front' src='img/pic" + shuffle[i] + ".jpg'></img>";
      });
    }
  }


  // Game Logic

  var endGame = function() {
    if (pad.querySelector("li:not(.match)") === null) {
      courtain.style.display = "block";
      courtain.querySelector("h1").innerHTML = "Congratulations!";
      setTimeout(function() {
        courtain.querySelector("h1").innerHTML = "Restart";
      }, 2000);
    }
  }

  var first;
  var second;

  var matchCard = function(elem) {

    if (first && second) {
      if (first.getAttribute("value") == second.getAttribute("value")) {
        first.classList.add('match');
        second.classList.add('match');
        endGame();
      }
      else {
        first.classList.add('fail');
        second.classList.add('fail');
      }

      setTimeout(function() {
        first.classList.remove('show');
        second.classList.remove('show');
        first.classList.remove('fail');
        second.classList.remove('fail');
        first = undefined;
        second = undefined;
      }, 600);
    }

  }

  var flipCard = function(e) {

    var card = e.target;

    if (card.classList.contains("back") || card.classList.contains("front")) {
      card = card.parentNode;
    }

    if (card.classList.contains("show") || card.classList.contains("match")) {
      return;
    }

    if (card.classList.contains("card")) {

      if (first === undefined) {
        first = card;
        card.classList.add('show');
      }
      else if (second === undefined) {
        second = card;
        card.classList.add('show');
        matchCard();
      }
      else {
        first.classList.remove('fail');
        second.classList.remove('fail');
      }
    }
  };
  
  pad.addEventListener("click", function(e) {
    setTimeout(function(){flipCard(e)}, 0);
  }, false);

  // Initialize
  startGame("preview");

  courtain.addEventListener("click", function(e) {
    courtain.style.display = "none";
    startGame("images");
  });

});