const word=document.getElementById("word");
const text=document.getElementById("text");
const scoreEl=document.getElementById("score");
const timeEl=document.getElementById("time");
const endgameEl=document.getElementById("end-game-container");
const settingsBtn=document.getElementById("settings-btn");
const settings=document.getElementById("settings");
const settingsForm=document.getElementById("settings-form");
const difficultySelect=document.getElementById("difficulty");
const topScoreEl=document.getElementById("top-score");


// List of Words
const words=[
    'bandya',
    'bole toh',
    'sandaaas',
    'mashallah',
    'parmeshwara',
    'ghanta',
    'rapchaandus',
    'schadenfreude',
    'solace',
    'waat lag gayi',
    'nirvana',
    'shrodinger',
    'chyamaayla',
    'gilli gilli wush',
    'macha',
    'bumfuzzle',
    'gundya',
    'cattywampus',
    'gardyloo',
    'chiggy wiggy',
    'taradiddle',
    'snickersnee',
    'collywobbles',
    'arararare',
    'naadaan parindey',
    'fataang',
    'fatte',
    'palang tod'
];

// Init word
let randomWord;

// Init score
let score=0;

//Init Time
let time=10;

let difficulty=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'medium';

//set difficulty select value
difficultySelect.value=difficulty;

// Top score
if(difficulty=='easy'){
    let topScore=localStorage.getItem('easyTS')!=null?localStorage.getItem('easyTS'):0;
    topScoreEl.innerHTML=topScore==0?'':`Top score: ${topScore}`;
}
else if(difficulty=='medium'){
    let topScore=localStorage.getItem('mediumTS')!=null?+localStorage.getItem('mediumTS'):0;
    console.log(topScore);
    topScoreEl.innerHTML=topScore==0?'':`Top score: ${topScore}`;
}
else if(difficulty=='hard'){
    let topScore=localStorage.getItem('hardTS')!=null?localStorage.getItem('hardTS'):0;
    topScoreEl.innerHTML=topScore==0?'':`Top score: ${topScore}`;
}

// focus on text on start
text.focus();

// Start counting down
const timeInterval=setInterval(updateTime,1000);

// Generate a word
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

console.log(getRandomWord());

// Add word to DOM
function addWordToDOM(){
    randomWord=getRandomWord();

    word.innerHTML=randomWord;
}

// update score
function updateScore(){
    score++;
    scoreEl.innerHTML=score;
}

//Game over show end screen
function gameOver(){
    endgameEl.innerHTML=`
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display="flex";
    if(difficulty=='easy'){
        const topscore=+localStorage.getItem('easyTS');
        if(score>topscore){
            localStorage.setItem('easyTS',score);
        }
    }
    else if(difficulty=='medium'){
        const topscore=+localStorage.getItem('easyTS');
        if(score>topscore){
            localStorage.setItem('mediumTS',score);
        }
    }
    else{        const topscore=+localStorage.getItem('easyTS');
        if(score>topscore){
            localStorage.setItem('mediumTS',score);
        }
    }
    
}

// update time
function updateTime(){
    time--;
    timeEl.innerHTML=time+'s';

    if(time===0){
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

addWordToDOM();

text.addEventListener("input",function(e){
    const insertedText=e.target.value;
    if(insertedText==randomWord){
        addWordToDOM();
        updateScore();

        // Clear 
        e.target.value='';

        if(difficulty==='easy'){
            time+=5;
        }
        else if(difficulty==='medium'){
            time+=3;
        }
        else{
            time+=2;
        }
        
    }
});


// Settings btn click

settingsBtn.addEventListener("click",function(e){
    settings.classList.toggle('hide');
});

// Setting select
settingsForm.addEventListener("change",function(e){
    difficulty=e.target.value;

    localStorage.setItem('difficulty',difficulty);
});
