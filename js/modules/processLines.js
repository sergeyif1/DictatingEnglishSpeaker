import voicePlay from "./getUtterance";
import { currentButton } from "./buttonsClickHandler";

async function processLines(dataChunk) {
  // Парсим JSON-строку в объект
  const parsedData = JSON.parse(dataChunk);
  const { id, name, title } = parsedData;
  // console.log("processLines:", id, name, title);
  let text;

  if (currentButton === "but1") {
    text = `${name}`;
    console.log(`${id} - ${text}`);
  } else if (currentButton === "but2") {
    text = `${title}`;
    console.log(`${id} - ${text}`);
  }

  const Utl = voicePlay.getUtterance(text);
  speechSynthesis.speak(Utl); // speechSynthesis - он самостоятельный запускается с любого места

  document.getElementById("text1").value = `${id} - ${name}`;
  document.getElementById("text2").value = `${id} - ${title}`;
  document.cookie = `id=${id}; path=/`;
}

export default processLines;
