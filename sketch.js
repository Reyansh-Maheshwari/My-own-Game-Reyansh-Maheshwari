var bg, bgImg;
var Spaceship, Spaceship_img
var laser,laser_img, laserSound
var meteor, meteor_img,destroySound
var meteorGroup
var laserGroup;
var GameOver, GameOver_img
var heart1, heart2, heart3
var heart1_img,heart2_img,heart3_img
var gameState="play"
var score=0
var reset_img,restart




function preload(){
     

    laser_img = loadImage("images/beams.png")
    meteor_img = loadImage("images/Meteors.png")
    
    bgImg = loadImage("images/Space.png")
    Spaceship_img = loadImage("images/Spaceship.png")
    GameOver_img = loadImage("images/Game Over.png")
    
    laserSound = loadSound("LaserSound.mp3")
       destroySound = loadSound("Destroy.wav")
       GameOverSound = loadSound("GameOver Sound.mp3")

      
       reset_img = loadImage("images/Reset Image.png")


}
function setup(){
    createCanvas(windowWidth, windowHeight)

//     bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
// bg.addImage(bgImg)
//bg.scale = 3
Spaceship = createSprite(740,610,20,20)
Spaceship.addImage(Spaceship_img)
Spaceship.scale = 0.3
GameOver = createSprite(750,300,20,20)
GameOver.scale = 0.5
GameOver.addImage(GameOver_img)


 
restart = createSprite(750,400,20,20)
restart.scale = 0.4

restart.addImage(reset_img)





laserGroup = new Group()
meteorGroup = new Group()
edges  = createEdgeSprites()


}
function draw(){
    background(bgImg)
   
    
    if(gameState === "play"){
        
        Spaceship.visible = true
        
    if(keyDown(LEFT_ARROW)){
        Spaceship.x -=20

    }
    if(keyDown(RIGHT_ARROW)){
        Spaceship.x+=20
    }
    if(keyDown("space")){
        createLaser()
    }
    if(meteorGroup.isTouching(laserGroup)){
        meteorGroup[0].destroy()
        destroySound.play()
       
        score = score+10
    }
    if(keyDown("space")){
        laserSound.play()
    }
    if(Spaceship.isTouching(meteorGroup)){
      GameOverSound.play()
     gameState = "end"
        
    }
    GameOver.visible = false
    restart.visible = false
    
    spawnMeteor()
    }
    
    if(gameState==="end"){
        GameOver.visible = true
        Spaceship.velocityX = 0
        meteorGroup.setVelocityYEach(0)
        meteorGroup.setLifetimeEach(0)
        Spaceship.visible=false
        restart.visible=true
        if(mousePressedOver(restart)){
            reset()
          }
    }


    Spaceship.bounceOff(edges)
  
    drawSprites()
    fill("white")
    strokeWeight(50)

    textSize(20)
    text("Score: "+score,1360,70)
    
    
}
function spawnMeteor(){

    if(frameCount%30===0){
        meteor = createSprite(random(50,width-50),-10,20,20)
        meteor.addImage(meteor_img)
        meteor.scale = 0.2
    meteor.velocityY = 8
    
meteor.lifetime = 740
meteorGroup.add(meteor)
        
    }
    
    
}
function createLaser(){
    var laser = createSprite(730,540,60,10)
    laser.addImage(laser_img)
    
    laser.x = Spaceship.x
    laser.velocityY=-10
    laser.lifetime = 440
    laserGroup.add(laser)
    laser.scale = 0.3
    
}

function reset(){
    gameState = "play"
    score = 0
  

}


