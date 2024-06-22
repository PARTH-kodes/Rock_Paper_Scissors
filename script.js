function game(yourChoice) {
  const player = yourChoice.id;
  console.log("Your Choice: ", player);

  const computer = computerChoice(generateRandomNumber());
  console.log("Computer choice: ", computer);

  const results = decideWinner(player, computer);
  console.log(results);

  const message = findMessage(results);
  console.log(message);

  frontEnd(player, computer, message);
}

// Generate a random number from 0, 1, 2
function generateRandomNumber() {
  return Math.floor(Math.random() * 3);
}

// Choose for computer
function computerChoice(number) {
  return ["rock", "paper", "scissor"][number];
}

// Determine the winner
function decideWinner(yourChoice, computerChoice) {
  const rpsDatabase = {
    rock: { rock: 0.5, paper: 0, scissor: 1 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { rock: 0, paper: 1, scissor: 0.5 },
  };

  const yourScore = rpsDatabase[yourChoice][computerChoice];
  const computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

// Return a message object with the result and color
function findMessage([yourScore, computerScore]) {
  if (yourScore === 1) {
    return { text: "You Win", color: "green" };
  } else if (yourScore === 0) {
    return { text: "You Lose", color: "#FF5252" };
  } else {
    return { text: "Draw", color: "blue" };
  }
}

// Update the front end after a choice is made
function frontEnd(player, computer, message) {
  const imageDatabase = {
    rock: "rock.png",
    paper: "paper.png",
    scissor: "scissor.png",
  };

  const rpsDiv = document.getElementById("rps-div");
  rpsDiv.innerHTML = ""; // Clear previous images

  const playerDiv = document.createElement("div");
  playerDiv.innerHTML = `<img src='${imageDatabase[player]}' height=150 width=auto style='box-shadow: 3px 3px 10px 10px #40C4FF;'>`;
  rpsDiv.appendChild(playerDiv);

  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<h1 id='result-message' style='color:${message.color}; font-size:28px; padding: 20px;'>${message.text}</h1>`;
  rpsDiv.appendChild(messageDiv);

  const computerDiv = document.createElement("div");
  computerDiv.innerHTML = `<img src='${imageDatabase[computer]}' height=150 width=auto style='box-shadow: 3px 3px 10px 10px #FF5252;'>`;
  rpsDiv.appendChild(computerDiv);

  // Show the "Play Again" button
  document.getElementById("play-again").style.display = "block";
}

// Reset the game
function resetGame() {
  // Hide the "Play Again" button
  document.getElementById("play-again").style.display = "none";

  // Reset the images
  const rpsDiv = document.getElementById("rps-div");
  rpsDiv.innerHTML = `
    <img src="rock.png" alt="rock" id="rock" onclick="game(this)" />
    <img src="paper.png" alt="paper" id="paper" onclick="game(this)" />
    <img src="scissor.png" alt="scissor" id="scissor" onclick="game(this)" />
  `;
}
