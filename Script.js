let Canvas = document.getElementById('Snake');
let Ctx = Canvas.getContext("2d");

let Canvas2 = document.getElementById('food');
let Ctx2 = Canvas2.getContext("2d");

let Canvas3 = document.getElementById('grid');
let Ctx3 = Canvas3.getContext("2d");

const gridSize = 20;

const Width = Canvas.width;
const Height = Canvas.height;

let Snake = [];
let CurrentDirection = "Right";
const Step = 20;

let food = {};

let score = 0

let gameInterval;

let isPaused = false;

Start();


function SetUpGrid(){

    //vertical lines
    let x = 0;
    for (;x<=Width; x+= gridSize){
        Ctx3.moveTo(x, 0);
        Ctx3.lineTo(x, Height);
    }

    //horizontal lines
    let y = 0;
    for (;y<=Height; y+= gridSize){
        Ctx3.moveTo(0, y);
        Ctx3.lineTo(Width, y);
    }

    Ctx3.strokeStyle = "#aaa";
    Ctx3.stroke();
}

function PlayerInput() {
    window.addEventListener('keydown', (event) => {
        event.preventDefault();

        switch(event.key){
            case "ArrowLeft":
                if (CurrentDirection !== "Right") {
                    CurrentDirection = "Left";
                }
                break;
            case "ArrowRight":
                if (CurrentDirection !== "Left") {
                    CurrentDirection = "Right";
                }
                break;
            case "ArrowUp":
                if (CurrentDirection !== "Down") {
                    CurrentDirection = "Up";
                }
                break;
            case "ArrowDown":
                if (CurrentDirection !== "Up") {
                    CurrentDirection = "Down";
                }
                break;
            default:
        }
    });
}


function UpdateSnake(){
    switch(CurrentDirection){
        case "Right" :
            Snake.unshift({x: Snake[0].x + Step, y: Snake[0].y});
            ColisionDetection();
            Eat();      
            RenderSnake();
            HeadPosition();
            break;

        case "Left":
            Snake.unshift({x: Snake[0].x - Step, y: Snake[0].y});
            ColisionDetection();
            Eat();           
            RenderSnake();
            HeadPosition();
            break;
        case "Down":
            Snake.unshift({x: Snake[0].x, y: Snake[0].y + Step});          
            ColisionDetection();
            Eat();            
            RenderSnake();
            HeadPosition();
            break;
        case "Up":
            Snake.unshift({x: Snake[0].x, y: Snake[0].y - Step});
            ColisionDetection();
            Eat();            
            RenderSnake();          
            HeadPosition();
            break;
    }
}


function RenderSnake(){
    Ctx.fillStyle = "red";
    Snake.forEach((snake)=>{
        Ctx.fillRect(snake.x, snake.y, Step, Step);
    });
}


function HeadPosition(){
    document.getElementById('position').innerText = 
    `Head coordinates: (x: ${Snake[0].x} ,y: ${Snake[0].y})`;
}

function LoadFood(){
    GenerateFood();

    Ctx2.fillStyle = "green";
    Ctx2.fillRect(food.x, food.y, Step, Step);
}

function Eat(){
    if(!((Snake[0].x == food.x) && (Snake[0].y == food.y))){
        let x = Snake.pop();
        Ctx.clearRect(x.x, x.y, Step, Step);
        return;
    }
    score++;
    Score();
    Ctx2.clearRect(0, 0, Canvas.width, Canvas.height);
    RenderSnake();
    LoadFood();
}


function GenerateFood() {
    let validPosition = false;
    let pos;

    while (!validPosition) {
        // Generate random position within grid boundaries
        pos = {
            x: Math.floor(Math.random() * (Width / Step)) * Step,
            y: Math.floor(Math.random() * (Height / Step)) * Step
        };

        // Check if the food overlaps with any part of the snake
        validPosition = true;
        for (let i = 0; i < Snake.length; i++) {
            if (Snake[i].x === pos.x && Snake[i].y === pos.y) {
                validPosition = false;
                break;  // Break the loop and re-generate the food
            }
        }
    }

    // Once a valid position is found, set the food's coordinates
    food.x = pos.x;
    food.y = pos.y;
}


function Score(){
    document.getElementById("score").innerHTML = `score: ${score}`;
}

function ColisionDetection(){
    let head = Snake[0];

    //Collision with wall
    if ((head.x <0) || (head.x >= Width) || (head.y < 0) || (head.y >= Height)) {
        GameOver();
    }
    
    //Collision with self
    let i = 1
    for(; i<Snake.length;i++){
        if((Snake[i].x == head.x) && (Snake[i].y == head.y)){
            GameOver();
        }
    }
}

function StartGame(){
    gameInterval = setInterval(UpdateSnake,100);
    isPaused = false;
    PlayerInput();
    PauseGame();
}

function PauseCheck(){
    if(isPaused){
        gameInterval = setInterval(UpdateSnake,100);
        isPaused = false;
    }
    else{
        clearInterval(gameInterval);
        isPaused = true;
    }
}

function PauseGame(){
    window.addEventListener("keydown",(event)=>{
        if(event.key == "p"){
            PauseCheck();
        }
    });
}

function InitializeGame(){
    Snake = [
        {x: 200, y: 200}, //head
        {x: 180, y: 200}, //body
        {x: 160, y: 200} //tail
    ];
    CurrentDirection = "Right";
    score = 0;
    SetUpGrid();
    RenderSnake();
    LoadFood();
    Score();
}

function HandleStart(event){
        if (event.key == "Enter"){
            InitializeGame();
            StartGame();
            document.getElementById('UserMessage').innerHTML = "";
            window.removeEventListener("keydown", HandleStart);
        }
}

function Start() {
    window.addEventListener("keydown", HandleStart);
}

function GameOver(){
    clearInterval(gameInterval);
    Ctx.clearRect(0, 0, Width, Height);
    Ctx2.clearRect(0, 0, Width, Height);
    Ctx3.clearRect(0, 0, Width, Height);
    Snake = [];
    document.getElementById('UserMessage').innerHTML = "Game Over Press Enter to Restart";
    Start();
}