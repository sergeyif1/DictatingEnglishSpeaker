const seleDictionary = document.getElementById("select2");
const checkboxes = document.querySelectorAll(".form-language .checkboxL");

// Раздельные массивы
let selectedFromSelect = null;
let selectedFromCheckboxes = [];

// Словарь словарей
const dictMap = {
  "English dictionary": {
    code: "En",
    url: "/dbEn.json",
  },
  "Deutsch Wörterbuch": {
    code: "De",
    url: "/dbDeu.json",
  },
  "Griechικό λεξικό": {
    code: "Gr",
    url: "/dbGr.json",
  },
  "Plskie słownictwo": {
    code: "Pl",
    url: "/dbPl.json",
  },
  "Italiano dizionario": {
    code: "It",
    url: "/dbIt.json",
  },
};

// Соответствие value чекбоксов и кодов языков
const checkboxValueToCode = { 1: "En", 2: "Pl", 3: "Gr", 4: "De", 5: "It" };

// --- Обновление чекбоксов ---
function updateLangs() {
  selectedFromCheckboxes = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) =>
      Object.values(dictMap).find(
        (d) => d.code === checkboxValueToCode[cb.value]
      )
    )
    .filter(Boolean);

  logRequestAdd();
}

// --- Обновление select ---
function handleSelectChange(event) {
  const selectedValue = event.target.value;
  selectedFromSelect = dictMap[selectedValue] || null;
  logRequestAdd();
}

// --- Объединяем всё прямо в return ---
function getRequestAdd() {
  const result = [
    ...(selectedFromSelect ? [selectedFromSelect] : []),
    ...selectedFromCheckboxes,
  ]
    .map((item) => item.url)
    .filter(Boolean);

  return result.length > 0 ? result : undefined;
}

// --- Логирование с живым статусом ---
function logRequestAdd() {
  const combined = getRequestAdd();
  if (!combined) {
    console.log("⚠️ Нет выбранных словарей и языков");
    return;
  }

  console.log("📘 Текущий результат (массив URL’ов):", combined);

  //   // Через 5 минут повторно выводим статус
  //   setTimeout(() => {
  //     console.log("🕒 Этот результат был актуален 5 минут назад:", combined);
  //   }, 300000); // 5 минут = 300 000 мс
}

console.log("🧩 seleDictionary:", seleDictionary);
console.log("🧩 checkboxes:", checkboxes);

// --- Слушатели событий ---
seleDictionary.addEventListener("change", handleSelectChange);
checkboxes.forEach((cb) => cb.addEventListener("change", updateLangs));

export { getRequestAdd };

// // Словарь словарей
// const dictMap = {
//   "English dictionary": {
//     code: "En",
//     url: "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbEn.json",
//   },
//   "Deutsch Wörterbuch": {
//     code: "De",
//     url: "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbDeu.json",
//   },
//   "Griechικό λεξικό": {
//     code: "Gr",
//     url: "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbGr.json",
//   },
//   "Plskie słownictwo": {
//     code: "Pl",
//     url: "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbPl.json",
//   },
// };
