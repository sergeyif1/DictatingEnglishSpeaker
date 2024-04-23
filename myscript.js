const baseUrl = "http://dictatingenglishspeaker/";
const pathToFile = "/mybase.json";

//----------------------------------------------------------------------------------------

let but1 = document.querySelector("#but1");
let but2 = document.querySelector("#but2");

let currentButton = null;
but1.addEventListener("click", () => {
  currentButton = "but1";
  handleClick({ target: but1 });
});
but2.addEventListener("click", () => {
  currentButton = "but2";
  handleClick({ target: but2, currentButton });
});

//-------------------------------------------------------------------------------------
const PLAY = "play";
const PAUSE = "pause";
const RESUME = "resume";

async function handleClick({ target }) {
  if (target.classList.contains(PLAY)) {
    switch (target.className) {
      case PLAY:
        speechSynthesis.cancel();
        existingUseID(target);
        break;
      case PAUSE:
        target.className = RESUME;
        speechSynthesis.pause();
        existingUseID(target);
        break;
      case RESUME:
        target.className = PLAY;
        speechSynthesis.resume();
        break;
    }
  }
}

//--------------------------------------------------------------------------------------

function existingUseID(target) {
  const inputElement = document.querySelector(".form-point");
  const pintSec = document.querySelector("#paus");
  Event.priventDefault;
  console.log(pintSec.value);
  const useID = inputElement.value;
  const sec = Number(pintSec.value) * 1000;
  fetchData(useID, target, currentButton, sec);
}

async function fetchData(ID, target, currentButton, sec) {
  try {
    const response = await axios.get(baseUrl + pathToFile);
    const data = response.data.index;
    const foundObjects = data.filter((obj) => obj.id >= ID);

    if (foundObjects.length > 0) {
      await processLines(foundObjects, target, currentButton, sec);
      return;
    } else {
      console.log("Objects with ID greater than or equal to", ID, "not found.");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

//4----------------------------------------------------------------------------------------

async function processLines(data, target, currentButton, sec) {
  for (const item of data) {
    const { id, name, title } = item;
    let text;
    // console.log(text);
    if (currentButton === "but1") {
      text = `${name}`;
      console.log(text);
    } else if (currentButton === "but2") {
      text = `${title}`;
      console.log(text);
    }
    const trimmed = text.trim();

    if (trimmed) {
      const U = getUtterance(target, text);
      speechSynthesis.speak(U);
      processLine(text);
    }
    await new Promise((resolve) => setTimeout(resolve, sec));
  }
}

function processLine(text) {
  console.log(text);
}

//   1. Получение списка голососов-------------------------------------------------------------------------------------

let voiceList = document.querySelector("#voiceSelect");
let synth = speechSynthesis;

voices();

function voices() {
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

//----------------------------------------------------------------------------------------
function getUtterance(target, text) {
  const selectedVoiceName = voiceList.value;
  const availableVoices = synth.getVoices();
  const selectedVoice = availableVoices.find(
    (voice) => voice.name === selectedVoiceName
  );

  const U = new SpeechSynthesisUtterance(text);
  U.voice = selectedVoice;
  U.lang = selectedVoice.lang;
  U.volume = 1;
  U.rate = 1;
  U.pitch = 1;

  // Обработчики событий
  U.onstart = () => {
    console.log("Started");
    target.className = PAUSE;
  };
  U.onend = () => {
    console.log("Finished");
    target.className = PLAY;
  };

  return U;
}
