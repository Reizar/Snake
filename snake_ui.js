$(document).ready(function(){

  var game = new Game();

  function include(element, matrix) {
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === element[0] &&
            matrix[i][1] === element[1]) {
          return true;
        }
    }
    return false;
  };

  function arrayCompare(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    else {
      for (var i = 0; i < arr1.length; i ++) {
        if(arr1[i] !== arr2[i]) {
          return false;
        }
      }
    }
    return true;
  }


  var render = function() {
    $('.gameboard').empty();
    for(var i = 0; i < 20; i++) {
      for(var j = 0; j < 20; j++) {
        var square = $('<div>').addClass('square');
        if (arrayCompare([i, j], game.board.apple)) {
          square.addClass('apple');
        } else if (include([i,j], game.snake.position)) {
          square.addClass('body-part');
        }
        $('.gameboard').append(square);
      }
    }
  };



  STEP_TIME_MILLIS = 400;
  var oldsize = game.snake.position.length

  var runLoop = function() {
    console.log("hi")
    checkKey();
    if (game.step()) {
      var newsize = game.snake.position.length
      if (newsize > oldsize) {
        oldsize = newsize;
        stopWindow();
        STEP_TIME_MILLIS -= 20;
        setWindow();
      }
      $('h3').html("Apples Eaten: " + (game.snake.position.length -1));
      render();
    } else {
      stopWindow();
      $('.alert').html("<center>You Died!</center>");
      render();
    }

  };

  var checkKey = function() {
    $('html').keydown(function (event) {
      if (game.backCheck(event.which)) {
        switch(event.which) {
          case 40:
            game.snake.direction = "south";
            break;
          case 39:
            game.snake.direction = "east";
            break;
          case 38:
            game.snake.direction = "north";
            break;
          case 37:
            game.snake.direction = "west";
            break;
          }
      }
    });
  };

  var myVar;

  function setWindow() {
    myVar = window.setInterval(function(){ runLoop() }, STEP_TIME_MILLIS);
  }

  function stopWindow() {
    window.clearInterval(myVar);
  }

  $('.start').click(function() {
    game = new Game();
    $('.alert').html("<center>Get ready to play Snake</center>");
    render();
    setWindow();
  });

  render();

});