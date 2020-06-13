// create a block

function createPhase() {

  thisPhase = [];

  for (n_block = 0; n_block < NUM_BLOCKS; n_block++) {

    // thisPhase.push(createBlock(n_block));
    thisPhase.push({timeline: createBlock(n_block)});

  }
  return thisPhase;
}
