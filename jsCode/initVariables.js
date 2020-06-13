// closet of experiment parameters (AKA i need to organize this)

// defines the 2 key sets that the machines will use
var keys1 = [81,87,53,82]; // ["q", "w", "e", "r"];
var keys2 = [85,73,79,80]; // ["u", "i", "o", "p"]

// everything below is debug
var taskVer = "B"; // hardcoding some randomization rn

var keysToUse = keys2; // righthanded debugging; otherwise pick one and shuffle
                   // this random shuffle covers randomization item B
// other temp debugging rules and objects
var middleRules = {0: [85, 73], 1: [79, 80], 2: [73, 79], 3: [80, 85]}; // UGHGHGJHLfajksflkasdj
var learningRules = {0: [0, 1], 1: [2, 3], 2: [1, 2], 3: [3, 0]};
var transferRules = {0: [0, 1], 1: [2, 1], 2: [3, 2], 3: [3, 0]};

var NUM_BLOCKS = 12;
var blockGoals = d3.shuffle([0,0,0,1,1,1,2,2,2,3,3,3]); // this implementation works i'm just horrible at this task

var NUM_TRIALS = 10; //25;
var TIMEOUT_DURATION = 1000; // need to double check

var blockPoints_c = 0;

// basic trial configurations
var TRIAL_RESPONSE_DURATION = 1000;

/*
important functions
highTransfer = highTransferStarMachine(win, lenGoalSeq = lenGoalSeq)
lowTransfer = lowTransferStarMachine(win, lenGoalSeq = lenGoalSeq)

MACHINE_TYPE = "high"
	def getRules(self):
		middleRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
		learningRules = {0: (0, 1), 1: (2, 3), 2: (1, 2), 3: (3, 0)}
		transferRules = {0: (0, 1), 1: (2, 1), 2: (3, 2), 3: (3, 0)}
		return [middleRules, learningRules], [middleRules, transferRules]

MACHINE_TYPE = "low"
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

// make a image maker helper function??

// make a randomizer helper function??