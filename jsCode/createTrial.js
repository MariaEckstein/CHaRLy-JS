// create a trial

function createTrial(block, trial, taskVer, permKeys, permMiddleItems, middleRules, highRules, blockGoals) {

  let thisTrial = [];

  let thisBlockGoal = blockGoals[block];

  for (let n_subtrial = 0; n_subtrial < 5; n_subtrial++) {

    // initialize vars for this trial

    var trialStims = "<br>keys: ";
    var trialMidItems = "<br><br>middle items: ";
    var trialFinalItem = "<br>star? "


    // var LastSubtrial = jsPsych.data.getLastTrialData();

    let subtrial = {

      type: "html-keyboard-response",
      stimulus: function() {
        goalStar = `goal star: <img src="assets/goal${thisBlockGoal}${taskVer}.png"></img>`;
        if (n_subtrial > 0) {

          let subtrialKeys = jsPsych.data.getLastTimelineData().select('key_press').values;
          console.log(`Key presses so far are ${subtrialKeys}`);

          // display key.png for previous press
          let lastKey = jsPsych.data.getLastTrialData().select('key_press').values[0];
          console.log(`Key press on previous subtrial ${n_subtrial} was ${lastKey}`);
          let lastKey_i = permKeys.indexOf(lastKey);
          console.log(lastKey,lastKey_i)
          trialStims += `<img src="assets/key${lastKey_i}.png"></img>`;

          // if subtrial 3 or 5 (star of), check if previous 2 keypresses made an item
          if (n_subtrial % 2 == 0) {
            prevTwoKeys = subtrialKeys.slice(n_subtrial-2,n_subtrial);
            console.log(prevTwoKeys);
            let foundItem = getKeyByValue(middleRules,prevTwoKeys)
            if (foundItem != null) trialMidItems += `<img src="assets/item${foundItem}${taskVer}.png"></img>`;
          }

          // if final trial, check if sequences make a star
          if (n_subtrial == 4) {
            let firstTwoKeys = subtrialKeys.slice(0, 2);
            let lastTwoKeys = subtrialKeys.slice(2, 4);
            let trialItems = [Number(getKeyByValue(middleRules,firstTwoKeys)),Number(getKeyByValue(middleRules,lastTwoKeys))];
            let finalItem = getKeyByValue(highRules,trialItems);
            if (finalItem == null) trialFinalItem += `<img src="assets/goal-1.png"></img>`;
            else {
              trialFinalItem += `<img src="assets/goal${finalItem}${taskVer}.png"></img>`;
              if (finalItem == thisBlockGoal) blockPoints_c += 1;
            }
          }

          var blockPoints = `current block points: ${blockPoints_c}`;
          // use a helper function to layout all these components
          return goalStar + "<br><br>" +
                  trialMidItems + "<br>" + trialFinalItem + "<br>" +
                  blockPoints + "<br><br>" + trialStims + displayDebugInfo(block,trial,taskVer,blockGoals);
        }
      },

      choices: function() {
        if (n_subtrial == 4) return jsPsych.NO_KEYS;
        else return permKeys;
      },
      timeout_message: "<p>Took too long, now your candy gone. <br>Next Trial!</p>",
      incorect_text: "",
      corect_text: "",
      feedback_duration: 500,
      trial_duration: function() {
        if (!IS_DEBUG) return TRIAL_RESPONSE_DURATION;
        else {
          if (n_subtrial==4) return TRIAL_RESPONSE_DURATION;
        }
      },

      data: {
        phase: taskVer,
        subphase: function() {
          if (blockGoals.length == 25) return "learning";
          return "transfer";
        },
        block: block+1, // Amy is forgoing 0-indexing because MATLAB owns her
        trial: trial+1,
      },

      on_finish: function(data) {
        let thisAnswer = data.key_press;
        if (thisAnswer == null) jsPsych.endCurrentTimeline();
        return data;
      }
    }
    thisTrial.push(subtrial);
  }
  return thisTrial;
}


  /* a trial is actually a timeline that consists of 4 subtrial, since there
  will be a maximum of 4 key presses.

  the stimulus of each trial is the
 symbol(s) of the previous key(s), as well as img of middle items if appropriate;
 if first trial, there is no key. stimulus should be a function that returns the
 correct stimuli depending on what happened during the previous trial.

 the feedback is NOTHING unless it's the last trial. if it's the last trial, we show


 [the present key's symbol; if subtrial = 2, feedback includes an
 additional middle item. if subtrial = 4, feedback includes additional middle item(s)
 and a dust or star. show_stim_on_feedback param should be on. feedback is a
 function that returns the html of the feedback. feedback also includes point
 tracker, since points update after subtrial 4 (end of trial).

 the prompt can be set to html for the goal star since that doesn't change.

  */
  // // just trying to build trial
