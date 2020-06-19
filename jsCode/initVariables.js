// initializes experiment parameters, randomizes key/item assignments

var IS_DEBUG = true;

// defines the 2 key sets that the machines will use
var keys1 = [81, 87, 69, 82];
var letters1 = ["q", "w", "e", "r"]; // for reference

var keys2 = [85, 73, 79, 80]; //
var letters2 = ["u", "i", "o", "p"];

var LOW_TRANSFER_GOALS = d3.shuffle([1,1,1,2,2,2,3,3,3]);
var HIGH_TRANSFER_GOALS = d3.shuffle([1,1,1,2,2,2]);

var NUM_PHASES = 2;
var NUM_TRIALS = 25;
var NUM_PRACTICE_TRIALS = 3;
var blockPoints_c = 0;

var TRIAL_RESPONSE_DURATION = 5000;
var TRIAL_END_DURATION = 500;
var TIMEOUT_MSG = "<p>You took too long to repsond to that last trial.<br>Please be faster in the future."+
                  "<p><br>Press any key when you're ready to start again!</p>"

var CONTINUE = "<p class='continuePrompt'>[Press space to continue]</p>";
var ANYKEY = "<p class='continuePrompt'>[Press any key to start]</p>";

var tutorialKeys = [68,70,74,75]; // [d,f,j,k]
var tutorialMidRules = {
  0: [70, 74],
  1: [68, 75],
};
var tutorialHighRules = {
  0: [0,1],
}

if (IS_DEBUG) {
  LOW_TRANSFER_GOALS = [1]
  HIGH_TRANSFER_GOALS = [1];
  NUM_TRIALS = 5;
  // var TRIAL_RESPONSE_DURATION = null;
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

function randomizeKeyMidItemAssignment(keysToUse) {
  // shuffle key assignment to middle rules, and middle item assignment to high rules

  let permKeys = d3.shuffle(keysToUse.slice()); // shuffle keys
  let permMiddleItems = d3.shuffle([0,1,2,3]); // shuffle middle items (only identified by #0-3)

  if (IS_DEBUG) {permKeys = keysToUse, permMiddleItems = [0,1,2,3]}

  let middleRules = { // create middle rules using new key assignment
    0: [permKeys[0], permKeys[1]],
    1: [permKeys[2], permKeys[3]],
    2: [permKeys[1], permKeys[2]],
    3: [permKeys[3], permKeys[0]]
  };

  let lowTransferRules = Object.assign({},middleRules);
  lowTransferRules["2"] = [permKeys[0], permKeys[2]];
  lowTransferRules["3"] = [permKeys[3], permKeys[1]];

  let highRules = { // create high rules using new middle item permutation
    0: [permMiddleItems[0], permMiddleItems[1]],
    1: [permMiddleItems[2], permMiddleItems[3]],
    2: [permMiddleItems[1], permMiddleItems[2]],
    3: [permMiddleItems[3], permMiddleItems[0]]
  };

  let highTransferRules = Object.assign({},highRules);
  highTransferRules["1"] = [permMiddleItems[2], permMiddleItems[1]];
  highTransferRules["2"] = [permMiddleItems[3], permMiddleItems[2]];

  return [permKeys,permMiddleItems,middleRules,highRules,lowTransferRules,highTransferRules];
}

function getKeyByValue(obj,value) {
  // console.log(value);
  return Object.keys(obj).find(key => JSON.stringify(obj[key]) === JSON.stringify(value));
}
