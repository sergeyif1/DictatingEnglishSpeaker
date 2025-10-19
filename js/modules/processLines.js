import { getCurrentButton1 } from "./buttonsClickHandlerPlay.js";
import { currentButton2 } from "./buttonsClickHandlerPauseResume.js";
import voicePlay from "./getUtterance.js";
import fitty from "fitty";

let text, vaarId, vaar1, vaar2;

async function processLines(dataChunk) {
  console.log(dataChunk);
  const currentButton1 = getCurrentButton1();

  const parsedData = JSON.parse(dataChunk);
  const { id, name, title, subscrb, language } = parsedData;
  console.log(id, name, title, subscrb, language);
  if (
    currentButton1 === "but1" ||
    (currentButton1 === "but1" && currentButton2 === "resumeButton")
  ) {
    text = `${name}`;
    console.log(`${id} - ${text}`);
    addItemToList((vaarId = id), (vaar1 = name), (vaar2 = title), subscrb);
  }

  if (
    currentButton1 === "but2" ||
    (currentButton1 === "but2" && currentButton2 === "resumeButton")
  ) {
    text = `${title}`;
    console.log(`${id} - ${text}`);

    addItemToList((vaarId = id), (vaar1 = title), (vaar2 = name), subscrb);
  }

  //Функция проверки, влезает ли текст
  function isOverflowing(el) {
    return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  }

  // Берём все textarea
  document.querySelectorAll("textarea").forEach((el) => {
    if (isOverflowing(el)) {
      // Если текст не помещается — применяем fitty
      fitty(el, {
        minSize: 20,
        maxSize: 30,
      });
    } else {
      // Если помещается — оставляем 30px
      el.style.fontSize = "30px";
    }
  });

  document.getElementById("text1").value = `${id} - ${name}`;
  document.getElementById("text2").value = `${id} - ${title}`;

  document.cookie = `id=${id}; path=/`;

  console.log(
    "Вызов voicePlay.getUtterance для текста:",
    text,
    language,
    name,
    title,
    currentButton1
  );

  // Вызов voicePlay.getUtterance для воспроизведения текста
  const utterance = voicePlay.getUtterance(text, language, currentButton1);
  window.speechSynthesis.speak(utterance);
}

function addItemToList(vaarId, vaar1, vaar2, subscrb) {
  const text3 = document.getElementById("text3");
  if (text3) {
    const row = document.createElement("tr");

    function createCell(text) {
      const cell = document.createElement("td");
      cell.textContent = text;
      cell.style.border = "1px solid black";
      cell.style.padding = "4px";
      return cell;
    }

    row.appendChild(createCell(vaarId));
    row.appendChild(createCell(vaar1));
    row.appendChild(createCell(`${vaar2} [${subscrb}]`));

    // Добавляем строку в начало таблицы
    text3.insertBefore(row, text3.firstChild);
  }
}

export default processLines;
