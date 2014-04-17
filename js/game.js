document.addEventListener('DOMContentLoaded', function() {

  var resizePad = function(e) {
    var win = $(window);
    $('.pad').css({'width': win.width(), 'height': win.height()});
    if (win.height() < win.width()) { 
      $('.pad').css({'width': win.height()});
    }
    else { 
      $('.pad').css({'height': win.width()});
    }
    $('.courtain').css({'top': $('.pad').height()/3});
    $('.courtain').css({'font-size': $('.pad').height()/16});
  }
  resizePad();
  $(window).on('resize', resizePad);

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

    $(".pad li").attr("class","card square");
    if (version === "texts") {
      for (i in shuffle) {
        $(".pad li:eq("+i+")")
        .attr('value', shuffle[i])
        .append("<span> class='front'" + shuffle[i] + "</span>")
        .append("<img class='back' src='img/back.jpg'></img>");
      }
    } else if (version === "images") {
      for (i in shuffle) {
        $(".pad li:eq("+i+")")
        .attr('value', shuffle[i])
        .append("<img class='front' src='img/pic" + shuffle[i] + ".jpg'></img>")
        .append("<img class='back' src='img/back.jpg'></img>");
      }
    } else if (version === "preview") {
      for (i in shuffle) {
        $(".pad li:eq("+i+")")
        .attr('value', shuffle[i])
        .append("<img class='front' src='img/pic" + shuffle[i] + ".jpg'></img>");
      }
    }
  }


  // Game Logic

  var endGame = function() {
    if ($('.pad li.match').length === 16) {
      $('.courtain h1').text("Congratulations!");
      $('.courtain').show('puff');
      setTimeout(function() {
        $('.courtain').hide('1s').slideDown();
        $('.courtain h1').text("Restart")
      }, 2000);
    }
  }

  var matchCard = function(elem) {
    if ($(".pad .show").length != 2) { return }

    if ($(".pad .show.first").attr('value') === $(".pad .show.second").attr('value')) {
      $(".pad .show").addClass('match').unbind('click');
      endGame();
    } else {
      $(".pad .show").addClass('fail');
    }
    $(".pad .show").removeClass('show');
  }

  var startGameClick = function() {
    $(".pad .square").click(function() {
      var showed = $(".pad .show").length;
      var failed = $(".pad .fail.second").length;

      if (failed > 0) {
        $(".pad .card").removeClass("fail first second");
      }
      if (showed > 1) { return }

      if (showed == 0) {
        $(this).addClass('show first');
      } else {
        $(this).addClass('show second');
        matchCard();
      }
    });
  }

  // Initialize
  startGame("preview");
  $(".courtain").click(function() {
    $(".courtain").slideUp();
    startGame("images");
    startGameClick();
  });

});