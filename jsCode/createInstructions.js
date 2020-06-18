/*Great job!
We’ll now move to another machine.
You’ll use the keys U, I, O, and P of your right hand!i
This machine makes different stars, using different tools than before.
Otherwise, is it similar to the one before. Do your best!
Do you have any questions?
[Press space to start.]*/

var CONTINUE = "<p class='continuePrompt'>[Press space to continue]</p>";

var tutorialKeys = [68,70,74,75]; // [d,f,j,k]
var tutorialLetters = ["d","f","j","k"]
var tutorialMidRules = {
  "hammer": [70, 74],
  "chisel": [68, 75],
};
var tutorialHighRules = {
  "coin": ["hammer","chisel"],
}

function createInstructions() {
  instructions = [];
  // first slide
  instructions.push({
    type: "html-keyboard-response",
    stimulus: "<p><br>This machine can make coins.</p>"+
              "<img class='starMachine' src='assets/tutorial/machine.png'></img>"+
              "<p>You can control the machine using the D, F, J, and K keys.</p>"+
              CONTINUE,
    choices: [32],
  });

  instructionTrial = createTutorialTrial("intro", 0, tutorialKeys, tutorialMidRules, tutorialHighRules, "coin");

  instructions.push({timeline:instructionTrial});

  return instructions;
}
