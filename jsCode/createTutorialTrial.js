// create a trial

function createTutorialTrial(block, trial, keys, middleRules, highRules) {

  let thisTrial = [];
  let subphase = "tutorial";

  for (let n_subtrial = 0; n_subtrial < 5; n_subtrial++) {

    // initialize vars for this trial

    var trialStims = "<br>keys: <div class='row'>";
    var trialMidItems = "<br>middle items: ";
    var trialFinalItem = "<br>star? "
    var goalStar = `goal star: <img src="assets/tutorial/coin.png"></img>`;
    var noAnswer = false;

    let subtrial = {
      type: "html-keyboard-response",
      stimulus: function() {

        let subtrialKeys = jsPsych.data.getLastTimelineData().select('key_press').values;
        let lastKey = jsPsych.data.getLastTrialData().select('key_press').values[0];
        let lastKey_i = keys.indexOf(lastKey);
        console.log(tutorialLetters[lastKey_i]);
        let lastStim = `<img class='tutorialKeys' src="assets/tutorial/${tutorialLetters[lastKey_i]}.png"></img>`;
        let prevTwoKeys = subtrialKeys.slice(n_subtrial-2,n_subtrial);

        switch(n_subtrial) {
          case 0:
            return goalStar;
          case 1:
            trialStims += "<div class='column'>"+lastStim+"</div>";
            break;
          case 2:
            trialStims += "<div class='column'>"+lastStim+"</div>";
            let firstItem = getKeyByValue(middleRules,prevTwoKeys);
            if (firstItem != null) trialMidItems += `<img src="assets/tutorial/item${firstItem}.png"></img>`;
            break;
          case 3:
            trialStims += "<div class='column'>"+lastStim+"</div>";
            break;
          case 4:
            trialStims += "<div class='column'>"+lastStim+"</div></div>";
            let secondItem = getKeyByValue(middleRules,prevTwoKeys);
            if (secondItem != null) trialMidItems += `<img src="assets/tutorial/item${secondItem}.png"></img>`;
            let firstTwoKeys = subtrialKeys.slice(0, 2);
            let lastTwoKeys = subtrialKeys.slice(2, 4);
            let trialItems = [Number(getKeyByValue(middleRules,firstTwoKeys)),Number(getKeyByValue(middleRules,lastTwoKeys))];
            let finalItem = getKeyByValue(highRules,trialItems);
            if (finalItem == null) trialFinalItem += `<img src="assets/goal-1.png"></img>`;
            else {
              trialFinalItem += `<img src="assets/tutorial/goal${finalItem}.png"></img>`;
              if (finalItem == blockGoal) blockPoints_c += 1;
            }
            break;
        }
        var blockPoints = `current block points: ${blockPoints_c}`;
        return goalStar + trialMidItems + trialFinalItem +
                blockPoints + "<br><br>" + trialStims + displayDebugInfo("tutorial",block,trial,"");
      },
      choices: function() {
        if (noAnswer) return jsPsych.ALL_KEYS;
        if (n_subtrial == 4) return jsPsych.NO_KEYS;
        else return keys;
      },
      trial_duration: function() {
        if (noAnswer) return null;
        if (n_subtrial==4) return TRIAL_END_DURATION
        return TRIAL_RESPONSE_DURATION;
      },
      data: {
        phase: subphase,
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
