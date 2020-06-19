// create intro trials - no time out, no middle items or goals

function createTutorialTrial() {

  let thisTrial = [];
  let subphase = "tutorial";
  let keys = [68,70,74,75];
  let checkKeys = Array(4);
  for (let n_subtrial = 0; n_subtrial < 5; n_subtrial++) {

    // initialize vars for this trial
    let subtrial = {
      type: "html-keyboard-response",
      stimulus: function() {
        if (n_subtrial==0) return drawTrialBase("T", null, []);
        let lastKey = jsPsych.data.getLastTrialData().select('key_press').values[0];
        checkKeys[n_subtrial-1] = keys.indexOf(lastKey);
        if (n_subtrial==4) return drawTrialBase("T", null, checkKeys) + drawFinalItem(null,"T");
        return drawTrialBase("T", null, checkKeys);
      },
      choices: function() {
        if (n_subtrial == 4) return jsPsych.NO_KEYS;
        else return keys;
      },
      trial_duration: function() {
        if (n_subtrial==4) return TRIAL_END_DURATION;
      },
    }
    thisTrial.push(subtrial);
  }
  return thisTrial;
}
