document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

let selectedVoiceName;

const voiceList = document.querySelector("#voiceSelect");

const synth = speechSynthesis;

// export function voices() {
//   voiceList.innerHTML = "";
//   let availableVoices = synth.getVoices();
//   let defaultVoice = getDefaultVoice(availableVoices);

//   availableVoices.forEach((voice) => {
//     let selected = voice === defaultVoice ? "selected" : "";

//     let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

//     voiceList.insertAdjacentHTML("beforeend", option);

//     selectedVoiceName = voiceList.value;
//   });
// }

const voicePlay = {
  getUtterance: function (text) {
    const rate = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    const availableVoices = synth.getVoices();

    if (availableVoices.length > 0) {
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === selectedVoiceName
      );

      const U = new SpeechSynthesisUtterance(text);
      U.voice = selectedVoice;
      U.lang = selectedVoice.lang;
      U.volume = 1;
      U.rate = rate;
      U.pitch = pitch;

      return U;
    } else {
      return null;
    }
  },
};

// обработка событий выбора голоса
voiceList.addEventListener("change", function () {
  selectedVoiceName = voiceList.value;
});

export default voicePlay;
