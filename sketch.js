let rules = [];
let plant = [];
let currentBranch;

var axiom;
var sentence;

// Holds on to the position of the current branch when a push is called
// LIFO
let plantStack = [];

// counter is used to refer to the letter in sentence being drawn
// counter increments every time next line is called
let counter = 1;

// How many times generate is called in setup or whenever you change LSystemNum
let sentenceLength;

// called in GenLsystem as well
let branchLength;

// how much the angle changes
let angleInc;

let angle;
let rootLen;

// Refers to the tpe of L-System being drawn
let Lsystem = 0;

// Start and end for the root line
let startingPoint;
let startingEnd;

// Scene text is all of the text on screen
// when Space is pressed this display is set to none
let sceneText;

// shows the entire sentence generated in generate function
let showSentence = false;

// varable that holds the shown sentence in html
let showLSystem;

// Pretty obvious
let rainbow = false;
let GrowRate = 1;

let autoGenerate = false;

function setup() {
  // initilize the canvas position to the canvas container div
  let canvas = createCanvas(700, 800);
  canvas.parent("canvascontainer");
  background(51);

  // Root Values
  startingPoint = createVector(width / 2, height);
  startingEnd = createVector(width / 2, height - rootLen);
  rootLen = 100;

  //-------Create rules, Generate sentence then start the scene---------//

  createRules();
  for (let i = 0; i < sentenceLength; i++) {
    generate();
  }

  // Holds the sentence generated and shown in html
  showLSystem = createP("");

  // start the scene
  resetScene();

  // Update the stats shown in html file
  if (rules[0] != undefined) {
    Rule1TextA.html(rules[0].a);
    Rule1TextB.html(rules[0].b);
  }
  if (rules[1] != undefined) {
    Rule2TextA.html(rules[1].a);
    Rule2TextB.html(rules[1].b);
    Rule2.style.display = "revert";
  } else {
    Rule2.style.display = "none";
  }
}
function preload() {
  // the rule2 variable is for when the Lsystem does not have a rule 2
  // rule2 display will be set to none
  Rule2 = document.getElementById("Rule2");

  sceneText = document.getElementById("SceneText");
  controls = document.getElementById("controls");

  // shown in controls
  GrowRateStat = select("#GrowRateStat");
  autoGenerateStat = select("#AutoGenerate");

  // Show Under axiom
  AngleStats = select("#AngleStats");
  SentenceIterations = select("#SentenceIterations");

  AxiomText = select("#AxiomText");

  // rules shown on screen
  // A and B are the indexes within rules object
  Rule1TextA = select("#Rule1A");
  Rule1TextB = select("#Rule1B");

  Rule2TextA = select("#Rule2A");
  Rule2TextB = select("#Rule2B");
}

// Create the sentence
function generate() {
  let nextSentence = "";

  // Loops through the entire sentence and if any letters match to the ones in rules
  // switch them according the rules current index
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let i = 0; i < rules.length; i++) {
      if (current == rules[i].a) {
        found = true;
        nextSentence += rules[i].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}



// Creates rules based on the number fed in and resets the scene with the new values
function genLSystem(LsystemNum) {
  Lsystem = LsystemNum;
  startingPoint = createVector(width - 35, height);
  startingEnd = createVector(width - 35, height - rootLen);
  createRules();
  for (let i = 0; i < sentenceLength; i++) {
    generate();
  }
  resetScene();
}

function HideDisplay(display) {
  if (display.style.display != "none") {
    display.style.display = "none";
    controls.style.display = "none";
  } else {
    display.style.display = "revert";
  }
}

// PopBranch defines what branch in plant array to draw to when pop "]" is read
let popBranch;

// Create lines
function turtle() {
  background(51);

  let current = sentence.charAt(counter - 1);

  if (current == "+") {
    // Rotate to the right
    angle += radians(angleInc);
  } else if (current == "-") {
    // Rotate to the left
    angle -= radians(angleInc);
  } else if (current == "[") {
    // push
    currentBranch.angle = angle;
    plantStack.push(currentBranch);
  } else if (current == "]") {
    //pop
    currentBranch = plantStack[plantStack.length - 1];
    angle = currentBranch.angle;

    // Get popBranch ready for when the next line is drawn
    popBranch = plantStack[plantStack.length - 1];
    plantStack.splice(plantStack.length - 1, 1);
  } else if (current == "F" || current == "G") {
    // if you have just popped
    // draw a line from the end of the branch pulled from the stack
    if (popBranch != undefined) {
      currentBranch = popBranch;
    } else {
      currentBranch = plant[plant.length - 1];
    }

    plant.push(currentBranch.newBranch(popBranch));
    currentBranch = plant[plant.length - 1];

    // set to undefined so a branch is drawn on the new current branch
    popBranch = undefined;
  }
}

// change current letter and create another branch
function nextLine() {
  counter++;
  turtle();
}

function draw() {
  background(51);

  for (let i = 0; i < GrowRate; i++) {
    if (counter < sentence.length) {
      nextLine();
    } else if (autoGenerate) {
      if (Lsystem >= 8) {
        Lsystem = 0;
      } else {
        Lsystem++;
      }
      genLSystem(Lsystem);
    }
  }

  if (showSentence) {
    showLSystem.html(sentence);
  } else {
    showLSystem.html("");
  }

  for (let i = 0; i < plant.length; i++) {
    // show branches
    plant[i].show();
  }

  // Ground
  noStroke();
  fill(0, 100, 0);
  ellipse(width / 2, height, width * 1.5, 100);

  // Update stats
  AxiomText.html(axiom);
  AngleStats.html(angleInc);
  SentenceIterations.html(sentenceLength);

  autoGenerateStat.html(autoGenerate);
  GrowRateStat.html(GrowRate);

  if (rules[0] != undefined) {
    Rule1TextA.html(rules[0].a);
    Rule1TextB.html(rules[0].b);
  }
  if (rules[1] != undefined) {
    Rule2.style.display = "revert";
    Rule2TextA.html(rules[1].a);
    Rule2TextB.html(rules[1].b);
  } else {
    Rule2.style.display = "none";
  }
}


// Called in setup
function resetScene() {
  plant = [];
  plantStack = [];

  // just if it was set to a value when reset is called
  popBranch = undefined;

  // reset current letter
  counter = 0;

  // Initilizing angle after setup because radians function is part of p5js library
  if (Lsystem == 5) {
    angle = radians(90);
  } else {
    angle = radians(0);
  }

  // Root
  plant[0] = new Branch(startingPoint, startingEnd);
  currentBranch = plant[0];
}

