let scores, roundScore, activePlayer, gamePlaying;
gamePlaying = true;
let maxPoints = 100;
let previousDiceRoll;
init();

// Set points Functionality

// On roll Fucntionality
document.querySelector('.btn-roll').addEventListener('click',() => {
  document.getElementById('max-points-container').style.display = 'none';

  if(gamePlaying === true) {
    let dieLeft = Math.floor(Math.random() * 6)  + 1;
    let dieRight = Math.floor(Math.random() * 6)  + 1;
    let dice = [dieLeft, dieRight];
    console.log(dice[0], dice[1]);
    
    showDice();

    let diceLeftDOM = document.querySelector('.dice-0');
    let diceRightDOM = document.querySelector('.dice-1');
   
    diceLeftDOM.style.display = 'block';
    diceRightDOM.style.display = 'Block';
    // Sets dice image to roll value
    diceLeftDOM.src = 'dice-' + dice[0] + '.png';
    diceRightDOM.src = 'dice-' + dice[1] + '.png';

    if (dice[0] === 6 && previousDiceRoll === 6 || dice[1] === 6 && previousDiceRoll === 6 || dice[0] === 6 && dice[1] === 6) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice[0] !== 1 && dice[1] !==1) {
      roundScore += dice[0] + dice[1];
      // displays current score
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      console.log('rolled a one')
     nextPlayer();
    }
      previousDiceRoll = dice[0];
  }
} );

// hold button functionality 
document.querySelector('.btn-hold').addEventListener('click',() => {
  if(gamePlaying) {
        // add current score to global score
    scores[activePlayer] += roundScore;
    // switch player and update ui
    
    // update ui with score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // check if player won the game
    if(scores[activePlayer] >= maxPoints) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      hideDice();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // Set current score to zero
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // toggles active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // remove dice from screen 
  hideDice();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector('.dice-container').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.getElementById('max-points-container').style.display = 'block';
  
  setScore();
  
}

function setScore() {
  document.querySelector('.btn-set-score').addEventListener('click',() => {
    maxPoints = document.getElementById('user-score-max').value;
    console.log(maxPoints);
    document.getElementById('max-points-container').style.display = 'none';
    gamePlaying = true;
  } );
}

function hideDice() {
  document.querySelector('.dice-container').style.display = 'none';
}

function showDice() {
  document.querySelector('.dice-container').style.display = 'block';
}
/* 

  3. add another dice to the game the play losses the score when one adie is a one
*/