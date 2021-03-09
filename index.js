const input = document.getElementById("input");
const display = document.getElementById("display");
const lang = document.getElementById("lang");
const langlist = document.getElementById("langlist");
const start = document.getElementById("start");
const progress = document.getElementById("p");
const result = document.getElementById("result");

start.addEventListener("click", async (e) => {
  progress.hidden = false;
  progress.removeAttribute("value");
  localStorage.setItem("input", input.value);
  localStorage.setItem("lang", lang.value);

  const worker = Tesseract.createWorker({
    logger: (m) => {
      if (m.jobId) {
        progress.value = Number(m.progress);
      }
    },
  });

  await worker.load();
  await worker.loadLanguage(lang.value);
  await worker.initialize(lang.value);
  const {
    data: { text },
  } = await worker.recognize(input.value);
  console.log(text);
  result.textContent = text;
  await worker.terminate();
});
