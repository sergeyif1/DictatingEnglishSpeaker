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
    // Ensure code runs only in browser
    if (typeof window === "undefined") {
      return;
    }

    const requestAdd = getRequestAdd();

    const sec = Number(document.querySelector("#gap").value) * 1000;
    const filePath = requestAdd;
    const foundObjects = [];

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error("Failed to load the file.");
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

      let processedCount = 0;

      async function readNextString() {
        if (count_n_Word !== null && processedCount >= count_n_Word) {
          console.log(`Processed ${processedCount} entries. Done.`);
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
            console.log("Start or end of entry not found.");
          }
        } else {
          console.log(`ID "${currentID}" — End of process. Thank you!`);
        }
      }

      await readNextString();
    } catch (error) {
      console.error("Error:", error);
    }
  },

  pause: function () {
    isPaused = true;
  },

  resume: function () {
    if (isPaused) {
      isPaused = false;
      myModule.readNextString?.(); // Optional chaining in case not defined yet
    } else {
      console.log("Speech synthesis is not paused. Cannot resume.");
    }
  },
};

export default myModule;
