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

  // console.log("Список доступных голосов:");
  availableVoices.forEach((voice) => {
    let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);

    // console.log(
    //   `${voice.name} (${voice.lang}) ${voice.default ? "[default]" : ""}`
    // );
  });

  // Ищем Google US English (en-US)
  let preferredVoice = availableVoices.find(
    (v) => v.name === "Google US English" && v.lang === "en-US"
  );

  if (preferredVoice) {
    // Устанавливаем выбранным его
    voiceList.value = preferredVoice.name;
    // console.log(
    //   "Выбран по умолчанию:",
    //   preferredVoice.name,
    //   `(${preferredVoice.lang})`
    // );
  } else if (defaultVoice) {
    // fallback если Google US English нет
    voiceList.value = defaultVoice.name;
    // console.log(
    //   "Выбран по умолчанию:",
    //   defaultVoice.name,
    //   `(${defaultVoice.lang})`
    // );
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

    // 🔍 Логируем все входные параметры
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
          "Google US English (en-US)",
          "en-US",
        ],
        Pl: ["польский Польша (pl-PL)", "Google polski (pl-PL)", "pl-PL"],
        Gr: ["греческий Греция (el-GR)", "Google русский (ru-RU)", "el-GR"],
        Du: ["немецкий Германия (de-DE)", "Google Deutsch (de-DE)", "de-DE"],
      };

      const possibleMatches = languageMap[language] || [];

      selectedVoice = availableVoices.find((v) =>
        possibleMatches.some(
          (match) =>
            v.name.includes(match) ||
            v.lang === match ||
            `${v.name} (${v.lang})` === match
        )
      );

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
    if (language && currentButton1 === "but2") {
      const russianMatches = [
        "Google русский (ru-RU)",
        "русский Россия (ru-RU)",
        "(ru-RU)",
        "ru-RU",
      ];

      selectedVoice = availableVoices.find((v) =>
        russianMatches.some(
          (match) =>
            v.name.includes(match) ||
            v.lang === match ||
            `${v.name} (${v.lang})` === match
        )
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
    // ⚙️ Fallback
    // ---------------------------
    if (!selectedVoice) {
      const selectedVoiceName = voiceList.value;
      selectedVoice = availableVoices.find((v) => v.name === selectedVoiceName);
      console.log(
        `🔁 Fallback: выбран голос из UI — ${selectedVoiceName || "не найден"}`
      );
    }

    if (!selectedVoice) {
      selectedVoice = availableVoices[0];
      console.warn(
        `⚠️ Используется первый доступный голос: ${selectedVoice.name}`
      );
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
