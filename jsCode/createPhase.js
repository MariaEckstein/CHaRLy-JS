// create a block

function createPhase(keysToUse, taskVer) {

  thisPhase = [];

  for (n_block = 0; n_block < NUM_BLOCKS; n_block++) {

    // thisPhase.push(createBlock(n_block));
    thisPhase.push({timeline: createBlock(n_block, keysToUse, taskVer)});

  }
  return thisPhase;
}
