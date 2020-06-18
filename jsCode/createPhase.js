function createPhase(taskVer,keysToUse) {

  // create learning subphase
  let thisPhase = [];

  // generate randomized keys and middle items assignments, and middle and high learning and transfer rules
  [permKeys, permMiddleItems, middleRules, highRules, lowTransferRules, highTransferRules] = randomizeKeyMidItemAssignment(keysToUse);

  //randomize goal star order for learning subphase
  let learnGoals = d3.shuffle([0,0,0,1,1,1,2,2,2,3,3,3]);
  if (IS_DEBUG) learnGoals = [0,1,2,3];

  // add blocks to learning subphase
  for (n_block = 0; n_block < learnGoals.length; n_block++) {
    thisPhase.push({
      timeline: createBlock("learning", n_block, taskVer, permKeys, middleRules, highRules, learnGoals),
      phase: taskVer,
      subphase:"learning",
      block: n_block+1,
      goalStar: learnGoals[n_block],
    });
  }

  // create testing subphase (using respective transfer rules)
  let transferGoals = [];

  if (taskVer == "A") {
    transferGoals = HIGH_TRANSFER_GOALS;
    highRules = highTransferRules;
  }
  else {
    transferGoals = LOW_TRANSFER_GOALS;
    middleRules = lowTransferRules;
  }

  for (n_block = 0; n_block < transferGoals.length; n_block++) {
    thisPhase.push({
      timeline: createBlock("transfer", n_block, taskVer, permKeys, middleRules, highRules, transferGoals),
      phase: taskVer,
      subphase:"transfer",
      block: n_block+1,
      goalStar: transferGoals[n_block],
    });
  }

return thisPhase;
}
