const baseUrl = "http://dictatingenglishspeaker/";
const pathToFile = "/mybase.json";

//----------------------------------------------------------------------------------------
const PLAY = "play";
const PAUSE = "pause";
const RESUME = "resume";

let but1 = document.querySelector("#but1");
but1.addEventListener("click", handleClick);

async function handleClick({ target }) {
  if (target.classList.contains(PLAY)) {
    switch (target.className) {
      case PLAY:
        speechSynthesis.cancel(); //Очищаем предыдущие
        exisingUseID(target);
        // processLines(data, processLine, target);
        break;
      case PAUSE:
        target.className = RESUME;
        speechSynthesis.pause();
        break;
      case RESUME:
        target.className = PLAY;
        speechSynthesis.resume();
        break;
    }
  }
}

//--------------------------------------------------------------------------------------
function exisingUseID(target) {
  const inputElement = document.querySelector(".form-point");
  const useID = inputElement.value;
  fetchData(useID, target);
}

async function fetchData(ID, target) {
  try {
    const response = await axios.get(baseUrl + pathToFile);
    const data = response.data.index;
    const foundObjects = data.filter((obj) => obj.id >= ID);

    if (foundObjects.length > 0) {
      await processLines(foundObjects, processLine, target); // Передаем функцию processLine как callback
      return;
    } else {
      console.log("Objects with ID greater than or equal to", ID, "not found.");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

//----------------------------------------------------------------------------------------
async function processLines(data, callback, target) {
  for (const item of data) {
    const { id, name, title } = item;
    callback({ id, name, title }); // Вызываем callback с объектом в качестве аргумента
    const text = `${name}, ${title}`;
    const trimmed = text.trim();

    if (trimmed) {
      const U = getUtterance(target, text); // Я не вижу определения функции getUtterance и target, предполагаю, что они где-то определены
      speechSynthesis.speak(U);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

function processLine(obj) {
  // Принимаем объект в качестве аргумента
  const { id, name, title } = obj; // Разделяем объект на свойства
  const text = `${id}, ${name}, ${title}`;
  console.log(text);
}

//----------------------------------------------------------------------------------------

//   1. Получение списка голососов-------------------------------------------------------------------------------------

let voiceList = document.querySelector("#voiceSelect");
let synth = speechSynthesis;

// Вызываем функцию voices() сразу после подключения скрипта, чтобы заполнить список голосов при загрузке страницы
voices();

function voices() {
  // Очищаем список голосов перед добавлением новых
  voiceList.innerHTML = "";

  // Получаем список доступных голосов
  let availableVoices = synth.getVoices();

  // Перебираем каждый доступный голос и добавляем его в список
  availableVoices.forEach((voice) => {
    let selected = "";

    if (
      voice.name === "Google UK English Male" ||
      voice.name ===
        "Microsoft Thomas Online (Natural) - English (United Kindom)  (en-GB)"
    ) {
      selected = "selected";
    } else if (
      voice.name === "Google US English" ||
      voice.name ===
        "Microsoft Roger Online (Natural) - English (United States) (en-US)"
    ) {
      selected = "selected";
    }

    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

    // Добавляем созданный элемент <option> в <select>
    voiceList.insertAdjacentHTML("beforeend", option);
  });
}

// Добавляем обработчик события, который будет вызывать функцию voices() при загрузке голосов
synth.onvoiceschanged = voices;

// //----------------------------------------------------------------------------------------

// //----------------------------------------------------------------------------------------
function getUtterance(target, text) {
  const selectedVoiceName = voiceList.value;
  const availableVoices = synth.getVoices();

  // Находим выбранный голос в списке доступных голосов
  const selectedVoice = availableVoices.find(
    (voice) => voice.name === selectedVoiceName
  );

  const U = new SpeechSynthesisUtterance(text);
  U.voice = selectedVoice; // Устанавливаем выбранный голос
  U.lang = selectedVoice.lang; // Устанавливаем язык выбранного голоса
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
