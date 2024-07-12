document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

let selectedVoiceName;
const synth = window.speechSynthesis;

const voiceList = document.getElementById("voiceSelect");

export function voices() {
  voiceList.innerHTML = ""; // Очищаем текущие элементы в списке

  let availableVoices = synth.getVoices();

  availableVoices.forEach((voice) => {
    let selected = voice === availableVoices ? "selected" : "";
    let option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    option.selected = selected;
    voiceList.appendChild(option);
  });

  selectedVoiceName = voiceList.value;
}

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
