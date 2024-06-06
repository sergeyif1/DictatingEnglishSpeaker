const voiceList = document.querySelector("#voiceSelect");
const synth = speechSynthesis;

export function voices() {
  voiceList.innerHTML = "";
  let availableVoices = synth.getVoices();
  let defaultVoice = getDefaultVoice(availableVoices);

  availableVoices.forEach((voice) => {
    let selected = voice === defaultVoice ? "selected" : "";

    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

    voiceList.insertAdjacentHTML("beforeend", option);
  });
}

synth.onvoiceschanged = voices;

function getDefaultVoice(voices) {
  return voices.find(
    (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
  );
}

const voicePlay = {
  getUtterance: function (text) {
    const rate = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    const availableVoices = speechSynthesis.getVoices();
    const selectedVoiceName = voiceList.value;

    // console.log("Selected voice name:", selectedVoiceName);
    // console.log("Rate:", rate, "Pitch:", pitch);

    if (availableVoices.length > 0) {
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === selectedVoiceName
      );
      // console.log("Selected voice:", selectedVoice);

      const U = new SpeechSynthesisUtterance(text);
      U.voice = selectedVoice;
      U.lang = selectedVoice.lang;
      U.volume = 1;
      U.rate = rate;
      U.pitch = pitch;

      // console.log("Utterance details:", U);
      return U;
    } else {
      // console.error("No available voices found.");
      return null;
    }
  },
};

export default voicePlay;
