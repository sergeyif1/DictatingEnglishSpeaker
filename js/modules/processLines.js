import { getCurrentButton1 } from "./buttonsClickHandlerPlay.js";
import { currentButton2 } from "./buttonsClickHandlerPauseResume.js";
import voicePlay from "./getUtterance.js";

let text, vaarId, vaar1, vaar2;

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
    addItemToList(vaarId = id, vaar1 = name, vaar2 = title);
  }

  if (
    currentButton1 === "but2" ||
    (currentButton1 === "but2" && currentButton2 === "resumeButton")
  ) {
    text = `${title}`;
    console.log(`${id} - ${text}`);
    addItemToList(vaarId = id, vaar1 = title, vaar2 = name);
  }

  document.getElementById("text1").value = `${id} - ${name}`;
  document.getElementById("text2").value = `${id} - ${title}`;

  document.cookie = `id=${id}; path=/`;

  // Вызов voicePlay.getUtterance для воспроизведения текста
  const utterance = voicePlay.getUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function addItemToList(vaarId, vaar1, vaar2) {
  const text3 = document.getElementById("text3");
  if (text3) {
    const listItem = document.createElement("li");

    listItem.textContent = `${vaarId} - ${vaar1} - ${vaar2}`;
    text3.appendChild(listItem);
  }
}

export default processLines;
