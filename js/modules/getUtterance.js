document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

const voiceList = document.getElementById("voiceSelect");

let selectedVoiceName;
const synth = window.speechSynthesis;

export function voices() {
  voiceList.innerHTML = ""; // очищаем текущие элементы

  let availableVoices = synth.getVoices();
  let defaultVoice = getDefaultVoice(availableVoices);

  availableVoices.forEach((voice) => {
    let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  });

  // Ищем Google US English (en-US)
  let preferredVoice = availableVoices.find(
    (v) => v.name === "Google US English" && v.lang === "en-US"
  );

  if (preferredVoice) {
    voiceList.value = preferredVoice.name;
  } else if (defaultVoice) {
    voiceList.value = defaultVoice.name;
  } else {
    console.log("Нет доступного голоса для выбора по умолчанию");
  }
}

function getDefaultVoice(voices) {
  return voices.find(
    (voice) => voice.lang === "(en-US)" || voice.lang === "(en-GB)"
  );
}

const voicePlay = {
  getUtterance: function (text, language, currentButton1) {
    const rate = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;
    const availableVoices = synth.getVoices();
    let selectedVoice = null;

    console.log("🎯 Параметры getUtterance:", {
      text,
      language,
      currentButton1,
    });

    // ---------------------------
    // 🔹 Вариант 1: режим подбора по языку
    // ---------------------------
    if (language && currentButton1 === "but1") {
      const languageMap = {
        En: [
          "английский Соединенные Штаты (en-US)",
          "(en-US)",
          /[^"]*\(en-US\)/,
          "Google US English (en-US)",
        ],
        Pl: [
          "польский Польша (pl-PL)",
          "(pl-PL)",
          /[^"]*\(pl-PL\)/,
          "Google polski (pl-PL)",
        ],
        Gr: [
          "греческий Греция (el-GR)",
          "(el-GR)",
          /[^"]*\(el-GR\)/,
          "Greek (el-GR)",
        ],
        Du: [
          "немецкий Германия (de-DE)",
          "(de-DE)",
          /[^"]*\(de-DE\)/,
          "Google Deutsch (de-DE)",
        ],
      };

      const possibleMatches = languageMap[language] || [];

      // 1️⃣ Основной поиск
      selectedVoice = availableVoices.find((v) =>
        possibleMatches.some((match) => {
          const full = `${v.name || ""} (${v.lang || ""})`;

          if (Object.prototype.toString.call(match) === "[object RegExp]") {
            return match.test(full) || match.test(v.name) || match.test(v.lang);
          }

          if (typeof match === "string") {
            return (
              (v.name && v.name.includes(match)) ||
              (v.lang && v.lang === match) ||
              full === match
            );
          }
          return false;
        })
      );

      // 2️⃣ Фоллбэк по коду языка (en, pl, el, de)
      if (!selectedVoice) {
        const langPrefixMap = {
          En: ["en-US", "en-GB", "en"],
          Pl: ["pl-PL", "pl"],
          Gr: ["el-GR", "el"],
          Du: ["de-DE", "de"],
        };

        const prefixes = langPrefixMap[language] || [];

        selectedVoice = availableVoices.find((v) =>
          prefixes.some((p) => {
            const langLower = v.lang?.toLowerCase() || "";
            const fullLower = `${v.name || ""} (${v.lang || ""})`.toLowerCase();
            return (
              langLower === p.toLowerCase() ||
              langLower.startsWith(p.toLowerCase()) ||
              fullLower.includes(p.toLowerCase())
            );
          })
        );
      }

      if (selectedVoice) {
        console.log(
          `🗣️ Автоматический выбор голоса для языка ${language}: ${selectedVoice.name} (${selectedVoice.lang})`
        );
      } else {
        console.warn(`⚠️ Голос не найден для языка ${language}`);
      }
    }

    // ---------------------------
    // 🔹 Вариант 2: единый русский голос
    // ---------------------------
    if (!selectedVoice && language && currentButton1 === "but2") {
      const russianMatches = [
        "Google русский (ru-RU)",
        "русский Россия (ru-RU)",
        "(ru-RU)",
        "ru-RU",
      ];

      selectedVoice = availableVoices.find((v) =>
        russianMatches.some((match) => {
          const full = `${v.name || ""} (${v.lang || ""})`;

          if (Object.prototype.toString.call(match) === "[object RegExp]") {
            return match.test(full) || match.test(v.name) || match.test(v.lang);
          }

          if (typeof match === "string") {
            return (
              (v.name && v.name.includes(match)) ||
              (v.lang && v.lang === match) ||
              full === match
            );
          }
          return false;
        })
      );

      if (selectedVoice) {
        console.log(
          `🇷🇺 Используется единый русский голос: ${selectedVoice.name} (${selectedVoice.lang})`
        );
      } else {
        console.warn("⚠️ Не найден русский голос для режима but2");
      }
    }

    // ---------------------------
    // ⚙️ Fallback (UI / первый)
    // ---------------------------
    if (!selectedVoice) {
      const selectedVoiceName = voiceList.value;
      selectedVoice = availableVoices.find((v) => v.name === selectedVoiceName);

      if (selectedVoice) {
        console.log(
          `🔁 Fallback: выбран голос из UI — ${selectedVoice.name} (${selectedVoice.lang})`
        );
      } else if (availableVoices.length > 0) {
        selectedVoice = availableVoices[0];
        console.warn(
          `⚠️ Используется первый доступный голос: ${selectedVoice.name} (${selectedVoice.lang})`
        );
      } else {
        console.error("❌ Нет доступных голосов в системе!");
      }
    }

    // ---------------------------
    // 🎧 Формируем объект речи
    // ---------------------------
    const U = new SpeechSynthesisUtterance(text);
    U.voice = selectedVoice;
    U.lang = selectedVoice.lang;
    U.volume = 1;
    U.rate = rate;
    U.pitch = pitch;

    console.log(`✅ Итоговый выбор: ${U.voice.name} (${U.lang})`);

    return U;
  },
};

// обработка событий выбора голоса
voiceList.addEventListener("change", function () {
  selectedVoiceName = voiceList.value;
});

export default voicePlay;

// document.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//   }
// });

// const voiceList = document.getElementById("voiceSelect");

// let selectedVoiceName;
// const synth = window.speechSynthesis;

// export function voices() {
//   voiceList.innerHTML = ""; // очищаем текущие элементы

//   let availableVoices = synth.getVoices();
//   let defaultVoice = getDefaultVoice(availableVoices);

//   // console.log("Список доступных голосов:");
//   availableVoices.forEach((voice) => {
//     let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
//     voiceList.insertAdjacentHTML("beforeend", option);

//     // console.log(
//     //   `${voice.name} (${voice.lang}) ${voice.default ? "[default]" : ""}`
//     // );
//   });

//   // Ищем Google US English (en-US)
//   let preferredVoice = availableVoices.find(
//     (v) => v.name === "Google US English" && v.lang === "en-US"
//   );

//   if (preferredVoice) {
//     // Устанавливаем выбранным его
//     voiceList.value = preferredVoice.name;
//     // console.log(
//     //   "Выбран по умолчанию:",
//     //   preferredVoice.name,
//     //   `(${preferredVoice.lang})`
//     // );
//   } else if (defaultVoice) {
//     // fallback если Google US English нет
//     voiceList.value = defaultVoice.name;
//     // console.log(
//     //   "Выбран по умолчанию:",
//     //   defaultVoice.name,
//     //   `(${defaultVoice.lang})`
//     // );
//   } else {
//     console.log("Нет доступного голоса для выбора по умолчанию");
//   }
// }

// function getDefaultVoice(voices) {
//   return voices.find(
//     (voice) => voice.lang === "(en-US)" || voice.lang === "(en-GB)"
//   );
// }

// const voicePlay = {
//   getUtterance: function (text, language, currentButton1) {
//     const rate = document.getElementById("speed").value;
//     const pitch = document.getElementById("pitch").value;
//     const availableVoices = synth.getVoices();
//     let selectedVoice = null;

//     // 🔍 Логируем все входные параметры
//     console.log("🎯 Параметры getUtterance:", {
//       text,
//       language,
//       currentButton1,
//     });

//     // ---------------------------
//     // 🔹 Вариант 1: режим подбора по языку
//     // ---------------------------
//     if (language && currentButton1 === "but1") {
//       const languageMap = {
//         En: [
//           "английский Соединенные Штаты (en-US)",
//           "(en-US)",
//           /"[^"]*\(en-US\)"/g,
//           "Google US English (en-US)",
//         ],
//         Pl: [
//           "польский Польша (pl-PL)",
//           "(pl-PL)",
//           /"[^"]*\(pl-PL\)"/g,
//           "Google polski (pl-PL)",
//           // "pl-PL"
//         ],
//         Gr: [
//           "греческий Греция (el-GR)",
//           "(el-GR)",
//           /"[^"]*\(el-GR\)"/g,
//           "Google русский (ru-RU)",
//           // "el-GR",
//         ],
//         Du: [
//           "немецкий Германия (de-DE)",
//           "(de-DE)",
//           /"[^"]*\(de-DE\)"/g,
//           "Google Deutsch (de-DE)",
//           // "de-DE",
//         ],
//       };

//       const possibleMatches = languageMap[language] || [];

//       selectedVoice = availableVoices.find((v) =>
//         possibleMatches.some(
//           (match) =>
//             v.name.includes(match) ||
//             v.lang === match ||
//             `${v.name} (${v.lang})` === match
//         )
//       );

//       if (selectedVoice) {
//         console.log(
//           `🗣️ Автоматический выбор голоса для языка ${language}: ${selectedVoice.name} (${selectedVoice.lang})`
//         );
//       } else {
//         console.warn(`⚠️ Голос не найден для языка ${language}`);
//       }
//     }

//     // ---------------------------
//     // 🔹 Вариант 2: единый русский голос
//     // ---------------------------
//     if (language && currentButton1 === "but2") {
//       const russianMatches = [
//         "Google русский (ru-RU)",
//         "русский Россия (ru-RU)",
//         "(ru-RU)",
//         "ru-RU",
//       ];

//       selectedVoice = availableVoices.find((v) =>
//         possibleMatches.some((match) => {
//           // 🧩 Защита от RegExp
//           const isRegExp =
//             Object.prototype.toString.call(match) === "[object RegExp]";

//           // 🧩 Если регулярка
//           if (isRegExp) {
//             return (
//               match.test(v.name || "") ||
//               match.test(v.lang || "") ||
//               match.test(`${v.name} (${v.lang})`)
//             );
//           }

//           // 🧩 Если строка
//           if (typeof match === "string") {
//             return (
//               (v.name && v.name.includes(match)) ||
//               (v.lang && v.lang === match) ||
//               `${v.name} (${v.lang})` === match
//             );
//           }

//           // 🚫 fallback
//           return false;
//         })
//       );

//       // selectedVoice = availableVoices.find((v) =>
//       //   russianMatches.some(
//       //     (match) =>
//       //       v.name.includes(match) ||
//       //       v.lang === match ||
//       //       `${v.name} (${v.lang})` === match
//       //   )
//       // );

//       if (selectedVoice) {
//         console.log(
//           `🇷🇺 Используется единый русский голос: ${selectedVoice.name} (${selectedVoice.lang})`
//         );
//       } else {
//         console.warn("⚠️ Не найден русский голос для режима but2");
//       }
//     }

//     // ---------------------------
//     // ⚙️ Fallback
//     // ---------------------------
//     if (!selectedVoice) {
//       const selectedVoiceName = voiceList.value;
//       selectedVoice = availableVoices.find((v) => v.name === selectedVoiceName);
//       console.log(
//         `🔁 Fallback: выбран голос из UI — ${selectedVoiceName || "не найден"}`
//       );
//     }

//     if (!selectedVoice) {
//       selectedVoice = availableVoices[0];
//       console.warn(
//         `⚠️ Используется первый доступный голос: ${selectedVoice.name}`
//       );
//     }

//     // ---------------------------
//     // 🎧 Формируем объект речи
//     // ---------------------------
//     const U = new SpeechSynthesisUtterance(text);
//     U.voice = selectedVoice;
//     U.lang = selectedVoice.lang;
//     U.volume = 1;
//     U.rate = rate;
//     U.pitch = pitch;

//     console.log(`✅ Итоговый выбор: ${U.voice.name} (${U.lang})`);

//     return U;
//   },
// };

// // обработка событий выбора голоса
// voiceList.addEventListener("change", function () {
//   selectedVoiceName = voiceList.value;
// });

// export default voicePlay;
