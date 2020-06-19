# CHaRLy-JS
JS version of CHaRLy. Uses jspsych.

## Code structure
### initVariables.js:
This is where experimenter parameters are set, e.g. stimuli duration, goal sequences, rules, etc. Temporarily all helper functions live here. They probably shouldn't in the future. Currently randomization sort of happens here, but probably shouldn't in the future, since they should be in their respective level (phase, block, etc)?

### createPhase.js, createBlock.js, createTrial.js:
There are 2 phases. Within each phase is a learning phase, which features all stars (out of 4) each 3 times across 12 blocks, and a testing phase with ??? blocks featuring only changed stars as goals. All blocks have 25 trials each. (Needs more implementation)

Each trial is broken up into 5 subtrials where participants can press a key to advance. The stimuli of each subtrial is updated with the key pressed from the previous trial, as well as any changes to points, middle items, etc. The final subtrial shows whether a star was won, and whether points were gained.

5 trials (in the jsPsych sense) of subtrials comprise the timeline of an actual trial. 25 actual trials comprise the timeline of a block. 12 (or however many blocks) comprise the timeline of a phase. 2 phases make up the timeline of the whole experiment used to initialize jsPsych.init(). thus the overall timeline is nested

### css files:
Making things pretty. <custom.css> is where the bulk of the css is going to be, e.g. nicely formatting trial-specific stimuli so they are in the right places.

### final output file:
The task saves a CSV every (trial/block/phase) ??
For each subtrial (1/4 keypresses in a trial) we obtain the following data:
* phase: A, B, or tutorial
* subphase: learning or transfer
* block: block number
* trial: trial number
* RT: reaction time
* key_press: what key was pressed
Additionally, on the last subtrial:
* final: what item the subject got (dust, the correct/incorrect star)
* correct: whether the final item matches the block goal

## to do (as of 6/12):
fix:
- ~~createTrial.js bugs: fix timeout message bug~~
- ~~trial-initial “undefined” bug, should be goal star~~
- ~~missing stimulus value in 2nd phase~~

implement randomization
- ~~set up randomizer for number/key pairs —> middle item rules~~
- ~~set up randomizer for keyboard —> 0,1,2,3 rules~~
- ~~parameterize hand/lowhigh transfer for phases, and set up randomization by mod 4~~
- ~~create transfer subphase~~
- ~~differentiate learning/transfer subphases~~
- ~~set up goal star block sequence (pure randomization of 4 stars * 3 reps each)~~
- double check randomization works

## to do (as of 6/18):
jspsych:
* ~~make slides for text-only/no interaction instruction pages~~
* ~~finish the intro trials where all combos of keys lead to dust~~
* ~~make the tutorial trials where instructions appear with walk through key presses — these could potentially be regular instruction pages~~
* ~~make the practice trials with tutorial machine/keys/goals~~
* ~~make slides for new goal star~~
* ~~make slides for introducing task ver A and B (different machine and keys)~~
* ~~end page (?)~~
* ~~point counter is messed up~~
* ~~save a CSV~~ needs testing on server
* ~~saving correct and final item~~


css/graphics:
* ~~css: make goal star grid (1x1) and img.goal class~~
* ~~css: make keys grid (1x4 with quarter column lines invisible) and img.keys class~~
* ~~css: make middle items and secure their placement against the star machine~~
* ~~css: make final star/dust position relative to bottom right of star machine~~
* ~~jspsych: make function that creates trial stimuli (goal star box, points, middle item, machine, star/dust, key grid)~~
* ~~css: side instructions during tutorial trials~~
* ~~doublecheck new graphic helper function on other trial types~~
* ~~fix weird Points text overlap~~
* adjust real machine sizes
* ~~real trials: adjust middle item placement~~
* ~~real trials: star placement~~
