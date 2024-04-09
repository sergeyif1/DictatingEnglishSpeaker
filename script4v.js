import axios from "axios";
import _get from "lodash.get";

let but1 = document.querySelector("#but1");
let but2 = document.querySelector("#but2");
let but3 = document.querySelector("#but3");
let but4 = document.querySelector("#but4");
let but5 = document.querySelector("#but5");
let voiceList = document.querySelector("#select1");
let velueSelect = document.querySelector("#select2");
let textarea1 = document.querySelector("#text1");
let textarea2 = document.querySelector("#text2");

let synth = speechSynthesis,
  isSpeaking = true;

function voices() {
  for (let voice of synth.getVoices()) {
    let selected;

    // selected = voice.name === "Google UK English Male" ? "selected" : " ";
    // selected = voice.name === "Microsoft Thomas Online (Natural) - English (United Kindom)  (en-GB)" ? "selected" : " ";

    if (voice.name === "Google US English") {
      selected = voice.name === "Google US English" ? "selected" : "";
    }
    if (
      voice.name ===
      "Microsoft Roger Online (Natural) - English (United States) (en-US)"
    ) {
      selected =
        voice.name ===
        "Microsoft Roger Online (Natural) - English (United States) (en-US)"
          ? "selected"
          : "";
    }

    // let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);
// console.log(voiceList)

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
    const res = await axios.get("http://dictantspiker.local/file.json");
    const data = _get(res, "data.index", []);
    await processLines(data, 0, logToConsole);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();

//-------------------------------------------------------------------------
// // axios
// //   .get("http://dictantspiker.local/file.json")
// //   .then((response) => {
// //     // Распарсиваем ответ и переводим его в обычный JavaScript формат
// //     const data = _get(response, "data.index", []); // Получаем массив данных
// //     processLines(data, 0, logToConsole);
// //   })
// //   .catch((error) => {
// //     console.error("Ошибка при получении данных:", error);
// //   });

// // function processLines(data, index = 0, callback) {
// //   const currentItem = data.find((item) => item.id === index + 1); // Находим элемент по индексу
// //   if (!currentItem) return; // Если элемент не найден, выходим из рекурсии
// //   const { id, name, title } = currentItem; // Деструктурируем объект
// //   // Вызываем переданную функцию обратного вызова, передавая ей данные для вывода в консоль
// //   callback(id, name, title);
// //   // Рекурсивно вызываем функцию processLines с инкрементированным индексом и переданной функцией обратного вызова
// //   processLines(data, index + 1, callback);
// // }

// // // Функция, которая выводит данные в консоль с задержкой в 1 секунду
// // function logToConsole(id, name, title) {
// //   setTimeout(() => {
// //     console.log(`ID: ${id}, Name: ${name}, Title: ${title}`);
// //   }, 1000);
// // }
