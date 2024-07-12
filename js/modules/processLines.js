import { getCurrentButton1 } from "./buttonsClickHandlerPlay.js";
import { currentButton2 } from "./buttonsClickHandlerPauseResume.js";
import voicePlay from "./getUtterance.js";

let text;

async function processLines(dataChunk) {
  const currentButton1 = getCurrentButton1();
  // console.log(`11111 ${currentButton1} ${currentButton2}`);

  const parsedData = JSON.parse(dataChunk);
  const { id, name, title } = parsedData;

  if (
    currentButton1 === "but1" ||
    (currentButton1 === "but1" && currentButton2 === "resumeButton")
  ) {
    text = `${name}`;
    console.log(`${id} - ${text}`);
  }

  if (
    currentButton1 === "but2" ||
    (currentButton1 === "but2" && currentButton2 === "resumeButton")
  ) {
    text = `${title}`;
    console.log(`${id} - ${text}`);
  }

  document.getElementById("text1").value = `${id} - ${name}`;
  document.getElementById("text2").value = `${id} - ${title}`;
  document.cookie = `id=${id}; path=/`;

  // Вызов voicePlay.getUtterance для воспроизведения текста
  const utterance = voicePlay.getUtterance(text);
  window.speechSynthesis.speak(utterance);
}

export default processLines;
