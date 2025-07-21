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
  } else if (option2Checked) {
    const cookieId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("id="));

    if (cookieId) {
      idFrom = cookieId.split("=")[1];
    }
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
