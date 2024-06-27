<h1 align="center">Hi there, I'm Sergey!
            <img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32" alt="Hi" />
        </h1>
<h3 align="center">This is an application for my portfolio</h3> 
          <h3 align="center">👀 What is this and what is it for?</h3>
        <p>This is an application for learning English. I'm making it for myself. It dictates and displays English words
            and phrases with their translations on the screen. A dictation mode is available in both English and
            Russian. There are various settings:</p>
        <ul>
            <li><span class="highlight">Playback Speed</span></li>
            <li><span class="highlight">Voice Tone</span></li>
            <li><span class="highlight">Pause Between Words</span></li>
            <li><span class="highlight">2 Modes to Start</span></li>
            <li><span class="highlight">Number of Words from the Starting Point</span></li>
        </ul>
<h3 align="center">🛠 Project Description for Portfolio</h3>
<p>Technology stack in the project:</p>
<ul>
    <li>Classic JavaScript</li>
    <li>.json file to simulate a database</li>
    <li>Webpack for project bundling</li>
    <li>Fetch API</li>
    <li>Web Speech API</li>
    <li>Dijkstra's algorithm for finding shortest paths</li>
    <li>Hash tables (SHA) for organizing simulated databases, ensuring O(1) data retrieval. Principles similar to a phone book organization</li>
    <li>ReadableStreamDefaultReader for reading data streams</li>
    <li>TextDecoder() for decoding text data</li>
    <li>JSON.parse() for parsing data in a cell</li>
    <li>Promise (_(resolve) => {.....}_) and Recursion - instead of setTimeout() and Loop</li>
</ul>
<p>*Although using recursion and Promise instead of setTimeout() and loop slightly weakened the system, measures were taken to improve stability.</p>


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

      ////////another code/////////

    }

```

and

```JavaScript

      // 7.Функция для чтения следующей строки с задержкой
      async function readNextString() {
        if (count_n_Word !== null && processedCount >= count_n_Word) {
          console.log(`Обработано ${processedCount} строк. Завершение.`);
          return;
        }

        const searchString = `"id": "${currentID}"`;
        const startIndex = result.indexOf(searchString);

       ////////another code/////////

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

<h3 align="center">🔥 How does it work? How to set it up? You can watch the video.</h3>
        <p>Video - <a href="#" class="link">[Expected]</a></p>
        <p>The application is ready to use as is.</p>
        <h3 align="center">👀 Where to start?</h3>
        <ul>
            <li>Install the Visual Studio Code code editor</li>
            <li>Install NodeJS</li>
            <li>Download the repository with the layout - <a
                    href="https://github.com/sergeyif1/DictatingEnglishSpeaker.git"
                    class="link">https://github.com/sergeyif1/DictatingEnglishSpeaker.git</a></li>
            <li>Create a project folder. This can be done anywhere on your computer.</li>
            <li>Place the downloaded files there.</li>
        </ul>
<h3 align="center">👀 What's next?</h3>
        <p><strong>Run locally, method 1:</strong></p>
        <ul>
            <li>Open the Visual Studio Code terminal</li>
            <li>Enter the command <code>npm init -y</code></li>
            <li>Enter the command <code>npm i</code></li>
            <li>Enter the command <code>npx webpack</code></li>
            <li>Then launch the Go Live local server located at the bottom of Visual Studio Code. Your default web
                browser will then open.</li>
        </ul>
<p><strong>Run locally, method 2:</strong></p>
        <ul>
            <li>Create a folder in the domain area of your server</li>
            <li>Launch the project according to the standard procedure for your server.</li>
        </ul>
        
