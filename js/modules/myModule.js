import processLines from "./processLines";
import countdown from "./countdownTimer";

let isPaused = false;

const myModule = {
  words: async function (startID, sec, currentButton) {
    let currentID = startID;

    const filePath = "../db.json";
    const foundObjects = [];

    try {
      const response = await fetch(filePath);
      console.log("Файл загружен");

      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      const stream = response.body;
      console.log("Поток данных получен", stream);

      const reader = stream.getReader();
      console.log("Читатель потока создан", reader);

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

      async function readNextString() {
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

            await new Promise((resolve) => setTimeout(resolve, sec));

            while (isPaused) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            const initialSeconds = sec / 1000;
            countdown(initialSeconds, initialSeconds);
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
    isPaused = false;
  },
};

export default myModule;

//---------------------------------------------------

//  import processLines from "./processLines";
// import countdown from "./countdownTimer";

// const myModule = {
//   words: async function (startID, sec) {
//     let currentID = startID; // Инициализируем текущий ID

//     // 1. Указываем путь к файлу
//     const filePath = "../db.json";
//     const foundObjects = []; // Массив для хранения найденных объектов

//     try {
//       // 2. Запрос данных через fetch API
//       const response = await fetch(filePath);
//       console.log("Файл загружен");

//       // 3. Обрабатываем ошибку соединения
//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке файла");
//       }

//       // 4. Получаем поток данных из тела ответа
//       const stream = response.body;
//       console.log("Поток данных получен", stream);

//       // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
//       const reader = stream.getReader();
//       console.log("Читатель потока создан", reader);

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

//       // Функция для чтения следующей строки с задержкой
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

//             // Увеличиваем текущий ID на 1
//             currentID++;

//             // Добавляем задержку в секундах перед выполнением следующего задания
//             await new Promise((resolve) => setTimeout(resolve, sec));

//             // Читаем следующую строку после задержки
//             // console.log(
//             //   "Следующая прочитанная строка после задержки:",
//             //   dataChunk
//             // );

//             const initialSeconds = sec / 1000;
//             countdown(initialSeconds, initialSeconds);
//             processLines(dataChunk);

//             // Рекурсивный вызов функции для чтения следующей строки
//             await readNextString();
//           } else {
//             console.log("Начало или конец строки не найдены.");
//           }
//         } else {
//           console.log(`ID "${currentID}" Працесс закончен.Спасибо!`);
//         }
//       }

//       // Вызываем функцию чтения строки
//       await readNextString();
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   },
// };

// export default myModule;

//---------------------------------------------------
// import processLines from "./processLines";

// const myModule = {
//   words: async function (useID, sec) {
//     const filePath = "../db.json";

//     try {
//       const response = await fetch(filePath);
//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке файла");
//       }

//       const data = await response.json();
//       //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//       // Ищем объект в массиве "dictionary" по значению "id"
//       const foundIndex = data.dictionary.findIndex(
//         (dataWord) => dataWord.id === useID
//       );

//       if (foundIndex !== -1) {
//         // Создаем поток для оставшейся части массива "dictionary" от найденного индекса
//         const remainingData = data.dictionary.slice(foundIndex);

//         // Очищаем предыдущий объект
//         let previousObject = null;

//         // Читаем объекты из потока и выводим их в консоль с задержкой
//         for (const dataWord of remainingData) {
//           // Очищаем предыдущий объект
//           if (previousObject !== null) {
//             console.clear();
//           }
//           // Выводим текущий объект в консоль  и запускаем и запускаем processLines()
//           processLines(dataWord);
//           console.log(dataWord);

//           // Задержка в 2 секунды
//           await new Promise((resolve) => setTimeout(resolve, sec));
//           previousObject = dataWord;
//         }
//       } else {
//         console.log("Объект с указанным id не найден");
//       }
//       //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };

// export default myModule;
