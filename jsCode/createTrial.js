// create a trial

function createTrial(subphase, block, trial, taskVer, permKeys, middleRules, highRules, blockGoal) {

  let thisTrial = [];

  for (let n_subtrial = 0; n_subtrial < 5; n_subtrial++) {

    // initialize vars for this trial

    var trialStims = "<br>keys: ";
    var trialMidItems = "<br><br>middle items: ";
    var trialFinalItem = "<br>star? "
    var goalStar = `goal star: <img src="assets/goal${blockGoal}${taskVer}.png"></img>`;
    var noAnswer = false;
    let subtrial = {
      type: "html-keyboard-response",
      stimulus: function() {

        if (noAnswer) {
          console.log("timed out @ last key press");
          return TIMEOUT_MSG;
        }

        console.log(`block ${block}, trial ${trial}, subtrial ${n_subtrial}`);

        let subtrialKeys = jsPsych.data.getLastTimelineData().select('key_press').values;
        let lastKey = jsPsych.data.getLastTrialData().select('key_press').values[0];
        let lastKey_i = permKeys.indexOf(lastKey);
        let lastStim = `<img src="assets/key${lastKey_i}.png"></img>`;
        let prevTwoKeys = subtrialKeys.slice(n_subtrial-2,n_subtrial);

        switch(n_subtrial) {
          case 0:
            return goalStar;
          case 1:
            trialStims += lastStim;
            break;
          case 2:
            trialStims += lastStim;
            let firstItem = getKeyByValue(middleRules,prevTwoKeys);
            if (firstItem != null) trialMidItems += `<img src="assets/item${firstItem}${taskVer}.png"></img>`;
            break;
          case 3:
            trialStims += lastStim;
            break;
          case 4:
            trialStims += lastStim;
            let secondItem = getKeyByValue(middleRules,prevTwoKeys);
            if (secondItem != null) trialMidItems += `<img src="assets/item${secondItem}${taskVer}.png"></img>`;
            let firstTwoKeys = subtrialKeys.slice(0, 2);
            let lastTwoKeys = subtrialKeys.slice(2, 4);
            let trialItems = [Number(getKeyByValue(middleRules,firstTwoKeys)),Number(getKeyByValue(middleRules,lastTwoKeys))];
            let finalItem = getKeyByValue(highRules,trialItems);
            if (finalItem == null) trialFinalItem += `<img src="assets/goal-1.png"></img>`;
            else {
              trialFinalItem += `<img src="assets/goal${finalItem}${taskVer}.png"></img>`;
              if (finalItem == blockGoal) blockPoints_c += 1;
            }
            break;
        }
        var blockPoints = `current block points: ${blockPoints_c}`;
        return goalStar + "<br><br>" +
                trialMidItems + "<br>" + trialFinalItem + "<br>" +
                blockPoints + "<br><br>" + trialStims + displayDebugInfo(subphase,block,trial,taskVer);
      },
      choices: function() {
        if (noAnswer) return jsPsych.ALL_KEYS;
        if (n_subtrial == 4) return jsPsych.NO_KEYS;
        else return permKeys;
      },
      trial_duration: function() {
        if (noAnswer) return null;
        if (n_subtrial==4) return TRIAL_END_DURATION
        return TRIAL_RESPONSE_DURATION;
      },
      data: {
        phase: taskVer,
        subphase: subphase,
        block: block+1,
        trial: trial+1,
      },
      on_finish: function(data) {
        if (noAnswer) jsPsych.endCurrentTimeline();

        let thisAnswer = data.key_press;
        if (data.rt == null && n_subtrial < 4) {
          console.log("too slow");
          noAnswer = true;
        }
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
