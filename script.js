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
    return { text: "You Win", color: "#40C4FF" };
  } else if (yourScore === 0) {
    return { text: "You Lose", color: "#FF5252" };
  } else {
    return { text: "Draw", color: "white" };
  }
}

// Update the front end after a choice is made
function frontEnd(player, computer, message) {
  const imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };

  const rpsDiv = document.getElementById("rps-div");
  rpsDiv.innerHTML = ""; // Clear previous images

  const elements = [
    { type: "img", src: imageDatabase[player], boxShadow: "#40C4FF" },
    { type: "h1", text: message["text"], color: message["color"] },
    { type: "img", src: imageDatabase[computer], boxShadow: "#FF5252" },
  ];

  elements.forEach((elem) => {
    const div = document.createElement("div");
    if (elem.type === "img") {
      div.innerHTML = `<img src='${elem.src}' height=150 width=auto style='box-shadow: 3px 3px 10px 10px ${elem.boxShadow}'>`;
    } else if (elem.type === "h1") {
      div.innerHTML = `<h1 style='color:${elem.color}; font-size:50px; padding: 20px;'>${elem.text}</h1>`;
    }
    rpsDiv.appendChild(div);
  });
}
