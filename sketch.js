//Maayan Albert
//SectionD
//malbert@andrew.cmu.edu
//final-project

//please create a local server to run the program

//Establishes arrays for bubbles. I had to create a
//different array for the bubbles in each beaker because
//they move differently.
var lBubbles = [];
var firstOBubbles = [];
var secondOBubbles = [];

//establishes locations for the beakers that replace
//3 of the letters
var firstOLocationX = 328.5;
var secondOLocationX = 424.5;
var oLocationY = 467.5;

var lBeakerLocationX = 595.5;
var lBeakerLocationY = 574.5;

//establishes the sizes and widths of parts of the
//beakers and bubbles
var beakertip = 7;
var bubbleWidth = 25;
var oWidth = 89;
var liquidWidth = 79;
var lHeight = 131;
var lWidth = 19;
var beakerNeckWidth = 30;

//establishes variables for the colors
var beakerColor;
var letterColor;
var liquidColor;

//establishes the distances of the tips of the beakers from
//the top of the canvas
var lDistFromTop = 379;
var firstBeakerDistFromTop = lDistFromTop + 4;
var secondBeakerDistFromTop = lDistFromTop + 18;

//establishes a variable for the sound
var poppingSound;

//establishes a variable to store whether or not a bubble 
//has been popped
var hasABubbleBeenPopped;

var timePopped;

function setup() {
  createCanvas(846, 650);
  angleMode(DEGREES);
  background(255)
  noStroke();

  //assigns values to the colors
  beakerColor = color(150, 150, 150, 150);
  letterColor = color(240, 191, 0);
  liquidColor = color("GOLD");

  hasABubbleBeenPopped = false;
}

function preload(){
  //loads the sound
  poppingSound = loadSound("./poppingnoise.m4a");
  poppingSound.setVolume(2);
}



function draw() {

  background(255);

  //renders bubbles
  drawNormalLetters();
  updateAndDisplayBubbles();
  removeBubblesThatHaveSlippedOutOfView();
  addNewBubblesWithSomeRandomProbability();

  //renders beakers
  circularBeaker(340, firstOLocationX, oLocationY, 42);
  circularBeaker(30, secondOLocationX, oLocationY, 30);
  circularBeaker(0, lBeakerLocationX, lBeakerLocationY, 154);

  //draws instructions if no bubbles have been popped
  fill(beakerColor);
  textSize(20);
  if(hasABubbleBeenPopped == false){
  text("Please Scroll Over Bubbles", firstOLocationX - oWidth * 1.3, oLocationY + oWidth/2 + 35);

  }

  push();
  translate(50, 50);
  poppingAnimation();
  pop();

}


function circularBeaker(orientation, x, y, beakerNeckLength){
  this.beakerCenterX = x;
  this.beakerCenterY = y;
  this.beakerNeckLength = beakerNeckLength;
  this.lightSpotSize = 15

  
  //draws liquid in beakers
  fill(liquidColor);
  arc(this.beakerCenterX, this.beakerCenterY, liquidWidth, liquidWidth, 
    0, 180);

  //draws ellipse representing top layer of liquid
  fill(letterColor);
  ellipse(this.beakerCenterX, 
    this.beakerCenterY, liquidWidth, 20);

  
  //draws beakers
  fill(beakerColor);
  push();
  translate(this.beakerCenterX, this.beakerCenterY);
  rotate(orientation);
  ellipse(0, 0, oWidth, oWidth);
  rect(-beakerNeckWidth/2, - oWidth/2 + 2.5, 
    beakerNeckWidth, - this.beakerNeckLength + beakertip - 1);
  rect(-beakerNeckWidth/2 - beakertip, 
    - oWidth/2 + 2.5 - this.beakerNeckLength, 
    beakerNeckWidth + beakertip * 2 - 1, beakertip, beakertip);

  
  pop();
  
  //draws reflections of light on beakers
  fill(225, 150);
    push();
    translate(this.beakerCenterX, this.beakerCenterY);
    rotate(220);
    ellipse(0, liquidWidth / 3, this.lightSpotSize * 2, lightSpotSize);
    rotate(60);
    ellipse(0, liquidWidth / 3, lightSpotSize, lightSpotSize);
    pop();
}

function poppingAnimation(){
  
  stroke(235, 225);
  strokeWeight(3);
 
  push();
  
  this.numberOfArcs = 10;
  this.arcWidth = 10;

  for (i = 0; i < this.numberOfArcs; i++){

    rotate(360/this.numberOfArcs);
    line(0, 5, 0, 10);
    
  }

  pop();

  strokeWeight(0);
}

function drawNormalLetters(){
  //When I tried to load an image of the google logo it 
  //came out pixelated, so I hardcoded the letters instead

  fill(letterColor);

  //draws capital G
  arc(212, 444, 135, 143, 0, 315); 
  fill(255);
  ellipse(212, 444, 95, 100); 
  fill(240, 191, 0);
  rect(212, 438, 67, lWidth);

  //draws lowercase g
  arc(518, 507, oWidth, oWidth, 0, 153);
  fill(255);
  ellipse(518, 507, 50, 50);
  fill(240, 191, 0);
  ellipse(518, oLocationY, 85, oWidth);
  rect(521 + 45/2, 425, lWidth, 83);
  fill(255);
  ellipse(521, 467, 45, 50);

  //draws e
  fill(240, 191, 0);
  arc(662, oLocationY, oWidth - 12, oWidth, 30, 350);
  fill(255);
  ellipse(662, oLocationY, 43, 55);
  fill(240, 191, 0);
  push();
  translate(630, oLocationY);
  rotate(-15);
  rect(0, 0, 69, lWidth - 3);
  pop();
}


