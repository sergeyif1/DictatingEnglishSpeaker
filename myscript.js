import "regenerator-runtime/runtime";
import axios from "axios";
import _get from "lodash.get";

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
}

async function fetchData() {
  try {
    const res = await axios.get("http://localhost:1234//mybase.json");
    const data = _get(res, "data.index", []);
    await processLines(data, 0, logToConsole);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();

//-------------------------------------------------------------------------------------
let voiceList = document.querySelector("#voiceSelect");

let synth = speechSynthesis;

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

// Вызываем функцию voices() сразу после подключения скрипта, чтобы заполнить список голосов при загрузке страницы
voices();
