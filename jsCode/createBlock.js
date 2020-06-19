// create a block

function createBlock(subphase, block, taskVer, permKeys, middleRules, highRules, blockGoals) {

  let thisBlock = [];
  let thisBlockGoal = blockGoals[block];
  blockPoints_c = 0;

  for (n_trial = 0; n_trial < NUM_TRIALS; n_trial++) {
    thisBlock.push({
      timeline: createTrial(subphase, block, n_trial, taskVer, permKeys, middleRules, highRules, thisBlockGoal),
      trial: n_trial + 1,
    });
  }
  return thisBlock;
}
