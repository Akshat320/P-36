//Create variables here
var dog, happyDog, foodS, foodStock, dogHappy, dogSitting;
var database, fedTime, lastFed, foodObj;
var bedroom, washroom, garden;
var backgroundImg;
var gameState = "Hungry";

var sleepingDog;


function preload()
{
  //load images here
  dogSitting = loadImage("Dog.png"); 
  dogHappy = loadImage("happydog.png");
  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  lazyDog = loadImage("images/Lazy.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1000, 500);

  foodObj = new Food();


  dog = createSprite(700, 250, 20, 20);
  dog.addImage(dogSitting);
  dog.scale = 0.15;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20);

  feed  = createButton("Feed The Dog");
  feed.position(850, 70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(970, 70);
  addFood.mousePressed(addFoods);

  database.ref('gameState').on("value", function(data){
    gameState = data.val();
  })
 

  
}


function draw() {  

  background(46, 139, 87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill("white");
  textSize(12);
  text("Food Remaining: " + foodS, 400, 100);

  fill(255,255, 254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed: "+ lastFed%12 + " PM", 280, 35);
  }else if(lastFed===0)
  {
    text("LastFeed: 12 AM", 280, 35);
  }else{
    text("Last Feed: "+lastFed + " AM", 280, 35);
  }

  currentTime = hour();
  if(currentTime === (lastFed+0))
  {
    update("Playing");
    foodObj.garden();

  }else if(currentTime === (lastFed+2))
  {
    update("Sleeping")
    foodObj.bedroom();
  }else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4))
  {
    update("Bathing")
    foodObj.washroom();
  }else
  {
    update("Hungry")
    foodObj.display();
  }

  if(gameState !== "Hungry")
  {
    feed.hide;
    addFood.hide();
    dog.remove();
  }else
  {
    feed.show();
    addFood.show();
    dog.addImage(lazyDog);
  }
  
  if(foodS<1)
  { 
    text("No Food Remaining!! Add some Food to Feed the Dog", 200, 250);
  }
  

  drawSprites();

}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog()
{

  //if(foodS > 0){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
     Food: foodObj.getFoodStock(),
     FeedTime: hour(),

     gameState: "Hungry"
  
  })
}
//}

function addFoods(){

  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state)
{

  database.ref('/').update({
    gameState: state
  })
}
