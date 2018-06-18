//when window loads call funtion
window.addEventListener("load", whenPageLoads);

var birdCanvas;
var img;//image we are using
var clickedBlock1;
var clickedBlock2;
var blockSize = 80;//the size of each puzzle piece
var piecesArray = [];//2d array will be used to hold pieces

//loads image
function whenPageLoads(){
  //The 2D Context provides objects, methods, and properties to draw and
  //manipulate graphics on a canvas drawing surface.
    birdCanvas = document.getElementById('birdCanvas').getContext('2d');
    //use image object and specify the src
    img  = new Image();
    img.src = "/images/puzzle.jpg";
    //when image loads callback function
    img.addEventListener("load", onImage1Load);
}

//rectangle object, used edges to calculate width and height.
function Block(left, top, right, bottom){
  this.left = left;
  this.top  = top;
  this.right = right;
  this.bottom = bottom;
  //use parameters to calculate height and width
  this.width = right - left;
  this.height = bottom - top;
}

//shuffle the array
function randomArray(piecesArray){
  for (var i = piecesArray.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = piecesArray[i];
          piecesArray[i] = piecesArray[j];
          piecesArray[j] = temp;
  }
}

//draws images of diff sizes on canvas
function drawImage(){
  var block;
  //loop through all coloms and rows
  for(var i = 0; i < 8; i++)  {
      for(var j = 0; j < 6; j++) {
        //get corresponding rectangles for column and row
          block = piecesArray[i*6+j];
          //draw image on canvas, first param is which image to use, then the clipping
          //options for the image, then where to place
          //the image on the canvas and last 2 params are height and width
          birdCanvas.drawImage(img, block.left, block.top, block.width, block.height, i*blockSize, j*blockSize, blockSize, blockSize);
      }
  }
}

function onImage1Load(){
  var miniBlock;
  for(var i = 0; i < 8; i++){
      for(var j = 0; j < 6; j++){
        //create a small block based on its positioning within the 2D array,
        //so (horizontalOffset, VerticalOffset, howManyBlocksAcross, howManyBlocksDOwn)
          miniBlock = new Block(i * blockSize, j * blockSize, i*blockSize + blockSize, j * blockSize + blockSize);
          //push blocks into the 2d arry
          piecesArray.push(miniBlock);
      }
  }
  randomArray(piecesArray);
  drawImage();
}

//this does the swapping when we click two specific blocks
function onCanvasClick(evt){

  //get the position of the mouseclick
  var clickedXPos = evt.offsetX;
  var clickedYPos = evt.offsetY;

  //we calculate the index of the clicked block
  var drawX = Math.floor(clickedXPos / blockSize);//use floor to round to blocksize
  var drawY = Math.floor(clickedYPos / blockSize);
  var index = drawX * 6 + drawY;//assigned clicked piece
  var targetRect = piecesArray[index];


  //if 2 things we reset the variables
  if(clickedBlock1 && clickedBlock2 )  {
      clickedBlock1 = null;
      clickedBlock2 = null;
  }

  //user clicked one block
  if(!clickedBlock1)  {
      clickedBlock1 = targetRect;
  }
  //user already clicked a block so we know on this click that we have to swap
  else  {
      clickedBlock2 = targetRect;
      swapBlocks(clickedBlock1, clickedBlock2);
  }
  drawImage();

}

//swaps function for blocks
function swapBlocks(block1, block2){
  var temp = block1;

  var index1 = piecesArray.indexOf(block1);
  var index2 = piecesArray.indexOf(block2);

  piecesArray[index1] = block2;
  piecesArray[index2] = temp;
}
