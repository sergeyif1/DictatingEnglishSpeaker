const controlCheckBox = () => {
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        document.querySelectorAll(".checkbox").forEach((box) => {
          if (box !== this) {
            box.disabled = true;
          }
        });
      } else {
        document.querySelectorAll(".checkbox").forEach((box) => {
          box.disabled = false;
        });
      }
    });
  });

  // Блокировка остальных чекбоксов при загрузке страницы, если первый чекбокс выбран
  window.addEventListener("load", function () {
    const firstCheckbox = document.querySelector('.checkbox[name="option1"]');
    if (firstCheckbox.checked) {
      document.querySelectorAll(".checkbox").forEach((box) => {
        if (box !== firstCheckbox) {
          box.disabled = true;
        }
      });
    }
  });
};

export default controlCheckBox;

// document.querySelectorAll(".checkbox").forEach((checkbox) => {
//   checkbox.addEventListener("change", function () {
//     if (this.checked) {
//       document.querySelectorAll(".checkbox").forEach((box) => {
//         if (!this) {
//           box.disablet = true;
//         }
//       });
//     } else {
//       document.querySelectorAll(".checkbox").forEach((box) => {
//         box.disablet = false;
//       });
//     }
//   });
// });
