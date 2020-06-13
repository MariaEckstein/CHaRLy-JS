// create a block

function createBlock(block) {

  thisBlock = [];
  blockPoints_c = 0; // reset point counter

  console.log(blockGoals[block]);

  for (n_trial = 0; n_trial < NUM_TRIALS; n_trial++) {
    thisBlock.push({timeline: createTrial(block,n_trial)});
  }

  return thisBlock;
}
