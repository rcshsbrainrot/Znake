var drawModule = (function () { 

  var nextDirection = 'down';
  var direction;
  var snake = [];
  var food;
  var score = 0;
  var gameloop;

  var soap = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = '#999';
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }


  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h - 5);
  }

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length - 1; i >= 0; i--) {
          snake.push({ x: i, y: 0 });
      }  
  }

  var paint = function(){
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      direction = nextDirection;

      if (direction === 'right') snakeX++;
      else if (direction === 'left') snakeX--;
      else if (direction === 'up') snakeY--;
      else if (direction === 'down') snakeY++;

      if (
        snakeX < 0 || snakeX >= w / snakeSize ||
        snakeY < 0 || snakeY >= h / snakeSize ||
        checkCollision(snakeX, snakeY, snake)
      ) {
          btn.removeAttribute('disabled', true);
          ctx.clearRect(0, 0, w, h);
          clearInterval(gameloop);
          return;
      }

      var tail;
      if (snakeX === food.x && snakeY === food.y) {
          tail = { x: snakeX, y: snakeY };
          score++;
          createFood();
      } else {
          tail = snake.pop();
          tail.x = snakeX;
          tail.y = snakeY;
      }

      snake.unshift(tail);

      for (var i = 0; i < snake.length; i++) {
        if (i === 0) {
          // Head
          ctx.fillStyle = '#fcd5b4'; // white skin
          ctx.strokeStyle = '#d2a679'; // darker white skin
        } else if (i === snake.length - 1) {
          // Shoes
          ctx.fillStyle = 'black';
          ctx.strokeStyle = '#333';
        } else {
          // Jumpsuit
          ctx.fillStyle = 'orange';
          ctx.strokeStyle = '#cc6600';
        }

        ctx.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
        ctx.strokeRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
      }


      soap(food.x, food.y, food.color);
      scoreText();
  }

  var createFood = function() {
  const colors = ['#cceeff', '#f5f5dc', '#cea2d4ff']; // light blue, beige, purple-ish (soaps)
  do {
    food = {
      x: Math.floor(Math.random() * (w / snakeSize)),
      y: Math.floor(Math.random() * (h / snakeSize)),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  } while (checkCollision(food.x, food.y, snake));
}


  var checkCollision = function(x, y, array) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].x === x && array[i].y === y)
              return true;
      }
      return false;
  }

  var init = function(){
      direction = 'down';
      nextDirection = 'down';
      score = 0;
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }

  var setDirection = function(dir) {
    if (
      (dir === 'left' && direction !== 'right') ||
      (dir === 'right' && direction !== 'left') ||
      (dir === 'up' && direction !== 'down') ||
      (dir === 'down' && direction !== 'up')
    ) {
      nextDirection = dir;
    }
  }

  return {
    init: init,
    setDirection: setDirection
  };

})();
