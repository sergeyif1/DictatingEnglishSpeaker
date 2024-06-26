import myModule from "./myModule.js";

const inputElements = document.querySelectorAll(".form-point");

let idFrom;

export function activCheckBox() {
  const option1Checked = document.querySelector(
    'input[name="option1"]'
  ).checked;
  const option2Checked = document.querySelector(
    'input[name="option2"]'
  ).checked;

  if (option1Checked) {
    idFrom = inputElements[0].value;
    // console.log(`Проверка чекбоксов 1: ${idFrom}`);
  } else if (option2Checked) {
    const cookieId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("id="));

    if (cookieId) {
      idFrom = cookieId.split("=")[1];
      console.log(`Проверка чекбоксов 2: ${idFrom}`);
    } else {
      console.log("id в cookie не найден.");
    }
  } else {
    console.log("Чекбоксы не выделены. Отметьте нужное действие!");
  }

  if (idFrom) {
    myModule.setID(idFrom);
  }
}

// Экспортируем переменную через функцию, чтобы её значение было актуальным
export function getIdFrom() {
  return idFrom;
}

export default { activCheckBox, getIdFrom };
