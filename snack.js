//game constant


let inputDir={x:0,y:0};
const foodsound=new Audio('food1.mp3');
const music=new Audio('music.mp3');
const gameover=new Audio('gameover.mp3');
const move=new Audio('move2.mp3');
let lastpainttime=0;
let speed=5;
let snakeArr=[{x:13,y:15}];
let food={x:6,y:5}
let score=0;
let Board=document.querySelector("#board");
let scorebox=document.querySelector("#scorebox");



//game function 


function main(ctime){
    //console.log(ctime);
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }

    
        lastpainttime=ctime;
        gameEngine()

    }
    function isCollide(snakeArr){
        for(let i=1;i<snakeArr.length;i++){
            if(snakeArr[i].x=== snakeArr[0].x && snakeArr[i].y=== snakeArr[0].y){
                return true;
            }
        }
        
        if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
            return true;
        } 
        
        return false;
    }
    
    function gameEngine(){

        //updating the snake array and food
        if(isCollide(snakeArr)){
            gameover.play();
            music.pause();
            inputDir={x:0,y:0};
            alert("game over")

            snakeArr=[{x:13,y:15}];
            music.play();
            score=0;

        }
        //eating the food
        if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){

            snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
            foodsound.play();
            score+=1;
            scorebox.innerHTML="Score: "+score;
            let a=2;
            let b=16;

            food={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)* Math.random())}

        }
        
        //moving the snake
        for(let i=snakeArr.length-2;i>=0;i--){
            snakeArr[i+1]={...snakeArr[i]}

        }
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;
        



        //display the snake

        Board.innerHTML="";
        snakeArr.forEach((e,index)=>{

            snakeElement=document.createElement("div")
            snakeElement.style.gridRowStart=e.y
            snakeElement.style.gridColumnStart=e.x
            if(index===0){
            snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('body');
            }

            Board.appendChild(snakeElement);
            



        })

        //display the food
        foodElement=document.createElement("div")
        foodElement.style.gridRowStart=food.y
        foodElement.style.gridColumnStart=food.x
        foodElement.classList.add('food');
        Board.appendChild(foodElement);


    }




//game logic

window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
     music.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            move.play();
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            move.play();
            break;
            
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;  
            inputDir.y=0;
            move.play();
            break;
            
        case "ArrowRight":
            console.log("ArrowRight"); 
            inputDir.x=1;
            inputDir.y=0;
            move.play();

            break;   
    }
})

// Control buttons
document.getElementById('up').addEventListener('click', () => {
    music.play();
    inputDir.x = 0;
    inputDir.y = -1;
});

document.getElementById('down').addEventListener('click', () => {
    music.play();
    inputDir.x = 0;
    inputDir.y = 1;
});

document.getElementById('left').addEventListener('click', () => {
    music.play();
    inputDir.x = -1;
    inputDir.y = 0;
});

document.getElementById('right').addEventListener('click', () => {
    music.play();
    inputDir.x = 1;
    inputDir.y = 0;
});





















