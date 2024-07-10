// document.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//   }
// });

const controlCheckBox = () => {
  // Обработка изменения состояния чекбоксов
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Если текущий чекбокс выбран, отключаем остальные чекбоксы
        document.querySelectorAll(".checkbox").forEach((box) => {
          if (box !== this) {
            box.disabled = true;
          }
        });
      } else {
        // Если текущий чекбокс не выбран, включаем все чекбоксы
        document.querySelectorAll(".checkbox").forEach((box) => {
          box.disabled = false;
        });
      }
    });
  });

  // Проверка состояния чекбоксов при загрузке страницы
  window.addEventListener("load", function () {
    const firstCheckbox = document.querySelector('.checkbox[name="option1"]');
    if (firstCheckbox && firstCheckbox.checked) {
      // Если первый чекбокс выбран, отключаем остальные чекбоксы
      document.querySelectorAll(".checkbox").forEach((box) => {
        if (box !== firstCheckbox) {
          box.disabled = true;
        }
      });
    }
  });
};

export default controlCheckBox;
