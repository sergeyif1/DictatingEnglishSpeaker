import controlCheckBox from "./modules/controlCheckBox.js";
import buttonsClickHandlerPlay from "./modules/buttonsClickHandlerPlay.js";
import buttonsClickHandlerPauseResume from "./modules/buttonsClickHandlerPauseResume.js";
// import { voices } from "./modules/getUtterance.js";

//запуск с обновлением списка доступных голосов
// speechSynthesis.onvoiceschanged = voices;

const voiceList = document.getElementById("voiceSelect");
console.log("Проверка voiceList", voiceList);

function addVoiceOption(name, value) {
  const option = document.createElement("option");
  option.text = name;
  option.value = value;
  voiceList.add(option);
}

function populateVoices() {
  const voices = [
    { name: "Voice 1", value: "voice1" },
    { name: "Voice 2", value: "voice2" },
    { name: "1111111111S", value: "1111111111S" },
  ];

  voices.forEach((voice) => {
    addVoiceOption(voice.name, voice.value);
  });
}

populateVoices();

// function populateVoices() {
//   addVoiceOption("1111111111S", "123132132132");
// }

// populateVoices();

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