function updateAndDisplayBubbles(){
    // Updates the bubbles' positions and displays them.

    for (var i=0; i<lBubbles.length; i++){
        lBubbles[i].move();
        lBubbles[i].display();
    }

     for (var i=0; i<firstOBubbles.length; i++){
        firstOBubbles[i].move();
        firstOBubbles[i].display();
    }

    for (var i=0; i<secondOBubbles.length; i++){
        secondOBubbles[i].move();
        secondOBubbles[i].display();
    }
}

function removeBubblesThatHaveSlippedOutOfView(){
    // If a bubbles have dropped off the upper edge, remove them from the array. 

    for (var i=0; i<lBubbles.length; i++){
        if (lBubbles[i].y < 0-lBubbles[i].breadth){
            lBubbles.splice(i, 1);
        }
    }

     for (var i=0; i<firstOBubbles.length; i++){
        if (firstOBubbles[i].y < 0-firstOBubbles[i].breadth){
            firstOBubbles.splice(i, 1);
        }
    }

     for (var i=0; i<secondOBubbles.length; i++){
        if (secondOBubbles[i].y < 0-secondOBubbles[i].breadth){
            secondOBubbles.splice(i, 1);
        }
    }
}

function addNewBubblesWithSomeRandomProbability(){
    // With a very tiny probability, add a new bubble to the end.

    var newBubbleLikelihood = 0.007;

    if (random(0,1) < newBubbleLikelihood){
       lBubbles.push(new Bubble (lBeakerLocationX, 
        lDistFromTop + lHeight + oWidth/2 + 20, millis(), lDistFromTop, 0));
    }

    if (random(0,1) < newBubbleLikelihood){
       firstOBubbles.push(new Bubble(firstOLocationX, oLocationY,
        millis(), firstBeakerDistFromTop, -.35));
    }

    if (random(0,1) < newBubbleLikelihood){
       secondOBubbles.push(new Bubble(secondOLocationX, oLocationY,
        millis(), secondBeakerDistFromTop, .57));
    }
}

function Bubble (birthLocationX, birthLocationY, birthdate, distanceFromTop,
  movingIncrement){

  //inputs birth locations and times of creation of bubbles into object attributes
    this.x = birthLocationX;
    this.y = birthLocationY; 
    this.birthdate = birthdate;
    this.distanceFromTop = distanceFromTop;
    this.movingIncrement = movingIncrement;
    this.timePopped;
    this.hasThisBubbleBeenPopped = false;


  //creates an object varible for the speed of the bubbles
    this.speed = -1.0;

  //stores whether or not bubbles are transparent
    this.transparent = false

  //creates a unique offset for each bubble based on their birthdate
    var individualOffset = (this.birthdate % 25000) % (millis() % 25000);
    
  //creates a function for bubbles to change position
  this.move = function() {

    //creates noise variable to define movement
    var n = map(noise(individualOffset), 0, 1, -1, 1);

    //defines movement of bubbles
    this.y += this.speed;
    if(this.y > this.distanceFromTop){
        this.x += this.movingIncrement;
    } else{
      this.x += n;
    }
  }
    
  //draws the bubbles
  this.display = function() { 



    //plays popping sound when mouse scrolls over bubbles
    if(this.x -bubbleWidth/2 < mouseX 
      && this.x + bubbleWidth/2 > mouseX 
      && this.y - bubbleWidth/2 < mouseY 
      && this.y + bubbleWidth/2 > mouseY
      && this.transparent == false && this.y < lDistFromTop){
      poppingSound.play();
      hasABubbleBeenPopped = true;
    }


    

    //makes bubbles disappear when mouse scrolls over them
    if(this.x -bubbleWidth/2 < mouseX 
      && this.x + bubbleWidth/2 > mouseX 
      && this.y - bubbleWidth/2 < mouseY 
      && this.y + bubbleWidth/2 > mouseY
      &&this.y < lDistFromTop || this.transparent == true){
      this.transparent = true
      fill(235, 0)
    }else{
      fill(235, 225);
    } 



    push();
      //sets centerpoint to birth location of that particular bubble
    translate(this.x, this.y);

      //creates shape of bubbles
    ellipse(0, 0, 25, 25);
    rotate(220);

    // if(this.x -bubbleWidth/2 < mouseX 
    //   && this.x + bubbleWidth/2 > mouseX 
    //   && this.y - bubbleWidth/2 < mouseY 
    //   && this.y + bubbleWidth/2 > mouseY
    //   && this.hasThisBubbleBeenPopped == false
    //   && this.transparent == true){

    //   poppingAnimation();
    // }

     //makes bubble highlights disappear when mouse scrolls over them
    if(this.x -bubbleWidth/2 < mouseX 
      && this.x + bubbleWidth/2 > mouseX 
      && this.y - bubbleWidth/2 < mouseY 
      && this.y + bubbleWidth/2 > mouseY
      &&this.y < lDistFromTop || this.transparent == true){
      this.transparent = true
      fill(255, 0)
      this.hasThisBubbleBeenPopped = true;
    }else{
      fill(255, 255);
    } 
    ellipse(0, 8, 8, 5);
    rotate(60);
    ellipse(0, 8, 5, 5);

    pop();
  }
}


