"use strict";

let question = document.getElementById("question");
let button = document.querySelectorAll("button");
let progress = document.getElementById("progress");
let questionNumber = 0;
let resultNumber = 0;

let questions = [
  {
    text: "Kam naudingos morkos?",
    choices: ["Niekam", "Hitleriui", "Kepenims", "Odai"],
    answer: "Odai",
  },
  {
    text: "Kam naudingi obuoliai?",
    choices: ["Širdžiai", "Kojoms", "Delfinams", "Virškinimui"],
    answer: "Virškinimui",
  },
  {
    text: "Kokias ligas padeda gydyti agrastai?",
    choices: ["Cukrini diabetą", "Kepenų cirozę", "Nemiga", "Vėžį"],
    answer: "Cukrini diabetą",
  },
  {
    text: "Kokio vitamino gausu apelsinuose?",
    choices: ["Vitamino E", "Vitamino A", "Vitamino C", "Vitamino B"],
    answer: "Vitamino C",
  },
  {
    text: "Kokiais dalykais yra turtingi arbūzai?",
    choices: ["Vitaminais", "Mineralais", "Antioksidantais", "Visi teisingi"],
    answer: "Visi teisingi",
  },
];

// Uzkrauna klausima ir atsakyma
let populate = () => {
  for (let x of button) {
    x.classList.remove("selected");
    x.classList.remove("correct");
    x.classList.remove("incorrect");
    x.disabled = false;
  }
  if (questionNumber < questions.length) {
    question.innerText = questions[questionNumber].text;
    button.forEach((x, i) => {
      x.innerText = `${questions[questionNumber].choices[i]}`;
    });
  } else {
    // Uzkrauna rezultatus
    showResults();
  }
};

// Seka progresa
let showProgress = () => {
  questionNumber++;
  progress.style.color = "white";
  progress.innerText = questionNumber + 1;
};

// Skaiciuoja teisingus atsakymus
let check = (guess) => {
  setTimeout(function () {
    if (guess.innerText === questions[questionNumber].answer) {
      resultNumber++;
      guess.classList.add("correct");
      progress.style.color = "green";
    } else {
      guess.classList.add("incorrect");
      progress.style.color = "red";
    }
  }, 2000);
};

// Result page
let showResults = () => {
  let quiz = document.getElementById("quiz");
  if (resultNumber === 5) {
    quiz.innerHTML = `<h1>Result: <span>${resultNumber}</span></h1><img src="http://telegram.org.ru/uploads/posts/2017-03/1490201800_3.png">`;
    document.querySelector("h1 span").style.color = "green";
    document.querySelector("h1").classList.add("all-correct");
    document.querySelector("p").style.height = "auto";
  } else if (resultNumber === 0) {
    quiz.innerHTML = `<h1>Result: <span>${resultNumber}</span></h1><img src="https://media4.giphy.com/media/11kHpSmj3Oh8AM/giphy.gif?cid=790b7611034a6f78f9173e6fe64191fabe0b15a99fd51074&rid=giphy.gif&ct=g">`;
    document.querySelector("h1 span").style.color = "red";
    document.querySelector("h1").classList.add("all-incorrect");
    document.querySelector("p").style.height = "auto";
  } else {
    quiz.innerHTML = `<h1>Result: ${resultNumber}</h1><img src="https://pluspng.com/img-png/png-shrug-view-samegoogleiqdbsaucenao-shrug-png-328.png"><p>Gali ir geriau (ar blogiau ;))`;
    document.querySelector("h1").classList.add("mediocre");
    document.querySelector("p").style.border = "2px solid blue";
    document.querySelector("p").style.width = "400px";
    document.querySelector("p").style.margin = "70px auto";
    document.querySelector("p").style.padding = "15px";
    document.querySelector("p").style.fontSize = "1.5rem";
    document.querySelector("p").style.borderRadius = "8px";
  }
};

//Priskiria funkcija mygtukams
button.forEach((x) => {
  x.addEventListener("click", function () {
    this.classList.add("selected");
    for (let x of button) {
      x.disabled = true;
    }
    check(this);
    setTimeout(function () {
      //Rodo progresa
      showProgress();
      // Uzkrauna klausima ir atsakymus
      populate();
    }, 3000);
    //Skaiciuoja teisingus atsakymus
  });
});

// Pirmas uzkrovimas
populate();
