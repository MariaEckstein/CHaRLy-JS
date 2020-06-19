function drawTrialBase(taskVer, goal, keys) {

  if (goal==null) goal = "<p>Try out using the machine yourself!</p>";
  else goal = `<div class='goalBox'><img class="goal" src="assets/goal${goal}${taskVer}.png"></img></div>`;
  var machine = `<div class="machineBox"><img class="machine"src="assets/machine${taskVer}.png"></img></div>`;

  return `<div class='baseStim'>${goal}${machine}${drawKeys(keys,taskVer)}</div>`;
}

function drawKeys(keys,taskVer) {
  var keyGrid = "<table class='keys'>";
  if (taskVer != "T") taskVer = "";
  for (i = 0; i < 4; i++) {
    if (keys[i] != null) keyGrid += `<td><img class="key" src="assets/key${keys[i]}${taskVer}.png"></img></td>`;
    else keyGrid += "<td></td>";
  }
  return keyGrid + "</table>";
}

function drawMidItems(middle,taskVer) {
  let mid = "<div class='baseStim'>";
  let css = "";
  if (taskVer == "T") css = "T";
  middle.forEach((item, i) => {
    if (Number.isInteger(item)) mid += `<img class="mid${i}${css}" src=assets/item${item}${taskVer}.png></img>`;
  });
  return mid + "</div>";
}

function drawFinalItem(final, taskVer) {
  let css = "";
  if (taskVer == "T") css = "T";
  if (final==null) return `<div class="finalBox${css}"><img class="final" src="assets/goal-1.png"></img></div>`;
  else return `<div class="finalBox${css}"><img class="final" src="assets/goal${final}${taskVer}.png"></img></div>`;
}

// function displayDebugInfo(subphase,block,trial,taskVer) {
//   let transferVer = 'high';
//   if (taskVer == "B") transferVer = 'low';
//   return `<br>current block: ${block+1}<br>` +
//          `current trial: ${trial+1}<br>` +
//          `transfer: ${transferVer}<br>` +
//          `subphase: ${subphase}<br>`;
// }
