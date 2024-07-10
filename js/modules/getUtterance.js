const synth = speechSynthesis;
const voiceList = document.querySelector("#voiceSelect");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

export function voices() {
  const selectedVoiceName = voiceList.value; // Сохраняем текущее выбранное значение

  voiceList.innerHTML = "<option value='default'>Select a voice</option>";
  let availableVoices = synth.getVoices();
  let defaultVoice = getDefaultVoice(availableVoices);

  availableVoices.forEach((voice) => {
    let selected = voice.name === selectedVoiceName ? "selected" : ""; // Проверяем, было ли голос выбран ранее

    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  });

  if (!availableVoices.some((voice) => voice.name === selectedVoiceName)) {
    // Если ранее выбранный голос недоступен, возвращаем к значению по умолчанию
    voiceList.value = "default";
  }
}

function updateVoices() {
  const voiceList = document.querySelector("#voiceSelect");
  voices(voiceList);
}

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = updateVoices;
} else {
  updateVoices(); // Обновляем голоса вручную, если событие onvoiceschanged не поддерживается
}

function getDefaultVoice(voices) {
  return voices.find(
    (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
  );
}

const voicePlay = {
  getUtterance: function (text) {
    const rate = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    const availableVoices = synth.getVoices();
    const selectedVoiceName = document.querySelector("#voiceSelect").value;

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

export default voicePlay;

// const synth = speechSynthesis;
// const voiceList = document.querySelector("#voiceSelect");

// export function voices() {
//   voiceList.innerHTML = "";
//   let availableVoices = synth.getVoices();
//   let defaultVoice = getDefaultVoice(availableVoices);

//   availableVoices.forEach((voice) => {
//     let selected = voice === defaultVoice ? "selected" : "";

//     let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

//     voiceList.insertAdjacentHTML("beforeend", option);
//   });
// }

// synth.onvoiceschanged = voices;

// function getDefaultVoice(voices) {
//   return voices.find(
//     (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
//   );
// }

// const voicePlay = {
//   getUtterance: function (text) {
//     const rate = document.getElementById("speed").value;
//     const pitch = document.getElementById("pitch").value;

//     const availableVoices = speechSynthesis.getVoices();
//     const selectedVoiceName = voiceList.value;

//     if (availableVoices.length > 0) {
//       const selectedVoice = availableVoices.find(
//         (voice) => voice.name === selectedVoiceName
//       );

//       const U = new SpeechSynthesisUtterance(text);
//       U.voice = selectedVoice;
//       U.lang = selectedVoice.lang;
//       U.volume = 1;
//       U.rate = rate;
//       U.pitch = pitch;

//       return U;
//     } else {
//       return null;
//     }
//   },
// };

// export default voicePlay;

// // document.addEventListener("keydown", function (event) {
// //   if (event.key === "Enter") {
// //     event.preventDefault();
// //   }
// // });
