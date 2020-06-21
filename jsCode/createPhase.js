function createPhase(phase, taskVer, keysToUse, hand) {
  // create learning subphase
  let thisPhase = [];
  if (hand == "right") letters = letters2;
  else letters = letters1;

  thisPhase.push({ // introduce new machine
    type: "html-keyboard-response",
    stimulus: "<div class='newBox'>This is the new machine: </p>"+
              `<img class="machine" src='assets/machine${taskVer}.png'></img></div>`+
              `<div class='handBox'>It is controlled by keys: ${letters} with the ${hand} hand, as shown below:<br>`+
              `<img class="hand" src='assets/${hand}Hand.png'></img></div>`+ ANYKEY,
    choices: jsPsych.ALL_KEYS,
  });

  // generate randomized keys and middle items assignments, and middle and high learning and transfer rules
  [permKeys, permMiddleItems, middleRules, highRules, lowTransferRules, highTransferRules] = randomizeKeyMidItemAssignment(keysToUse, taskVer);

  //randomize goal star order for learning subphase
  learnGoals = pseudo_randomize(NUM_REP_PER_LEARN_GOAL, [0, 1, 2, 3]);
  if (IS_DEBUG) learnGoals = [0,1,2,3];

  // add blocks to learning subphase
  for (n_block = 0; n_block < learnGoals.length; n_block++) {
    thisPhase.push({
      timeline: createBlock(phase, "learning", n_block, taskVer, permKeys, middleRules, highRules, learnGoals),
      phase: taskVer,
      subphase:"learning",
      block: n_block,
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
      timeline: createBlock(phase, "transfer", n_block, taskVer, permKeys, middleRules, highRules, transferGoals),
      phase: taskVer,
      subphase:"transfer",
      block: n_block,
      goalStar: transferGoals[n_block],
    });
  }

  thisPhase.push({ // show points and give break or goodbye message
    type: "html-keyboard-response",
    stimulus: function() {
      let msg = `<p>Great job! You unlocked ${allPoints[phase]} stars using the last machine.</p>`;
      if (phase == 0) msg += "<p>You will now have a 1 minute break, after which you'll be able \
          to control a new machine</p>"+
          "<p>[Press any key to move on.]<p>";
      else msg += "<p>Thank you for participating! Your compensation will arrive shortly/\
               click here to receive RPP credit. Have a wonderful day!</p>";
      return `<div class="center">${msg}</div>`;
    },
    choices: jsPsych.ALL_KEYS,
  });

  if (phase==0) { // give one minute break if first half
    thisPhase.push({
      type: "html-keyboard-response",
      stimulus: "<div class='center'>1 minute break.",
      trial_duration: BREAK_DURATION,
      choices: jsPsych.NO_KEYS,
    });
  }
return thisPhase;
}
