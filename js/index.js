const translateBtn = document.getElementById("translate_btn");
const selectTag = document.querySelectorAll("select");
const textSelect = document.getElementById("from_text"); //textarea to be translated
const textTransform = document.getElementById("to_text"); //textarea after translation
const languageFrom = document.getElementById("select_from"); //select language in which text is present
const languageTo = document.getElementById("select_to"); //select language in which text has to be translated
const exchangeBtn = document.getElementById("exc_btn");
const copyTextBefore = document.getElementById("copy_before");
const copyTextAfter = document.getElementById("copy_after");
const volumeBtnBefore = document.getElementById("sound_left");
const volumeBtnAfter = document.getElementById("sound_right");

selectTag.forEach((tag, id) => {
  for (let lang_code in languages) {
    let selected =
      id == 0
        ? lang_code == "en-GB"
          ? "selected"
          : ""
        : lang_code == "hi-IN"
        ? "selected"
        : "";
    let option = `<option ${selected} value="${lang_code}">${languages[lang_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

translateBtn.addEventListener("click", () => {
  const transformTextValue = textSelect.value.trim(); //value of text to be translated
  const translateFrom = languageFrom.value; // language in which text is present
  const translateTo = languageTo.value; // language in which text has to be translated
  textTransform.setAttribute("placeholder", "Translating...");

  let apiUrl = `https://api.mymemory.translated.net/get?q=${transformTextValue}&langpair=${translateFrom}|${translateTo}`;

  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       textTransform.textContent = data.responseData.translatedText;
  //     });
  const fetchAPI = async () => {
    try {
      if (!transformTextValue) return;
      textTransform.setAttribute("placeholder", "Translating...");
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data.responseData.translatedText);
      textTransform.textContent = data.responseData.translatedText;
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchAPI(apiUrl);
});

exchangeBtn.addEventListener("click", () => {
  console.log("clicked");
  let tempText = textSelect.value;
  let tempLan = languageTo.value;
  textSelect.value = textTransform.value;
  textTransform.value = tempText;

  languageTo.value = languageFrom.value;
  languageFrom.value = tempLan;
});

copyTextBefore.addEventListener("click", () => {
  textSelect.select();
  textSelect.setSelectionRange(0, 99999);
  document.execCommand("copy");
});

copyTextAfter.addEventListener("click", () => {
  textTransform.select();
  textTransform.setSelectionRange(0, 99999);
  document.execCommand("copy");
});

volumeBtnBefore.addEventListener("click", () => {
  let textToSpeak = textSelect.value;
  const translateFrom = languageFrom.value;
  if ("speechSynthesis" in window) {
    console.log("WORKING");
    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = 1;
    // speakData.rate = 1;
    // speakData.pitch = 2;
    speakData.text = textToSpeak;
    speakData.lang = translateFrom;

    speechSynthesis.speak(speakData);
  } else {
    console.log(" not great");
  }
});

volumeBtnAfter.addEventListener("click", () => {
  let textToSpeak = textTransform.value;
  const translateTo = languageTo.value;
  if ("speechSynthesis" in window) {
    let speakData = new SpeechSynthesisUtterance();
    // speakData.volume = 1;
    // speakData.rate = 1;
    // speakData.pitch = 2;
    speakData.text = textToSpeak;
    speakData.lang = translateTo;

    speechSynthesis.speak(speakData);
  } else {
    console.log(" not great");
  }
});
