function createTrial(subphase, block, trial, taskVer, permKeys, middleRules, highRules, goal) {

  let thisTrial = [];

  for (let n_subtrial = 0; n_subtrial < 5; n_subtrial++) {

    // initialize vars for this trial
    var midItems = Array(2);
    var checkKeys = Array(4);
    var noAnswer = false;
    let subtrial = {
      type: "html-keyboard-response",
      stimulus: function() {
        if (noAnswer) {
          console.log("timed out @ last key press");
          return TIMEOUT_MSG;
        }
        let subtrialKeys = jsPsych.data.getLastTimelineData().select('key_press').values;
        let points = `<p class='points'>Points: ${blockPoints_c}</p>`;
        switch(n_subtrial) {
          case 0: // show goal, machine, and key grid only
            return points + drawTrialBase(taskVer, goal, []);
          case 1: // update keys
            checkKeys[n_subtrial-1] = permKeys.indexOf(subtrialKeys[n_subtrial-1]);
            return points + drawTrialBase(taskVer, goal, checkKeys);
          case 2: // update keys and middle item
            checkKeys[n_subtrial-1] = permKeys.indexOf(subtrialKeys[n_subtrial-1]);
            let firstTwoKeys = subtrialKeys.slice(0, 2);
            midItems[0] = Number(getKeyByValue(middleRules,firstTwoKeys));
            return points + drawTrialBase(taskVer, goal, checkKeys) + drawMidItems(midItems,taskVer);
          case 3: // update keys and middle item
            checkKeys[n_subtrial-1] = permKeys.indexOf(subtrialKeys[n_subtrial-1]);
            return points + drawTrialBase(taskVer, goal, checkKeys) + drawMidItems(midItems,taskVer);
          case 4:
            checkKeys[n_subtrial-1] = permKeys.indexOf(subtrialKeys[n_subtrial-1]);
            let lastTwoKeys = subtrialKeys.slice(2, 4);
            midItems[1] = Number(getKeyByValue(middleRules,lastTwoKeys));
            let finalItem = getKeyByValue(highRules,midItems);
            if (finalItem == goal) blockPoints_c += 1;
            points = `<p class='points'>Points: ${blockPoints_c}</p>`;
            return points + drawTrialBase(taskVer, goal, checkKeys)
                          + drawMidItems(midItems, taskVer)
                          + drawFinalItem(finalItem, taskVer);
        }
      },
      choices: function() {
        if (noAnswer) return jsPsych.ALL_KEYS;
        if (n_subtrial == 4) return jsPsych.NO_KEYS;
        else return permKeys;
      },
      trial_duration: function() {
        if (noAnswer) return null;
        if (n_subtrial==4) return TRIAL_END_DURATION
        return null//TRIAL_RESPONSE_DURATION;
      },
      data: {
        phase: taskVer,
        subphase: subphase,
        block: block,
        trial: trial,
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
