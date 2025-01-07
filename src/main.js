const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// 隠れた単語を表示
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map((letter) => {
      return `<span class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</span>`;
    })
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// 間違えた文字を配列に追加
function updateWrongLetterEl() {
  // 間違えた文字を表示
  wrongLettersEl.innerHTML = `${
    wrongLetters.length > 0 ? "<p>Wrong</p>" : ""
  } ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // パーツを表示
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // ゲームに負けたか確認
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

// 通知を表示
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// キーボードで文字を入力
window.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();

  if (letter >= "a" && letter <= "z") {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// ゲームをリスタート
playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display = "none";
});

displayWord();
