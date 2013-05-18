function Snake() {
  this.position = [[10,10]];
  this.direction = 'north';
  this.head = [10,10];
}

Snake.prototype.turn = function(direction) {
  this.direction = direction;
};

function Board() {
  this.board = this.makeBoard();
  this.apple = [3, 3];
}

Board.prototype.makeBoard = function(){
  var matrix = []
  for(var i = 0; i < 20; i++) {
    matrix[i] = [];
    for(var j = 0; j < 20; j++){
      matrix[i].push("_");
    }
  }
  return matrix;
};

Board.prototype.placeApple = function(){
    var x = Math.floor(Math.random()*20);
    var y = Math.floor(Math.random()*20);
    this.apple = [x, y];
};

function Game () {
  this.snake = new Snake;
  this.board = new Board;
}

function include(element, matrix) {
  for (var i = 0; i < matrix.length; i++) {
      if (matrix[i][0] === element[0] &&
          matrix[i][1] === element[1]) {
        return true;
      }
  }
  return false;
};

Game.prototype.validateMove = function(coord) {
  if ((coord[0] < 0 || coord[0] > 20) || (coord[1] < 0 || coord[1] > 20)) {
    return false;
  }
  if (include(coord, this.snake.position)) {
    return false;
  }
  return true;
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

Game.prototype.stepHelper = function(newhead) {
  if (arrayCompare(this.board.apple, newhead)) {
    this.board.placeApple();
    this.snake.position.unshift(newhead);
  }
  else {
    this.snake.position.pop();
    this.snake.position.unshift(newhead);
  }
  this.snake.head = newhead;
};

Game.prototype.validateStep = function(newhead) {
  if (this.validateMove(newhead)) {
    this.stepHelper(newhead);
    return true;
  }
  else {
    return false;
  }
}

Game.prototype.backCheck = function(newDirection) {
  switch(newDirection) {
    case 40:
      if (this.snake.direction === "north") {
        return false;
      }
      break;
    case 39:
      if (this.snake.direction === "west") {
        return false;
      }
      break;
    case 38:
      if (this.snake.direction === "south") {
        return false;
      }
      break;
    case 37:
      if (this.snake.direction === "west") {
        return false;
      }
      break;
    }
    return true;
}

Game.prototype.step = function(){

  switch(this.snake.direction) {
    case "north":
      var newhead = [this.snake.head[0] - 1, this.snake.head[1]];
      return this.validateStep(newhead);
      break;
    case "south":
      var newhead = [this.snake.head[0] + 1, this.snake.head[1]];
      return this.validateStep(newhead);
      break;
    case "east":
      var newhead = [this.snake.head[0], this.snake.head[1] + 1];
      return this.validateStep(newhead);
      break;
    case "west":
      var newhead = [this.snake.head[0], this.snake.head[1] - 1];
      return this.validateStep(newhead);
      break;

      }
}


