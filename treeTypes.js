// switch function is called when a number is pressed in keyPressed function
function createRules(string) {
  // Reset values until told otherwise
  rules = [];

  // This initilization stuff looks real messy
  // But I can't be bothered to refactor it lol
  rootLen = 100;
  sentenceLength = 4;
  angleInc = 25;
  branchLength = 11;

  startingPoint = createVector(width / 2, height);
  startingEnd = createVector(width / 2, height - rootLen);

  switch (Lsystem) {
    case 0:
      // Basic Tree
      axiom = "F";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "FF+[+F-F-F]-[-F+F+F]",
      };
      sentenceLength = 4;
      angleInc = 25;
      branchLength = 11;
      break;
    case 1:
      // SMALL LONG BUSH
      axiom = "Y";
      sentence = axiom;

      rules[0] = {
        a: "Y",
        b: "YFX[+Y][-Y]",
      };
      rules[1] = {
        a: "X",
        b: "X[-FFF][+FFF]FX",
      };
      sentenceLength = 5;
      angleInc = 25;
      branchLength = 10;
      break;
    case 2:
      // BIG BRANCHING BUSH
      axiom = "F";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "F[+FF][-FF]F[-F][+F]F",
      };
      sentenceLength = 4;
      angleInc = 35;
      branchLength = 6;
      break;
    case 3:
      // ROTATED PLANT

      axiom = "X";
      sentence = axiom;

      rules[0] = {
        a: "X",
        b: "F+[[X]-X]-F[-FX]+X",
      };
      rules[1] = {
        a: "F",
        b: "FF",
      };
      sentenceLength = 6;
      angleInc = 25;
      branchLength = 4;
      break;
    case 4:
      // KEVS WISPY TREE
      axiom = "FX";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "C0FF-[C1-F+F]+[C2+F-F]",
      };
      rules[1] = {
        a: "X",
        b: "C0FF+[C1+F]+[C3-F]",
      };

      rootLen = 100;

      sentenceLength = 4;
      angleInc = 25;
      branchLength = 12;
      break;
    case 5:
      // SIERPINSKI TRIANGLE
      axiom = "F-G-G";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "F-G+F+G-F",
      };
      rules[1] = {
        a: "G",
        b: "GG",
      };
      rootLen = 100;

      sentenceLength = 6;
      angleInc = 120;
      branchLength = 10.5;

      startingPoint = createVector(13, height);
      startingEnd = createVector(13, height - rootLen);
      break;
    case 6:
      // SIERPINSKI's CARPET
      axiom = "F";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "F+F-F-F-G+F+F+F-F",
      };
      rules[1] = {
        a: "G",
        b: "GGG",
      };
      rootLen = 100;

      sentenceLength = 4;
      angleInc = 90;
      branchLength = 8;

      break;
    case 7:
      // KOCH SNOWFLAKE
      axiom = "F++F++F";
      sentence = axiom;

      rules[0] = {
        a: "F",
        b: "F-F++F-F",
      };

      rootLen = 100;

      sentenceLength = 5;
      angleInc = 60;
      branchLength = 2.45;

      startingPoint = createVector(177, height);
      startingEnd = createVector(177, height - rootLen);
      break;
    case 8:
      // HILBERTS CURVE
      axiom = "X";
      sentence = axiom;

      rules[0] = {
        a: "X",
        b: "-YF+XFX+FY-",
      };
      rules[1] = {
        a: "Y",
        b: "+XF-YFY-FX+",
      };
      rootLen = 100;

      sentenceLength = 5;
      angleInc = 90;
      branchLength = 20;

      startingPoint = createVector(width - 35, height);
      startingEnd = createVector(width - 35, height - rootLen);
  }
}

//----------------------CONTROLS-------------------------------//
function keyPressed() {
  if (key == "R") {
    rainbow = !rainbow;
  }
  if (key == "M") {
    resetScene();
  }
  if (key == "E") {
    showSentence = !showSentence;
  }
  if (key == "C") {
    HideDisplay(controls);
  }
  if (key == "G") {
    autoGenerate = !autoGenerate;
  }
  if (key == " ") {
    HideDisplay(sceneText);
  }

  if (key == "D") {
    if (GrowRate < 50) {
      GrowRate++;
    }
  }
  if (key == "A") {
    if (GrowRate > 0) {
      GrowRate--;
    }
  }
  if (key == "P") {
    GrowRate = 50;
  }

  if (key == "1") {
    genLSystem(0);
  }
  if (key == "2") {
    genLSystem(1);
  }
  if (key == "3") {
    genLSystem(2);
  }
  if (key == "4") {
    genLSystem(3);
  }
  if (key == "5") {
    genLSystem(4);
  }
  if (key == "6") {
    genLSystem(5);
  }
  if (key == "7") {
    genLSystem(6);
  }
  if (key == "8") {
    genLSystem(7);
  }
  if (key == "9") {
    genLSystem(8);
  }

  if (key == "0") {
    GrowRate = 0;
  }
}
