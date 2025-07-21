const seleDictionary = document.getElementById("select2");

let requestAdd;

if (seleDictionary.value === "English dictionary") {
  requestAdd = "../blob/main/dbEn.json";
}

seleDictionary.addEventListener("change", function () {
  if (seleDictionary.value === "Deutsch Wörterbuch") {
    requestAdd = "../blob/main/dbDeu.json";
  }
  if (seleDictionary.value === "English dictionary") {
    requestAdd = "../blob/main/dbEn.json";
  }
  if (seleDictionary.value === "Griechικό λεξικό") {
    requestAdd = "../blob/main/dbGr.json";
  }
  if (seleDictionary.value === "Polskie słownictwo") {
    requestAdd = "../blob/main/dbPl.json";
  }
});

export function getRequestAdd() {
  return requestAdd;
}
