import controlCheckBox from "./modules/controlCheckBox.js";
import buttonsClickHandlerPlay from "./modules/buttonsClickHandlerPlay.js";
import buttonsClickHandlerPauseResume from "./modules/buttonsClickHandlerPauseResume.js";
// import { voices } from "./modules/getUtterance.js";

//запуск с обновлением списка доступных голосов
speechSynthesis.onvoiceschanged = voices;

// const voiceList = document.getElementById("voiceSelect");
// function addVoiceOption(name, value) {
//   const option = document.createElement("option");
//   option.text = name;
//   option.value = value;
//   voiceList.add(option);
// }

// function populateVoices() {
//   const voices = [
//     { name: "Voice 1", value: "voice1" },
//     { name: "Voice 2", value: "voice2" },
//     { name: "1111111111S", value: "1111111111S" },
//   ];

//   voices.forEach((voice) => {
//     addVoiceOption(voice.name, voice.value);
//   });
// }

// populateVoices();

//-----------------------------------------------------------------

const voiceList = document.getElementById("voiceSelect");

export function voices() {
  voiceList.innerHTML = ""; // Очищаем текущие опции в списке

  let availableVoices = speechSynthesis.getVoices();
  // let defaultVoice = getDefaultVoice(availableVoices);

  availableVoices.forEach((voice) => {
    let selected = voice === availableVoices ? "selected" : "";
    let option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    option.selected = selected;
    voiceList.appendChild(option);
  });

  // Устанавливаем выбранное значение (если нужно)
  // selectedVoiceName = voiceList.value;
}

//-----------------------------------------------------

console.log("Проверка voiceList", voiceList);

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
