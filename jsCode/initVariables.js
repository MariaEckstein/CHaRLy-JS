// closet of experiment parameters (AKA i need to organize this)

var IS_DEBUG = false;

// defines the 2 key sets that the machines will use
var keys1 = [81, 87, 69, 82];
var letters1 = ["q", "w", "e", "r"]; // for reference

var keys2 = [85, 73, 79, 80]; //
var letters2 = ["u", "i", "o", "p"];

var LOW_TRANSFER_GOALS = d3.shuffle([1,1,1,2,2,2,3,3,3]);
var HIGH_TRANSFER_GOALS = d3.shuffle([1,1,1,2,2,2]);

var NUM_PHASES = 2;
var NUM_TRIALS = 25;

if (IS_DEBUG) {
  LOW_TRANSFER_GOALS = [1,2,3,];
  HIGH_TRANSFER_GOALS = [1,2];
  NUM_TRIALS = 10;
}

var TRIAL_RESPONSE_DURATION = 1000;
var TIMEOUT_DURATION = 1000; // need to double check

var blockPoints_c = 0;


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
  console.log(value);
  return Object.keys(obj).find(key => JSON.stringify(obj[key]) === JSON.stringify(value));
}

function displayDebugInfo(block,trial,taskVer,blockGoals) {
  let transferVer = 'high';
  if (taskVer == "B") transferVer = 'low';
  let subphase = 'learning';
  if (blockGoals.length >= 6) subphase = 'transfer';
  return `<br>current block: ${block+1}<br>` +
         `current trial: ${trial+1}<br>` +
         `transfer: ${transferVer}<br>` +
         `subphase: ${subphase}<br>`;
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
