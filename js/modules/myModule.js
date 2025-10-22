// myModule.js
import processLines from "./processLines.js";
import countdown from "./countdownTimer.js";
import { getRequestAdd } from "./seleDictionary.js";

import { from, lastValueFrom } from "rxjs";
import { groupBy, mergeMap, toArray } from "rxjs/operators";

let isPaused = false;
let isRunning = false; // флаг, что words() сейчас выполняется
let currentID = null;
let count_n_Word = null;

const myModule = {
  useCountNWord: function (n_Word) {
    count_n_Word = n_Word;
    console.log("Count N Word set to:", count_n_Word);
  },

  setID: function (newID) {
    currentID = newID;
    console.log("Current ID set to:", currentID);
  },

  // Основная функция обработки
  words: async function () {
    if (typeof window === "undefined") return;
    if (isRunning) {
      console.warn("⚠️ Процесс уже запущен. Дублировать запуск нельзя.");
      return;
    }

    isRunning = true;
    console.log("🌐 Запуск обработки (words) в браузере...");

    try {
      const requestAdd = getRequestAdd();
      console.log("📥 Результат getRequestAdd():", requestAdd);

      const filePaths = Array.isArray(requestAdd) ? requestAdd : [requestAdd];
      console.log("📂 Итоговый список файлов:", filePaths);

      const sec = Number(document.querySelector("#gap").value) * 1000;
      const foundObjects = [];

      // Загружаем и фильтруем файлы
      for (const filePath of filePaths) {
        if (!filePath) continue;
        console.log(`📄 Обработка файла: ${filePath}`);

        const response = await fetch(filePath);
        if (!response.ok) {
          console.warn(`⚠️ Не удалось загрузить файл: ${filePath}`);
          continue;
        }

        const text = await response.text();
        const jsonData = JSON.parse(text);

        let dataArray = [];
        if (Array.isArray(jsonData)) dataArray = jsonData;
        else if (Array.isArray(jsonData.dictionary))
          dataArray = jsonData.dictionary;
        else {
          console.warn("⚠️ Неизвестный формат JSON:", jsonData);
          continue;
        }

        const filtered = currentID
          ? dataArray.filter((item) => {
              const idNum = Number(item.id);
              return (
                idNum >= Number(currentID) &&
                idNum <= Number(currentID) + Number(count_n_Word) - 1
              );
            })
          : dataArray.slice(0, count_n_Word);

        console.log(`🔍 Найдено ${filtered.length} записей в ${filePath}`);
        foundObjects.push(...filtered);
      }

      if (foundObjects.length === 0) {
        console.log("❌ Нет данных для обработки.");
        return;
      }

      // Группируем по id (как раньше)
      const groupedById = await lastValueFrom(
        from(foundObjects).pipe(
          groupBy((item) => item.id),
          mergeMap((group) => group.pipe(toArray())),
          toArray()
        )
      );

      console.log("✅ Группированные данные по ID:");
      console.log(groupedById);
      console.log(
        "✅ Начинаем поочерёдную обработку сгруппированных записей..."
      );

      const startId = Number(currentID);
      const endId = startId + Number(count_n_Word) - 1;

      // Проходим по группам последовательно — и внутри группы по записям
      for (const group of groupedById) {
        const groupId = Number(group[0]?.id);

        // Если вышли за диапазон — прекращаем
        if (groupId > endId) {
          console.log(
            `⏹ Достигнут конец диапазона ID (${groupId} > ${endId}). Останавливаем обработку.`
          );
          break;
        }

        for (const entry of group) {
          // Если поставили на паузу — ждем, пока isPaused не станет false
          while (isPaused) {
            // не блокируем поток, аккуратно ждём
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // Обратный отсчёт
          const initialSeconds = sec / 1000;
          countdown(initialSeconds, initialSeconds);

          // Передача записи в обработчик
          console.log(`▶️ Обработка ID=${entry.id} (${entry.name})`);
          await processLines(JSON.stringify(entry));

          // Ждём между записями
          await new Promise((resolve) => setTimeout(resolve, sec));
        }
      }

      console.log("✅ Все записи из выбранного диапазона обработаны.");
    } catch (error) {
      console.error("❌ Ошибка при обработке:", error);
    } finally {
      isRunning = false;
      console.log("🏁 words() завершил выполнение.");
    }
  },

  // pause/resume — ТОЛЬКО флаги (не дергаем speechSynthesis здесь)
  pause: function () {
    if (!isPaused) {
      isPaused = true;
      console.log(
        "⏸️ myModule: флаг isPaused = true (обработка поставлена на паузу)."
      );
    } else {
      console.log("⚠️ myModule: уже на паузе.");
    }
  },

  resume: function () {
    if (isPaused) {
      isPaused = false;
      console.log(
        "▶️ myModule: флаг isPaused = false (обработка возобновляется)."
      );
      // Никаких дополнительных вызовов не требуется — цикл внутри words() продолжит работу.
    } else {
      console.log("⚠️ myModule: процесс не был на паузе.");
    }
  },

  // (опционально) геттеры состояния для внешних модулей/UI
  isPaused: function () {
    return !!isPaused;
  },

  isRunning: function () {
    return !!isRunning;
  },
};

export default myModule;

// import processLines from "./processLines.js";
// import countdown from "./countdownTimer.js";
// import { getRequestAdd } from "./seleDictionary.js";

// import { from, lastValueFrom } from "rxjs";
// import { groupBy, mergeMap, toArray } from "rxjs/operators";

// let isPaused = false;
// let isRunning = false; // флаг, что words() сейчас выполняется
// let currentID = null;
// let count_n_Word = null;

// const myModule = {
//   useCountNWord: function (n_Word) {
//     count_n_Word = n_Word;
//     console.log("Count N Word set to:", count_n_Word);
//   },

//   setID: function (newID) {
//     currentID = newID;
//     console.log("Current ID set to:", currentID);
//   },

//   words: async function () {
//     if (typeof window === "undefined") return;
//     console.log("Running in browser environment");

//     const requestAdd = getRequestAdd();
//     console.log("📥 Результат getRequestAdd():", requestAdd);

//     // //--------------------------------------------------------------------------------
//     //1. тут надо из этого массива foundObjects начать, читать по одной записи передавать в processLines по одной
//     // 2. передача записи в processLines делается через -----------------while (isPaused) {
//     //               await new Promise((resolve) => setTimeout(resolve, 100));
//     //             }
//     //             const initialSeconds = sec / 1000;
//     //             countdown(initialSeconds, initialSeconds);

//     //             window.speechSynthesis.cancel();
//     //             processLines(...........);-------------------
//     // //3. после окончания чтения одной записи, читать следующую запись из foundObjects и передавать в processLines повторяя процесс
//     // //4. и так пока не кончатся записи в foundObjects
//     // //5. когда кончатся записи в foundObjects, тогда ничего не делать, просто выйти из функции
//     // //--------------------------------------------------------------------------------

//     const filePaths = Array.isArray(requestAdd) ? requestAdd : [requestAdd];
//     console.log("📂 Итоговый список файлов:", filePaths);

//     const sec = Number(document.querySelector("#gap").value) * 1000;
//     const foundObjects = [];

//     try {
//       // 1. поочередный вызов каждого файла из filePaths
//       // 2. вызвав файл , читаем его построчно и отбираем нужные id
//       // 3. добавляем все найденные id в foundObject
//       // 4. проверяем, если есть тогда запрашиваем следующий файл и повторяем 2-4
//       // 5. снова проверяем, если есть тогда запрашиваем следующий файл и повторяем 2-4
//       // 6. если файлов больше нет, прекращаем работу и выводим сообщение в консоль
//       // 7. после обработки всех файлов,  группируем foundObjects по id
//       // 8. выводим в консоль весь foundObjects в виде группированного массива

//       // 2. Поочередно обрабатываем каждый файл
//       for (const filePath of filePaths) {
//         if (!filePath) continue;
//         console.log(`📄 Обработка файла: ${filePath}`);

//         const response = await fetch(filePath);
//         if (!response.ok) {
//           console.warn(`⚠️ Не удалось загрузить файл: ${filePath}`);
//           continue;
//         }

//         const text = await response.text();
//         const jsonData = JSON.parse(text);

//         let dataArray = [];
//         if (Array.isArray(jsonData)) dataArray = jsonData;
//         else if (Array.isArray(jsonData.dictionary))
//           dataArray = jsonData.dictionary;
//         else {
//           console.warn("⚠️ Неизвестный формат JSON:", jsonData);
//           continue;
//         }

//         // 2. Отбираем нужные записи по ID
//         const filtered = currentID
//           ? dataArray.filter((item) => {
//               const idNum = Number(item.id);
//               return (
//                 idNum >= Number(currentID) &&
//                 idNum <= Number(currentID) + Number(count_n_Word) - 1
//               );
//             })
//           : dataArray.slice(0, count_n_Word);

//         console.log(`🔍 Найдено ${filtered.length} записей в ${filePath}`);

//         // 3. Добавляем найденные объекты
//         foundObjects.push(...filtered);
//       }

//       // 6. Если файлов больше нет — идем дальше
//       if (foundObjects.length === 0) {
//         console.log("❌ Нет данных для обработки.");
//         return;
//       }

//       // 7. Группируем по ID
//       const groupedById = await lastValueFrom(
//         from(foundObjects).pipe(
//           groupBy((item) => item.id),
//           mergeMap((group) => group.pipe(toArray())),
//           toArray() // ← вот это собирает все группы в массив
//         )
//       );

//       // 8. Выводим в консоль результат
//       console.log("✅ Группированные данные по ID:");
//       console.log(groupedById);

//       // 👇 Можно запускать обработку, если нужно
//       // groupedById.forEach((group) => {
//       //   group.forEach((entry) => processLines(JSON.stringify(entry)));
//       // });

//       console.log(
//         "✅ Начинаем поочерёдную обработку сгруппированных записей..."
//       );

//       for (const group of groupedById) {
//         // Проверяем ID первой записи в группе
//         const groupId = Number(group[0]?.id);
//         const startId = Number(currentID);
//         const endId = startId + Number(count_n_Word) - 1;

//         // Если ID группы выходит за выбранный диапазон — выходим из цикла
//         if (groupId > endId) {
//           console.log(
//             `⏹ Достигнут конец диапазона ID (${groupId} > ${endId}). Останавливаем обработку.`
//           );
//           break;
//         }

//         for (const entry of group) {
//           //--------------------------------------------------------------------------------
//           //1. тут надо из этого массива foundObjects начать, читать по одной записи передавать в processLines по одной
//           // 2. передача записи в processLines делается через -----------------while (isPaused) {
//           //   await new Promise((resolve) => setTimeout(resolve, 100));
//           // }
//           // const initialSeconds = sec / 1000;
//           // countdown(initialSeconds, initialSeconds);

//           // window.speechSynthesis.cancel();
//           // processLines(...........);-------------------
//           //3. после окончания чтения одной записи, читать следующую запись из foundObjects и передавать в processLines повторяя процесс
//           //4. и так пока не кончатся записи в foundObjects
//           //5. когда кончатся записи в foundObjects, тогда ничего не делать, просто выйти из функции
//           //--------------------------------------------------------------------------------

//           // Проверяем паузу
//           while (isPaused) {
//             await new Promise((resolve) => setTimeout(resolve, 100));
//           }

//           // Обратный отсчёт
//           const initialSeconds = sec / 1000;
//           countdown(initialSeconds, initialSeconds);

//           // Сброс синтеза речи
//           // window.speechSynthesis.cancel();

//           // Передача записи в обработчик
//           console.log(`▶️ Обработка ID=${entry.id} (${entry.name})`);
//           processLines(JSON.stringify(entry));

//           // Ожидание перед следующей записью
//           await new Promise((resolve) => setTimeout(resolve, sec));
//         }
//       }

//       console.log("✅ Все записи из выбранного диапазона обработаны.");

//       console.log("✅ Все записи из groupedById обработаны.");
//     } catch (error) {
//       console.error("❌ Ошибка при обработке:", error);
//     }
//   },

//   pause: function () {
//     isPaused = true;
//   },

//   resume: function () {
//     if (isPaused) {
//       isPaused = false;
//       myModule.readNextString?.(); // Optional chaining in case not defined yet
//     } else {
//       console.log("Speech synthesis is not paused. Cannot resume.");
//     }
//   },
// };

// export default myModule;
