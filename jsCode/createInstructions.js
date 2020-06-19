/*Great job!
We’ll now move to another machine.
You’ll use the keys U, I, O, and P of your right hand!i
This machine makes different stars, using different tools than before.
Otherwise, is it similar to the one before. Do your best!
Do you have any questions?
[Press space to start.]*/

function createInstructions() {

  let instructions = [];
  instructions.push({ // first slide
    type: "html-keyboard-response",
    stimulus: "<p><br>This machine can make coins.</p>"+
              "<div class='center'><img src='assets/machineT.png'></img></div>"+
              "<p>You can control the machine using the D, F, J, and K keys.</p>"+
              CONTINUE,
    choices: [32],
  });
  instructions.push({ // show coins
    type: "html-keyboard-response",
    stimulus: "<p><br>Your goal in this task is to collect coins.</p>"+
              "<div class='center'><img src='assets/goal0T.png'></img></div>" + CONTINUE,
    choices: [32],
  });
  instructions.push({timeline:createTutorialTrial()}); // demo
  instructions.push({ // talk about tools
    type: "html-keyboard-response",
    stimulus: "<p class='center'>Collecting coins can be hard! Luckily, the machine uses tools"+
              " when it makes coins. Seeing these tools can help you get on the right track.</p>"+
              CONTINUE,
    choices: [32],
  });
  instructions.push({ // demo trial with walkthrough and reward
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>Your goal is to make the coin in the \
            black box above the machine.</div>"+ drawTrialBase("T",0,[]) + CONTINUE;
    },
    choices: [32],
  });
  instructions.push({ // prompt to press F
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>To start, try pressing the F key.</div>"+
                drawTrialBase("T",0,[]);
    },
    choices: [70],
  });
  instructions.push({ // prompt to press J
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>Now try pressing J.</div>"+
                drawTrialBase("T",0,[1]);
    },
    choices: [74],
  });
  instructions.push({ // show first item and prompt to press D
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>A hammer started shaping a coin. It looks\
              like we're on the right track!<br>Now try pressing D.</div>"+
                drawTrialBase("T",0,[1,2]) + drawMidItems([0],"T");
    },
    choices: [68],
  });
  instructions.push({ // prompt to press K
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>Now try pressing K.</div>"+
                drawTrialBase("T",0,[1,2,0]) + drawMidItems([0],"T");
    },
    choices: [75],
  });
  instructions.push({ // show all items and goal
    type: "html-keyboard-response",
    stimulus: function() {
      return "<div class='tutorialInst'>A chisel started working after you \
      pressed D and K! Then a coin popped out of the machine. Congratulations!</div>"+
                drawTrialBase("T",0,[1,2,0,3]) +
                drawMidItems([0,1],"T") + drawFinalItem(0,"T") + CONTINUE;
    },
    choices: [32],
  });
  instructions.push({ // introduce practice trials
    type: "html-keyboard-response",
    stimulus: function() {
      return "<p class='center'>Now that we've shown you how the machine \
      works, you can try it out for yourself!</p>" + CONTINUE;
    },
    choices: [32],
  });
  for (i = 0; i < NUM_PRACTICE_TRIALS; i++) {
    instructions.push({
      timeline:createTrial("practice", 0, i, "T", tutorialKeys, tutorialMidRules,
                            tutorialHighRules, 0)});
  }
  instructions.push({ // introduce practice trials
    type: "html-keyboard-response",
    stimulus: function() {
      return "<p class='center'>Great job! Now let's move to a new machine, \
      which makes stars instead of coins. This new machine uses different tools, \
      but seeing them can still help you figure out how to make stars. Try your \
      best!</p>" + CONTINUE;
    },
    choices: [32],
  });
  return instructions;
}
