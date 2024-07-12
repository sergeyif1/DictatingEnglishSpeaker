import controlCheckBox from "./modules/controlCheckBox.js";
import buttonsClickHandlerPlay from "./modules/buttonsClickHandlerPlay.js";
import buttonsClickHandlerPauseResume from "./modules/buttonsClickHandlerPauseResume.js";
// import { voices } from "./modules/getUtterance.js";

//запуск с обновлением списка доступных голосов
// speechSynthesis.onvoiceschanged = voices;

const voiceList = document.getElementById("voiceSelect");
console.log("Проверка voiceList", voiceList);

function addVoiceOption(voiceName, voiceValue) {
  const option = document.createElement("option");
  option.text = voiceName;
  option.value = voiceValue;
  voiceList.add(option);
}

function populateVoices() {
  addVoiceOption("1111111111S", "1111111111S");
}

populateVoices();

const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");
const but5 = document.getElementById("but5");
const resumeButton = document.getElementById("resumeButton");

but1.addEventListener("click", (event) => {
  buttonsClickHandlerPlay.handleClick1(event);
});
but2.addEventListener("click", (event) => {
  buttonsClickHandlerPlay.handleClick1(event);
});
but5.addEventListener("click", (event) => {
  buttonsClickHandlerPauseResume.handleClick2(event);
});
resumeButton.addEventListener("click", (event) => {
  buttonsClickHandlerPauseResume.handleClick2(event);
});

controlCheckBox();
