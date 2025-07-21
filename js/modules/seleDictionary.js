const seleDictionary = document.getElementById("select2");

let requestAdd;

if (seleDictionary.value === "English dictionary") {
  requestAdd = "/dbEn.json";
}

seleDictionary.addEventListener("change", function () {
  if (seleDictionary.value === "Deutsch Wörterbuch") {
    requestAdd = "/dbDeu.json";
  }
  if (seleDictionary.value === "English dictionary") {
    requestAdd = "/dbEn.json";
  }
  if (seleDictionary.value === "Griechικό λεξικό") {
    requestAdd = "/dbGr.json";
  }
  if (seleDictionary.value === "Polskie słownictwo") {
    requestAdd = "/dbPl.json";
  }
});

export function getRequestAdd() {
  return requestAdd;
}
