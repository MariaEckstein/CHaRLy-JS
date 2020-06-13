# CHaRLy-JS
JS version of CHaRLy. Uses jspsych.

## Code structure
###initVariables.js:
This is where experimenter parameters are set, e.g. stimuli duration, goal sequences, rules, etc. Temporarily all helper functions live here. They probably shouldn't in the future. Currently randomization sort of happens here, but probably shouldn't in the future, since they should be in their respective level (phase, block, etc)?

###createPhase.js, createBlock.js, createTrial.js:
There are 2 phases. Within each phase is a learning phase, which features all stars (out of 4) each 3 times across 12 blocks, and a testing phase with ??? blocks featuring only changed stars as goals. All blocks have 25 trials each. (Needs more implementation)

Each trial is broken up into 5 subtrials where participants can press a key to advance. The stimuli of each subtrial is updated with the key pressed from the previous trial, as well as any changes to points, middle items, etc. The final subtrial shows whether a star was won, and whether points were gained.

###css files:
Making things pretty. <custom.css> is where the bulk of the css is going to be, e.g. nicely formatting trial-specific stimuli so they are in the right places.

## to do (as of 6/12):
fix:
- createTrial.js bugs: fix timeout message bug, fix trial-initial “undefined” bug;

implement randomization
- set up randomizer for number/key pairs —> middle item rules
- set up randomizer for keyboard —> 0,1,2,3 rules
- parameterize hand/lowhigh transfer for phases, and set up randomization by mod 4
- finish parameterizing other learning/transfer rules
- --set up goal star block sequence (pure randomization of 4 stars * 3 reps each)--

graphics:
- --make the machine the background?--
- make custom CSS for formatting trial stimuli
  - --add goal star at top of screen of each trial--
  - organize trialscreen s.t. keys appear at bottom of screen in grid
  - place middle items in center of screen where machine mouth is

tutorials:
- make instructions
- make trials
- implement tutorial mechanisms (different machine, different rules w. DFJK, etc)
