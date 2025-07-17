(function (window, document, drawModule, undefined) {
  var btn = document.getElementById('btn');
  btn.addEventListener("click", function(){ drawModule.init(); });

  document.onkeydown = function(event) {
    let keyCode = event.keyCode;

    switch(keyCode) {
      case 37: // Left Arrow
      case 65: // A
        drawModule.setDirection('left');
        break;
      case 39: // Right Arrow
      case 68: // D
        drawModule.setDirection('right');
        break;
      case 38: // Up Arrow
      case 87: // W
        drawModule.setDirection('up');
        break;
      case 40: // Down Arrow
      case 83: // S
        drawModule.setDirection('down');
        break;
    }
  }
})(window, document, drawModule);
