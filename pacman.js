// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var ghosts_eaten = 0;
var level = 1;
var randomNumber = 0;
var fruit = false;
var fruit_eaten = false;
var fruits = ['cherry', 'strawberry', 'orange', 'orange', 'apple', 'apple', 'pineapple', 'pineapple', 'galaxian spaceship', 'galaxian spaceship', 'bell', 'bell', 'key', 'key']
var points = [100, 300, 500, 500, 700, 700, 1000, 1000, 2000, 2000, 3000, 3000, 5000, 5000]

// Define your ghosts here
var inky = {
  'menu_option': 1,
  'name': 'Inky',
  'colour': "Red",
  'character': "Shadow",
  'edible': false
};

var blinky = {
  'menu_option': 2,
  'name': 'Blinky',
  'colour': "Cyan",
  'character': "Speedy",
  'edible': false
};

var pinky = {
  'menu_option': 3,
  'name': 'Pinky',
  'colour': "Pink",
  'character': "Bashful",
  'edible': false
};

var clyde = {
  'menu_option': 4,
  'name': 'Clyde',
  'colour': "Orange",
  'character': "Pokey",
  'edible': false
};

var ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '      Dots: ' + dots + "     Ghosts eaten:" + ghosts_eaten + "    Level: " + level );

  console.log('Power-Pellets: ' + powerPellets);

}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(t) Eat 10 Dots');
  console.log('(h) Eat 100 Dots');
  if (dots < randomNumber && fruit_eaten === false) {
  fruit = true;
  console.log('(f) Eat ' + fruits[level-1]);
  }
  else if (fruit_eaten === true) {
    console.log('No more of the ' + fruits[level-1] + " fruit");
  }
  if (powerPellets > 0) {
  console.log('(p) Eat Power-Pellet');
  }
  for (var i = 1; i <= ghosts.length; i++) {
  console.log('(' + i + ')' + ' Eat ' + ghosts[i-1].name + ' (' + displayEdible(ghosts[i-1]) + ')');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

var displayEdible = function(ghost) {
  if (ghost.edible === true) {
    return 'edible'
  }
  else {
    return 'inedible'
  }
}

function checkLevel() {
  if (level === 1 && randomNumber === 0) {
    randomNumber = formRandomNumber(1, 240);
  }
  else if (powerPellets === 0 && dots === 0) {
    level += 1;
    powerPellets = 4;
    dots = 240;
    fruit_eaten = false;
  }
}

function formRandomNumber (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Menu Options
function eatFruit() {
  console.log('\nYum Fruit');
  score += points[level-1];
  fruit = false;
  fruit_eaten = true;
}

function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
  checkLevel()
}

function eatTenDots() {
  console.log('\nChomp 10!');
  score += 100;
  dots -= 10;
  checkLevel()
}

function eatHundredDots() {
  console.log('\nChomp 100!');
  score += 1000;
  dots -= 100;
  checkLevel()
}


function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log("\nKilled by " + ghost.name + " who is coloured " + ghost.colour + "!");
    checkLives(lives);
  }
  else {
    switch(ghosts_eaten) {
      case 0:
        score += 200;
        ghosts_eaten += 1;
        break;
      case 1:
        score += 400;
        ghosts_eaten += 1;
        break;
      case 2:
        score += 800;
        ghosts_eaten += 1;
        break;
      case 3:
        score += 1600;
        ghosts_eaten;
        ghosts_eaten = 0;
        break;
      }
    console.log("Ate " + ghost.name + "!");
    ghost.edible = false;
    }

}

function checkLives(lives) {
  if (lives < 0) {
    console.log("You are dead, ba boo beep, ba ba boo beep");
    process.exit();
  }
}

function eatPowerPellet() {
  score += 50;
  powerPellets -= 1;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  checkLevel();
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      if (dots > 0) {
      eatDot();
      }
      else {
        console.log('\nNo more dots to eat!');
      }
      break;
    case 't':
      if (dots >= 10) {
        eatTenDots();
      }
      else {
        console.log('\nNot enough dots to eat 10 at once!');
      }
      break;
    case 'h':
      if (dots >= 100) {
        eatHundredDots();
      }
      else {
        console.log('\nNot enough dots to eat 100 at once!');
      }
      break;
    case 'f':
      if (fruit === true) {
        eatFruit()
      }
      break;
    case 'p':
      if (powerPellets === 0) {
        console.log('\nNo more Power-Pellets!!');
      }
      else {
      eatPowerPellet();
      }
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
