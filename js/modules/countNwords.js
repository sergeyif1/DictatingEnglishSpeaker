import myModule from "./myModule";

const countNwords = {
  nWord: function () {
    const countNWordVolue = document.querySelector(".form-pointN").value;
    const optionCheckedNWord = document.querySelector(
      'input[name="option3"]'
    ).checked;

    if (!optionCheckedNWord && !countNWordVolue) {
      alert(
        "Отметьте пожалуйста чекбокс, и поставьте нужное колличество слов!"
      );
    }

    // console.log(`Проверка чек бокс 3 ${countNWordVolue}`);
    myModule.useCountNWord(countNWordVolue);
  },
};

export default countNwords;
