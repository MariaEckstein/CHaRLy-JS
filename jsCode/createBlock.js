// create a block

function createBlock(block, taskVer, permKeys, permMiddleItems,permMiddleRules, permHighRules) {

  let thisBlock = [];
  blockPoints_c = 0; // reset point counter

  for (n_trial = 0; n_trial < NUM_TRIALS; n_trial++) {
    thisBlock.push({
      timeline: createTrial(block, n_trial, taskVer, permKeys, permMiddleItems,permMiddleRules, permHighRules)});
  }

  return thisBlock;
}
