import processLines from "./processLines";

const myModule = {
  words: async function (useID, sec) {
    const filePath = "../db.json";

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }
      const data = await response.json();

      // Ищем объект в массиве "dictionary" по значению "id"
      const foundIndex = data.dictionary.findIndex(
        (dataWord) => dataWord.id === useID
      );

      if (foundIndex !== -1) {
        // Создаем поток для оставшейся части массива "dictionary" от найденного индекса
        const remainingData = data.dictionary.slice(foundIndex);

        // Очищаем предыдущий объект
        let previousObject = null;

        // Читаем объекты из потока и выводим их в консоль с задержкой
        for (const dataWord of remainingData) {
          // Очищаем предыдущий объект
          if (previousObject !== null) {
            console.clear();
          }
          // Выводим текущий объект в консоль  и запускаем и запускаем processLines()
          processLines(dataWord);
          console.log(dataWord);

          // Задержка в 2 секунды
          await new Promise((resolve) => setTimeout(resolve, sec));
          previousObject = dataWord;
        }
      } else {
        console.log("Объект с указанным id не найден");
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default myModule;
