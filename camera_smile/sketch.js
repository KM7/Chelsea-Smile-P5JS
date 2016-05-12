var capture;

//ArrayList<PImage> buffer=new ArrayList<PImage>();
//int n=0;
//int upper_bound=12;
//int switch_num=0;
const IMAGES = 0, buffer = Array(IMAGES);
var n=0;
var upper_bound=5;
var switch_num=0;
var verticle=false;


function setup() {
  createCanvas(1000, 400);
  frameRate(60);
  noSmooth();

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  buffer.push(get());
}

function draw() {
  background(255);

  update_time();
  image(capture,0,0,capture.width,capture.height);
  if (!verticle){
  var tempimage=get(capture.width/2,0,4,capture.height);
  background(255);
  image(tempimage,0,0,width,height)
  image(buffer[buffer.length-1], 1, 0,width,height);
  }else{
  var tempimage=get(0,capture.height/2,capture.width,4);
  background(255);
  image(tempimage,0,height-4,width,height)
  image(buffer[buffer.length-1], 0, -1,width,height);
  }
  //PImage 
  buffer.push(get(0,0,width,height));
  pastFusion();
}

function pastFusion(){
background(255);
//DARKEST DIFFERENCE EXCLUSION MULTIPLY HARD_LIGHT SOFT_LIGHT
  for (var k=0;k<buffer.length;k++){
   switch(switch_num){
      case 0:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, DARKEST);
  break;
  
      case 1:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, DIFFERENCE);
  break;
      case 2:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, EXCLUSION);
  break;
      case 3:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, MULTIPLY);
  break;
      case 4:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, HARD_LIGHT);
  break;
      case 5:
  blend(buffer[k], 0, 0, width, height, 0, 0, width, height, SOFT_LIGHT);
  break;  
}
}
}

function keyPressed() {
  if (key == 'k'||key=='K') {
    switch_num =switch_num+1;
    if (switch_num>5){
      switch_num=0;
    }
  }
   if (key == 'v'||key=='V') {
     verticle=!verticle;
  }
}

function update_time(){
if (n<upper_bound){
n=n+1;
}else{
  //println(buffer.length);
  buffer.shift();

//image( , 0, 0, 160, 240);

 //buffer.pop(); 
}
}