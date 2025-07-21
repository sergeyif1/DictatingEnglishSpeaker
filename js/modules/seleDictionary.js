const seleDictionary = document.getElementById("select2");

let requestAdd = null;

seleDictionary.addEventListener("change", function () {
  const value = seleDictionary.value;

  if (value === "English dictionary") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbEn.json";
  } else if (value === "Deutsch Wörterbuch") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbDeu.json";
  } else if (value === "Griechικό λεξικό") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbGr.json";
  } else if (value === "Polskie słownictwo") {
    requestAdd =
      "https://raw.githubusercontent.com/sergeyif1/DictatingEnglishSpeaker/main/dbPl.json";
  } else {
    requestAdd = null;
  }
});

export function getRequestAdd() {
  return requestAdd;
}
