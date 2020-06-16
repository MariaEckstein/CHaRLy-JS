// create a block

function createPhase(taskVer,keysToUse) {

  let thisPhase = [];
  [permKeys, permMiddleItems,permMiddleRules, permHighRules] = randomizeKeyMidItemAssignment(keysToUse);

  for (n_block = 0; n_block < NUM_BLOCKS; n_block++) {

    thisPhase.push({
      timeline: createBlock(n_block, taskVer, permKeys, permMiddleItems,permMiddleRules, permHighRules)});
  }
  return thisPhase;
}
