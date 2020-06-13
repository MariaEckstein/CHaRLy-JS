# CHaRLy-JS
JS version of CHaRLy. Uses jspsych.

## to do (as of 6/12):

fix:
- createTrial.js bugs: fix timeout message bug, fix trial-initial “undefined” bug;

implement randomization
- set up randomizer for number/key pairs —> middle item rules
- set up randomizer for keyboard —> 0,1,2,3 rules
- parameterize hand/lowhigh transfer for phases, and set up randomization by mod 4
- finish parameterizing other learning/transfer rules
- set up goal star block sequence (pure randomization of 4 stars * 3 reps each) - DONE

graphics:
- make the machine the background? - DONE
- make custom CSS for formatting trial stimuli
  - add goal star at top of screen of each trial - DONE
  - organize trialscreen s.t. keys appear at bottom of screen in grid
  - place middle items in center of screen where machine mouth is

tutorials:
- make instructions
- make trials
- implement tutorial mechanisms (different machine, different rules w. DFJK, etc)
