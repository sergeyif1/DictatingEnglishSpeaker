<h1 align="center">Привет, я Сергей!
            <img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32" alt="Привет"/>
        </h1>
        <h3 align="center">Это приложение для моего портфолио</h3>
      
<br>[🌐 Ссылка на проект ](https://dictating-english-speaker.vercel.app/)
 
<h3 align="center">👀 Что это и для чего?</h3>
        <p>Приложение для изучения английского языка. Я его делаю для себя. Оно диктует голосом и дублирует на экране английские слова и выражения с переводом. Доступен режим диктанта - по английски и по русски. Есть разные настройки:</p>
        <ul>
            <li><span class="highlight">Скорость воспроизведения</span></li>
            <li><span class="highlight">Тон голоса</span></li>
            <li><span class="highlight">Пауза между словами</span></li>
            <li><span class="highlight">2 режима начать</span></li>
            <li><span class="highlight">Количество слов от начальной точки</span></li>
        </ul>

<h3 align="center">🛠 Описание проекта для портфолио</h3>
<p>Технологии, используемые в проекте:</p>
<ul>
    <li>JavaScript классика</li>
    <li>Файл .json для эмуляции базы данных</li>
    <li>Webpack для сборки проектов</li>
    <li>Fetch API</li>
    <li>Web Speech API</li>
    <li>Алгоритм Дейкстры для поиска кратчайших путей</li>
    <li>Хэш таблицы (SHA) для организации эмулированных баз данных, обеспечивающие скорость получения данных O(1). Принципы организации телефонной книги</li>
    <li>ReadableStreamDefaultReader для чтения потоков данных</li>
    <li>TextDecoder() для декодирования текстовых данных</li>
    <li>JSON.parse() для распарсивания данных в ячейке</li>
    <li>Promise ( (resolve) => {} ) и Рекурсия - вместо setTimeout() и Цикла</li>
    <li>cooki</li>
</ul>
<p>*Хотя применение рекурсии и Promise вместо setTimeout() и цикла ослабило немного систему, но были приняты меры для улучшения стабильности.</p>

```JavaScript
 try {
      // 2. Запрос данных через fetch API
      const response = await fetch(filePath);
      // 3. Обрабатываем ошибку соединени
      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      // 5. Создаем объект ReadableStreamDefaultReader для чтения потока
      const stream = response.body;
      const reader = stream.getReader();

      // 6. Распарсиваем поток
      const decoder = new TextDecoder();
      let result = "";
      let done = false;
      
       ////////другой код/////////

    }

```

и

```JavaScript
      // 7.Функция для чтения следующей строки с задержкой
      async function readNextString() {
        if (count_n_Word !== null && processedCount >= count_n_Word) {
          console.log(`Обработано ${processedCount} строк. Завершение.`);
          return;
        }

        const searchString = `"id": "${currentID}"`;
        const startIndex = result.indexOf(searchString);

       ////////другой код/////////

            const foundObject = JSON.parse(dataChunk);
            foundObjects.push(foundObject);

            currentID++;
            processedCount++;

            await new Promise((resolve) => setTimeout(resolve, sec));

            while (isPaused) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            const initialSeconds = sec / 1000;
            countdown(initialSeconds, initialSeconds);

            speechSynthesis.cancel();
            processLines(dataChunk);

            await readNextString();
          }

```

<h3 align="center">🔥 Как оно работает? Как его настроить? Можно посмотреть в видео.</h3>
        <p>Видео - <a href="pic/direction.png" class="#">[Инструкция]</a></p>
        <p>Текст - <a href="pic/direction - Text.png" class="#">[Инструкция]</a></p>
        <p>Приложение готово к работе как есть.</p>
<h3 align="center">👀 С чего начать?</h3>
        <ul>
            <li>Установить редактор кода Visual Studio Code</li>
            <li>Установить NodeJS</li>
            <li>Скачать репозиторий с вёрсткой - <a href="https://github.com/sergeyif1/DictatingEnglishSpeaker.git" class="link">https://github.com/sergeyif1/DictatingEnglishSpeaker.git</a></li>
            <li>Создайте папку проекта. Это можно сделать в любом месте на вашем компьютере.</li>
            <li>Разместите туда файлы, которые скачали.</li>
        </ul>

<h3 align="center">👀 Что дальше?</h3>
        <p><strong>Запуск локально, способ 1:</strong></p>
        <ul>
            <li>Откройте терминал Visual Studio Code</li>
            <li>Введите команду <code>npm init -y</code></li>
            <li>Введите команду <code>npm i</code></li>
            <li>Введите команду <code>npx webpack</code></li>
            <li>Далее запустите локальный сервер Go Live, расположенный внизу Visual Studio Code. Далее запустится веб-браузер по умолчанию.</li>
        </ul>

<p><strong>Запуск локально, способ 2:</strong></p>
        <ul>
            <li>Создайте папку в зоне domain вашего сервера</li>
            <li>Запустите проект в установленном порядке для вашего сервера.</li>
        </ul>



<h3 align="center">Помощь по проекту</h3>
        <p><strong>Е-Mail:</strong> <a href="mailto:sergeyif1@gmail.com" class="link">sergeyif1@gmail.com</a></p>
