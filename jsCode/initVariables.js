// closet of experiment parameters (AKA i need to organize this)

// defines the 2 key sets that the machines will use
var keys1 = [81, 87, 69, 82];
var letters1 = ["q", "w", "e", "r"];  // Maria: I think there's something wrong with key 53 -> it matches to "5" on my keyboard, not "e"
                                      // Amy: thanks for catching it, I fixed the mapping! 
var keys2 = [85, 73, 79, 80]; //
var letters2 = ["u", "i", "o", "p"];

var middleRules = {0: [0, 1], 1: [2, 3], 2: [1, 2], 3: [3, 0]};
var highRules = {0: [0, 1], 1: [2, 3], 2: [1, 2], 3: [3, 0]};

// randomize phase order and key assignment order
function randomizeKeysVer(phase, subjID) {

  switch(phase) {
    case 0:  // when phase == 0, do one assignment
      switch(subjID % 4) {
        case 0:
          var keysToUse = keys1;
          var taskVer = "A";
          break;
        case 1:
          var keysToUse = keys2;
          var taskVer = "A";
          break;
        case 2:
          var keysToUse = keys1;
          var taskVer = "B";
          break;
        case 3:
          var keysToUse = keys2;
          var taskVer = "B";
          break;
        }
        break;

      case 1:  // when phase == 1, do the opposite assignment
        switch(subjID % 4) {
          case 0:
            var keysToUse = keys2;
            var taskVer = "B";
            break;
          case 1:
            var keysToUse = keys1;
            var taskVer = "B";
            break;
          case 2:
            var keysToUse = keys2;
            var taskVer = "A";
            break;
          case 3:
            var keysToUse = keys1;
            var taskVer = "A";
            break;
          }
          break;
  }
  return [taskVer, keysToUse];
}

function randomizeKeyMidItemAssignment(keysToUse) {
  // shuffle key assignment to middle rules, and middle item assignment to high rules

  let permKeys = d3.shuffle(keysToUse.slice()); // shuffle keys
  let permMiddleItems = d3.shuffle([0,1,2,3]); // shuffle middle items (only identified by #0-3)

  console.log(permKeys);

  let permMiddleRules = { // create middle rules using new key assignment
    0: [permKeys[0], permKeys[1]],
    1: [permKeys[2], permKeys[3]],
    2: [permKeys[1], permKeys[2]],
    3: [permKeys[3], permKeys[0]]};

  let permHighRules = { // create middle rules using new middle item permutation
    0: [permMiddleItems[0], permMiddleItems[1]],
    1: [permMiddleItems[2], permMiddleItems[3]],
    2: [permMiddleItems[1], permMiddleItems[2]],
    3: [permMiddleItems[3], permMiddleItems[0]]};

  return [permKeys,permMiddleItems,permMiddleRules,permHighRules];
}

/*random assignment of middle-layer items to numbers in the blocks above
  --> given list of middle item represented by [0,1,2,3], shuffle this list, then
  use indices of these items s.t. the numbers in the values of learning/transfer
  rules represent the item indices, not the items themselves.

  random assignment of keyboard keys to numbers in the blocks above
  --> given list of numeric codes, e.g. [85, 73, 79, 80], shuffle this list, then
  use indices of these items s.t. the numbers in the values of middle items
  represent the key indcies, not the items themselves.

  maybe i should write a function for this translation?

*/

var NUM_PHASES = 2;
var NUM_BLOCKS = 12;
var blockGoals = d3.shuffle([0,0,0,1,1,1,2,2,2,3,3,3]); // Amy: move this to createPhase

var NUM_TRIALS = 25;
var TIMEOUT_DURATION = 1000; // need to double check

var blockPoints_c = 0;

// basic trial configurations
var TRIAL_RESPONSE_DURATION = 1000;

/*
important functions
highTransfer = highTransferStarMachine(win, lenGoalSeq = lenGoalSeq)
lowTransfer = lowTransferStarMachine(win, lenGoalSeq = lenGoalSeq)

MACHINE_TYPE = "high" // rules for creating middle items stay the same, rules for which items form stars become different
	def getRules(self):
		middleRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
		learningRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
		transferRules = {0: (0, 1), 1: (2, 1), 2: (3, 2), 3: (3, 0)}
		return [middleRules, learningRules], [middleRules, transferRules]

MACHINE_TYPE = "low" // rules for creating middle items change, rules for which items form stars stay the same
def getRules(self):
  middleRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
  learningRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
  transferRules = {0: (0, 1), 1: (2, 3), 2: (0, 2), 3: (3, 1)}
  return [learningRules, highRules], [transferRules, highRules]
*/

function getKeyByValue(obj,value) {
  console.log(value);
  return Object.keys(obj).find(key => JSON.stringify(obj[key]) === JSON.stringify(value));
  // let foundItem = Object.keys(middleRules)
  //     .find(key => JSON.stringify(middleRules[key]) === JSON.stringify(lastTwoKeys));
}
