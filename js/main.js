// Set all selectors
const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');


//Define scoreboard
const scoreboard = {
  player: 0,
  computer: 0
};

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  //Rock, Paper, Scissor animation
  animation(e)
  //Show winner function
  setTimeout(function() { showWinner(winner, computerChoice); }, 3100)
}


function animation(e){
  result.innerHTML = ``;
  modal.style.display = 'block';
  
  //Changebackground 1 by 1
  setTimeout(function() { 
    result.style.backgroundImage = "url('img/rock.png')";
   }, 0)
   setTimeout(function() { 
    result.style.backgroundImage = "url('img/paper.png')";
   }, 1000)
   setTimeout(function() { 
    result.style.backgroundImage = "url('img/scissors.png')";
   }, 2000)

   setTimeout(function() { 
    result.style.backgroundImage = "none";
   }, 3000)

}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}


//Refill Module for winner
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Inc player score
    result.style.background = " var(--win-color)";
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1>You Win</h1>
      
      <img src="img/${computerChoice}.png" alt="">
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.style.background = " var(--lose-color)";
    result.innerHTML = `
      <h1>You Lose</h1>
      <img src="img/${computerChoice}.png" alt="">
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.style.background = " var(--dark-color)";
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <img src="img/${computerChoice}.png" alt="">
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

}


// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
    result.style.background = "#fff";
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
