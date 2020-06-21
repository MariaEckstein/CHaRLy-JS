// initializes experiment parameters, randomizes key/item assignments

var IS_DEBUG = true;

// defines the 2 key sets that the machines will use
var keys1 = [81, 87, 69, 82];
var letters1 = ["q", "w", "e", "r"]; // for reference

var keys2 = [85, 73, 79, 80]; //
var letters2 = ["u", "i", "o", "p"];

var NUM_PHASES = 2;
var NUM_TRIALS = 25;
var NUM_PRACTICE_TRIALS = 3;
var NUM_REP_PER_LEARN_GOAL = 3;
var NUM_REP_PER_TRANSFER_GOAL = 4;
var allPoints = Array(3).fill(0);

var LOW_TRANSFER_GOALS = pseudo_randomize(NUM_REP_PER_TRANSFER_GOAL, [1, 2]);
var HIGH_TRANSFER_GOALS = pseudo_randomize(NUM_REP_PER_TRANSFER_GOAL, [1, 2]);

var BREAK_DURATION = 60000;
var NEW_STAR_DURATION = 1500;
var TRIAL_RESPONSE_DURATION = 2000;
var TRIAL_END_DURATION = 500;

var CONTINUE = "<p class='continuePrompt'>[Press space to continue]</p>";
var ANYKEY = "<p class='continuePrompt'>[Press any key to start]</p>";
var TIMEOUT_MSG = "<div class='center'><p>You took too long to repsond to that last trial.<br>Please be faster in the future."+
                  "<p><br>Press any key when you're ready to start again!</p></div>";

var tutorialKeys = [68,70,74,75]; // [d,f,j,k]
var tutorialMidRules = {
  0: [70, 74],
  1: [68, 75],
};
var tutorialHighRules = {
  0: [0,1],
}

if (IS_DEBUG) {
  LOW_TRANSFER_GOALS = [1,2]
  HIGH_TRANSFER_GOALS = [1,2];
  NUM_TRIALS = 10;
  // TRIAL_RESPONSE_DURATION = null;
}

// randomize phase order and key assignment order
function randomizeKeysVer(phase, subjID) {

  switch(phase) {
    case 0:  // when phase == 0, do one assignment
      switch(subjID % 4) {
        case 0:
          var keysToUse = keys1;
          var taskVer = "A";
          var hand = "left";
          break;
        case 1:
          var keysToUse = keys2;
          var taskVer = "A";
          var hand = "right";
          break;
        case 2:
          var keysToUse = keys1;
          var taskVer = "B";
          var hand = "left";
          break;
        case 3:
          var keysToUse = keys2;
          var taskVer = "B";
          var hand = "right";
          break;
        }
        break;

      case 1:  // when phase == 1, do the opposite assignment
        switch(subjID % 4) {
          case 0:
            var keysToUse = keys2;
            var taskVer = "B";
            var hand = "right";
            break;
          case 1:
            var keysToUse = keys1;
            var taskVer = "B";
            var hand = "left";
            break;
          case 2:
            var keysToUse = keys2;
            var taskVer = "A";
            var hand = "right";
            break;
          case 3:
            var keysToUse = keys1;
            var taskVer = "A";
            var hand = "left";
            break;
          }
          break;
  }
  return [taskVer, keysToUse, hand];
}

function randomizeKeyMidItemAssignment(keysToUse, taskVer) {

  // shuffle key assignment to middle rules, and middle item assignment to high rules
  // console.log("keys to use: "+keysToUse);

  let permKeys = d3.shuffle(keysToUse.slice()); // shuffle keys
  console.log("shuffled keys: "+permKeys)

  let permMiddleItems = d3.shuffle([0,1,2,3]); // shuffle middle items (only identified by #0-3)
  console.log("shuffled middle items: "+permMiddleItems);

  let permStars = d3.shuffle([0,1,2,3]);
  console.log("shuffled stars: "+permStars);

  let middleRules = {};
  let highRules = {};

  for (i = 0; i < 4; i++) {
    item = permMiddleItems[i];
    switch(i) {
      case 0:
        middleRules[item] = [permKeys[0], permKeys[1]];
        highRules[permStars[i]] = [permMiddleItems[0], permMiddleItems[1]];
        break;
      case 1:
        middleRules[item] = [permKeys[2], permKeys[3]];
        highRules[permStars[i]] = [permMiddleItems[2], permMiddleItems[3]];
        break;
      case 2:
        middleRules[item] = [permKeys[1], permKeys[2]];
        highRules[permStars[i]] = [permMiddleItems[1], permMiddleItems[2]];
        break;
      case 3:
        middleRules[item] = [permKeys[3], permKeys[0]];
        highRules[permStars[i]] = [permMiddleItems[3], permMiddleItems[0]];
        break;
      }
  }
  console.log("checking middle rules:");
  console.log(middleRules);

  console.log("high rules: ");
  console.log(highRules);

  let lowTransferRules = Object.assign({},middleRules);
  lowTransferRules[permMiddleItems[2]] = [permKeys[0], permKeys[2]];
  lowTransferRules[permMiddleItems[3]] = [permKeys[3], permKeys[1]];
  console.log("low transfer rules: ");
  console.log(lowTransferRules);

  let highTransferRules = Object.assign({},highRules);
  highTransferRules[permStars[1]] = [permMiddleItems[2], permMiddleItems[1]];
  highTransferRules[permStars[2]] = [permMiddleItems[3], permMiddleItems[2]];
  console.log("high transfer rules: ");
  console.log(highTransferRules)

  return [permKeys,permMiddleItems,middleRules,highRules,lowTransferRules,highTransferRules];
}

function getKeyByValue(obj,value) {
  // console.log(value);
  return Object.keys(obj).find(key => JSON.stringify(obj[key]) === JSON.stringify(value));
}


function pseudo_randomize(n_repetitions_per_element, elements_to_be_permuted) {

  // Pseudo-randomizes elements. It takes the number of repetitions per element,
  // and the elements to be permuted and pseudorandomizes such that the same
  // element never appears twice in a row, and all elements appear exactly once
  // in each block of elements.

  output_array = [];
  output_array = output_array.concat(elements_to_be_permuted);
  output_array = jsPsych.randomization.shuffle(output_array);
  // console.log("output_array", output_array);
  while (output_array.length < n_repetitions_per_element * elements_to_be_permuted.length) {
    new_elements = elements_to_be_permuted;
    new_elements = jsPsych.randomization.shuffle(new_elements);
    // console.log("new_elements", new_elements);
    if (output_array[output_array.length - 1] != new_elements[0]) {
      // console.log("yes!", output_array[output_array.length - 1], new_elements[0]);
      output_array = output_array.concat(new_elements);
    }
  }
  return output_array
}
