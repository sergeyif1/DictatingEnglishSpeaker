const seleDictionary = document.getElementById("select2");

let requestAdd;

if (seleDictionary.value === "English dictionary") {
  requestAdd = "../dbEn.json";
}

seleDictionary.addEventListener("change", function () {
    if (seleDictionary.value === "Deutsch Wörterbuch") {
        requestAdd = "../dbDeu.json";
    }
    if (seleDictionary.value === "English dictionary") {
        requestAdd = "../dbEn.json";
    }
});

export function getRequestAdd() {
    return requestAdd;
}