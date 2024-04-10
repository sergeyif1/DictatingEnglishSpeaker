import _axios from "axios";
import _get from "lodash.get";

async function processLines(data, index = 0, callback) {
  const currentItem = data.find((item) => item.id === index + 1);
  if (!currentItem) return;
  const { id, name, title } = currentItem;

  await callback(id, name, title);
  await processLines(data, index + 1, callback);
}

async function logToConsole(id, name, title) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`ID: ${id}, Name: ${name}, Title: ${title}`);
}

async function fetchData() {
  try {
    const res = await _axios.get("http://dictatingenglishspeaker/mybase.json");
    const data = _get(res, "data.index", []);
    await processLines(data, 0, logToConsole);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();
