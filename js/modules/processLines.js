import { currentButton } from "./buttonsClickHandler.js";
import voicePlay from "./getUtterance.js";

async function processLines(dataChunk) {
  console.log(`${currentButton}`);

  const parsedData = JSON.parse(dataChunk);
  const { id, name, title } = parsedData;
  console.log(`${id} - ${name} - ${title}`);

  let text;

  if (currentButton === "but1" || currentButton === "resumeButton") {
    text = `${name}`;
    console.log(`${id} - ${text}`);
  } else if (currentButton === "but2" || currentButton === "resumeButton") {
    text = `${title}`;
    console.log(`${id} - ${text}`);
  }

  document.getElementById("text1").value = `${id} - ${name}`;
  document.getElementById("text2").value = `${id} - ${title}`;
  document.cookie = `id=${id}; path=/`;

  // Вызов voicePlay.getUtterance для воспроизведения текста
  const utterance = voicePlay.getUtterance(text);
  speechSynthesis.speak(utterance);
}

export default processLines;
