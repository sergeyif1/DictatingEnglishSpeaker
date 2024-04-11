import "regenerator-runtime/runtime";
import axios from "axios";
import _get from "lodash.get";

let data,
  currentIndex = 0; // Определяем переменную на уровне видимости скрипта
async function processLines(data, index = 0, callback) {
  const currentItem = data.find((item) => item.id === index + 1);
  if (!currentItem) return;
  const { id, name, title } = currentItem;

  await callback(id, name, title);
  await processLines(data, index + 1, callback);
}

async function logToConsole(id, name, title) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`ID: ${id}, Name: ${name}, Title: ${title}`);

  // Озвучивание данных с помощью функции textToSpeech
  textToSpeech(`${name}. ${title}`);
}

async function fetchData() {
  try {
    const res = await axios.get("http://localhost:1234//mybase.json");
    data = _get(res, "data.index", []); // Заполняем переменную data полученными данными
    await processLines(data, 0, logToConsole);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();

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

//-------------------------------------------------------------------------------------

function textToSpeech(name, title) {
  // Составляем текст для озвучивания, объединяя имя и заголовок
  let text = `${name}. ${title}`;

  // Создаем объект SpeechSynthesisUtterance с текстом для озвучивания
  let utterance = new SpeechSynthesisUtterance(text);

  // Перебираем доступные голоса и устанавливаем нужный голос, если он совпадает с выбранным в voiceList
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
      break; // Прерываем цикл после установки голоса
    }
  }

  // Запускаем озвучивание
  synth.speak(utterance);
}

//   Добавляем обработчик клика на кнопку----------------------------------------------------------------------------------------

let but1 = document.querySelector("#but1");
but1.addEventListener("click", () => {
  // Получаем индекс текущего выбранного элемента данных
  const index = currentIndex + 1;
  // Получаем текущий выбранный элемент данных
  const currentItem = data.find((item) => item.id === index);
  if (currentItem) {
    const { name, title } = currentItem;
    textToSpeech(name, title);
  }
});
//----------------------------------------------------------------------------------------
