const seleDictionary = document.getElementById("select2");

let requestAdd;

if (seleDictionary.value === "English dictionary") {
  requestAdd =
    "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbEn.json";
}

seleDictionary.addEventListener("change", function () {
  if (seleDictionary.value === "Deutsch Wörterbuch") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbDeu.json";
  }
  if (seleDictionary.value === "Griechικό λεξικό") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbGr.json";
  }
  if (seleDictionary.value === "Polskie słownictwo") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbPl.json";
  }
});

export function getRequestAdd() {
  return requestAdd;
}
