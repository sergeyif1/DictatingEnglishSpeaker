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
    const res = await axios.get("http://dictatingenglishspeaker/mybase.json");
    const data = _get(res, "data.index", []);
    await processLines(data, 0, logToConsole);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();

//-------------------------------------------------------------------------------------
let voiceList = document.querySelector("#voiceSelect");

// Создаем массив с рандомными текстами
let randomTexts = [
  "Рандомный текст 1",
  "Рандомный текст 2",
  "Рандомный текст 3",
  // Добавьте здесь другие рандомные тексты по желанию
];

// Выбираем случайный индекс из массива randomTexts
let randomIndex = Math.floor(Math.random() * randomTexts.length);

// Создаем новый элемент <option> с рандомным текстом
let option = document.createElement("option");
option.text = randomTexts[randomIndex];

// Добавляем созданный элемент <option> в <select>
voiceList.appendChild(option);
