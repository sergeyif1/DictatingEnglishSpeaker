import processLines from "./processLines.js";
import countdown from "./countdownTimer.js";
import { getRequestAdd } from "./seleDictionary.js";

let isPaused = false;
let currentID = null;
let count_n_Word = null;

const myModule = {
  useCountNWord: function (n_Word) {
    count_n_Word = n_Word;
  },

  setID: function (newID) {
    currentID = newID;
  },

  words: async function () {

    const requestAdd = getRequestAdd();
    console.log("Проверяем содержимое пути", requestAdd);

    const sec = Number(document.querySelector("#gap").value) * 1000;
    // 1. Указываем путь к файлу
    const filePath = requestAdd;
    const foundObjects = [];

    try {
      // 2. Запрос данных через fetch API
      const response = await fetch(filePath);
      // 3. Обрабатываем ошибку соединени
      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
      const stream = response.body;
      const reader = stream.getReader();

      // 6. Распарсиваем поток
      const decoder = new TextDecoder();
      let result = "";
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) {
          result += decoder.decode(value, { stream: !streamDone });
        }
        done = streamDone;
      }

      const jsonData = JSON.parse(result);
      console.log("Данные распарсены", jsonData);

      let processedCount = 0;

      // 7.Функция для чтения следующей строки с задержкой
      async function readNextString() {
        if (count_n_Word !== null && processedCount >= count_n_Word) {
          console.log(`Обработано ${processedCount} строк. Завершение.`);
          return;
        }

        const searchString = `"id": "${currentID}"`;
        const startIndex = result.indexOf(searchString);

        if (startIndex !== -1) {
          const startBracketIndex = result.lastIndexOf("{", startIndex);
          const endBracketIndex = result.indexOf("}", startIndex) + 1;
          if (startBracketIndex !== -1 && endBracketIndex !== -1) {
            const dataChunk = result.substring(
              startBracketIndex,
              endBracketIndex
            );

            const foundObject = JSON.parse(dataChunk);
            foundObjects.push(foundObject);

            currentID++;
            processedCount++;

            await new Promise((resolve) => setTimeout(resolve, sec));

            while (isPaused) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            const initialSeconds = sec / 1000;
            countdown(initialSeconds, initialSeconds);

            window.speechSynthesis.cancel();
            processLines(dataChunk);

            await readNextString();
          } else {
            console.log("Начало или конец строки не найдены.");
          }
        } else {
          console.log(`ID "${currentID}" Працесс закончен.Спасибо!`);
        }
      }

      await readNextString();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },

  pause: function () {
    isPaused = true;
  },

  resume: function () {
    if (isPaused) {
      isPaused = false;
      myModule.readNextString();
    } else {
      console.log("Speech synthesis is not paused, cannot resume");
    }
  },
};

export default myModule;
