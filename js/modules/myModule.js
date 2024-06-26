import processLines from "./processLines.js";
import countdown from "./countdownTimer.js";

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
    const sec = Number(document.querySelector("#gap").value) * 1000;
    const filePath = "../db.json";
    const foundObjects = [];

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      const stream = response.body;
      const reader = stream.getReader();
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

            speechSynthesis.cancel();
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

// import processLines from "./processLines.js";
// import countdown from "./countdownTimer.js";

// let isPaused = false;
// let currentID = null;
// let count_n_Word = null;

// const myModule = {
//   useCountNWord: function (n_Word) {
//     // console.log(
//     //   `Проверка чекбоксов кол-ва слов: "Чек-бокс отмечен", кол. слов - ${n_Word}`
//     // );
//     count_n_Word = n_Word;
//   },

//   setID: function (newID) {
//     currentID = newID;
//   },

//   words: async function () {
//     const sec = Number(document.querySelector("#gap").value) * 1000;
//     // console.log(`sec: ${sec}`);
//     // 1. Указываем путь к файлу
//     const filePath = "../db.json";
//     const foundObjects = [];

//     try {
//       // 2. Запрос данных через fetch API
//       const response = await fetch(filePath);

//       // 3. Обрабатываем ошибку соединени
//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке файла");
//       }

//       // 4. Получаем поток данных из тела ответа
//       const stream = response.body;

//       // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
//       const reader = stream.getReader();

//       // 6. Распарсиваем поток
//       const decoder = new TextDecoder();
//       let result = "";
//       let done = false;

//       while (!done) {
//         const { value, done: streamDone } = await reader.read();
//         if (value) {
//           result += decoder.decode(value, { stream: !streamDone });
//         }
//         done = streamDone;
//       }

//       const jsonData = JSON.parse(result);
//       console.log("Данные распарсены", jsonData);

//       // 7.Функция для чтения следующей строки с задержкой
//       async function readNextString() {
//         // Начинаем читать поток с указанного ID
//         const searchString = `"id": "${currentID}"`;
//         const startIndex = result.indexOf(searchString);

//         if (startIndex !== -1) {
//           const startBracketIndex = result.lastIndexOf("{", startIndex);
//           const endBracketIndex = result.indexOf("}", startIndex) + 1;
//           if (startBracketIndex !== -1 && endBracketIndex !== -1) {
//             const dataChunk = result.substring(
//               startBracketIndex,
//               endBracketIndex
//             );
//             // console.log("Прочитанная строка:", dataChunk);

//             // Добавляем объект в массив найденных объектов
//             const foundObject = JSON.parse(dataChunk);
//             foundObjects.push(foundObject);

//             currentID++;

//             await new Promise((resolve) => setTimeout(resolve, sec));

//             while (isPaused) {
//               await new Promise((resolve) => setTimeout(resolve, 100));
//             }

//             const initialSeconds = sec / 1000;
//             countdown(initialSeconds, initialSeconds);

//             // Вызов processLines с переданными данными
//             speechSynthesis.cancel();
//             processLines(dataChunk);

//             await readNextString();
//           } else {
//             console.log("Начало или конец строки не найдены.");
//           }
//         } else {
//           console.log(`ID "${currentID}" Працесс закончен.Спасибо!`);
//         }
//       }

//       await readNextString();
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   },
//   pause: function () {
//     isPaused = true;
//     // console.log(`Paused ${isPaused}`);
//   },
//   resume: function () {
//     // console.log(`Paused ${isPaused}`);
//     if (isPaused) {
//       isPaused = false;

//       myModule.readNextString();
//     } else {
//       console.log("Speech synthesis is not paused, cannot resume");
//     }
//   },
// };

// export default myModule;
