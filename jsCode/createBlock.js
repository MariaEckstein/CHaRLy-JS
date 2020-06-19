// create a block

function createBlock(phase, subphase, block, taskVer, permKeys, middleRules, highRules, blockGoals) {

  let thisBlock = [];
  let thisBlockGoal = blockGoals[block];

  thisBlock.push({ // show goal star
    type: "html-keyboard-response",
    stimulus: "<p>The goal star is now: </p>"+
              `<div class="center"><img src='assets/goal${thisBlockGoal}${taskVer}.png'></img></div>`,
    trial_duration: NEW_STAR_DURATION,
    choices: jsPsych.NO_KEYS,
  });

  for (n_trial = 0; n_trial < NUM_TRIALS; n_trial++) {
    thisBlock.push({
      timeline: createTrial(phase, subphase, block, n_trial, taskVer, permKeys, middleRules, highRules, thisBlockGoal),
      trial: n_trial,
    });
  }
  return thisBlock;
}
