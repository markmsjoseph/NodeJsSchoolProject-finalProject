var helloWorld = function(){
  return "Hello World";
};

var randomArray = function (){
  var piecesArray = [2,3];
          var temp = piecesArray[0];
          piecesArray[0] = piecesArray[1];
          piecesArray[1] = temp;
          return piecesArray;
}

var randomArrays = function (){
  var piecesArray = [1,2,3,4,5,6,7,8]
  for (var i = piecesArray.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = piecesArray[i];
          piecesArray[i] = piecesArray[j];
          piecesArray[j] = temp;
  }
  return piecesArray;
}

var onCanvasClick = function (){
  var blockSize = 40;
  //get the position of the mouseclick
  var clickedXPos = 164.89899;
  //we calculate the index of the clicked block
  var drawX = Math.floor(clickedXPos / blockSize);//use floor to round to blocksize
  return drawX;
}
