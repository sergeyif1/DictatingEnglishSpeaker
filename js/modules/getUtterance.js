document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

let selectedVoiceName;
const synth = speechSynthesis;

const voiceList = document.getElementById("voiceSelect");

export function voices() {
  voiceList.innerHTML = ""; // Очищаем текущие элементы в списке

  let availableVoices = speechSynthesis.getVoices();
  // let defaultVoice = getDefaultVoice(availableVoices);

  // Создаем список ul
  const ul = document.createElement("ul");

  availableVoices.forEach((voice) => {
    let selected = voice === availableVoices ? "selected" : "";

    // Создаем элемент li для каждого голоса
    const li = document.createElement("li");
    li.textContent = `${voice.name} (${voice.lang})`;
    li.setAttribute("value", voice.name); // Добавляем атрибут value

    // Добавляем класс "selected" для выбранного голоса
    if (selected) {
      li.classList.add("selected");
    }

    // Добавляем обработчик события клика для выбора голоса
    li.addEventListener("click", () => {
      // Очищаем текущий выбор
      const selectedLi = ul.querySelector("li.selected");
      if (selectedLi) {
        selectedLi.classList.remove("selected");
      }
      // Выбираем новый голос
      li.classList.add("selected");
      selectedVoiceName = voice.name; // Устанавливаем выбранное значение
    });

    // Добавляем элемент li в список ul
    ul.appendChild(li);
  });

  // Добавляем список ul в элемент voiceList
  voiceList.appendChild(ul);
}

const voicePlay = {
  getUtterance: function (text) {
    const rate = document.getElementById("speed").value;
    const pitch = document.getElementById("pitch").value;

    const availableVoices = synth.getVoices();

    if (availableVoices.length > 0) {
      const selectedVoice = availableVoices.find(
        (voice) => voice.name === selectedVoiceName
      );

      const U = new SpeechSynthesisUtterance(text);
      U.voice = selectedVoice;
      U.lang = selectedVoice.lang;
      U.volume = 1;
      U.rate = rate;
      U.pitch = pitch;

      return U;
    } else {
      return null;
    }
  },
};

// обработка событий выбора голоса
voiceList.addEventListener("change", function () {
  selectedVoiceName = voiceList.value;
});

export default voicePlay;
