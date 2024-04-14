"use strict"
window.addEventListener("load",start);
function start(){
    console.log("start");
    setupEventlisteners();
  requestAnimationFrame(tick);

}
function setupEventlisteners() {
    document.addEventListener("keydown", (event) => {
    const key=event.key;
     console.log("keypressed: ",key); 
    setControls(key);   
    });
    document.addEventListener("keyup", (event) => {
       const key=event.key; 
       removeControl(key);
    });
}
let lastTimestamp=0;
/*  MODEL   */
const playerobj={
    x: 0,
    y: 0,
    speed:100,
    moving: false,
    direction:undefined
}
function displayPlayerAtPosition(){
    const visualPlayer=document.querySelector("#player");
    visualPlayer.style.transform=`translate(${playerobj.x}px, ${playerobj.y}px)`;
    console.log("displayPlayerAtPosition");
    console.log(playerobj)
    return true;
}

function tick(timestamp){
    console.log("tick");
    requestAnimationFrame(tick);
    
    const deltaTime=(timestamp-lastTimestamp)/1000;
    lastTimestamp=timestamp;
    console.log("deltaTime",deltaTime);
    moveplayer(deltaTime);
    displayPlayerAtPosition();
    displayPlayerAnimation();
}
const controls={
    up:false,
    down:false,
    left:false,
    right:false
}
 function setControls(key){
    if(key==="ArrowUp"){
        controls.up=true;
    }
    if(key==="ArrowDown"){
        controls.down=true;
    }
    if(key==="ArrowLeft"){
        controls.left=true;
    }
    if(key==="ArrowRight"){
        controls.right=true;
    }
    console.log(controls);
 }
    function removeControl(key){
        if(key==="ArrowUp"){
            controls.up=false;
        }
        if(key==="ArrowDown"){
            controls.down=false;
        }
        if(key==="ArrowLeft"){
            controls.left=false;
        }
        if(key==="ArrowRight"){
            controls.right=false;
        }
        console.log(controls);
    }
function moveplayer(deltaTime){
    playerobj.moving=false;
    const newPos={
        x:playerobj.x,
        y:playerobj.y
    }
    if(controls.up){
        playerobj.moving=true;
        playerobj.direction="up";
        newPos.y-=playerobj.speed*deltaTime;
    }
      if(controls.down){
        playerobj.moving=true;
        playerobj.direction="down";
        newPos.y+=playerobj.speed*deltaTime;
    }
    if(controls.left){
        playerobj.moving=true;
        playerobj.direction="left";
        newPos.x-=playerobj.speed*deltaTime;
    }  if(controls.right){
        playerobj.moving=true;
        playerobj.direction="right";
        newPos.x+=playerobj.speed*deltaTime;
    }
    if(validposition(newPos)){
        playerobj.x=newPos.x;
        playerobj.y=newPos.y;
    }
}
function validposition(pos){
    if(pos.x<0 || pos.y<0 || pos.x>460 || pos.y>304){
        return false;
    }
    
    return true;
}
/*  VIEW   */
function displayPlayerAnimation(){
    console.log("displayPlayAnimation");
    const visualPlayer=document.querySelector("#player");
    if(playerobj.moving){
        visualPlayer.classList.add("animate");
        visualPlayer.classList.remove("up","down","left","right");
        visualPlayer.classList.add(playerobj.direction);
    } else{
        visualPlayer.classList.remove("animate");
     
    }

}
