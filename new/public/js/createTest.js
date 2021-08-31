import { Placeholder } from "../../components/content/placeholder.js";
import { QuestionCard } from "../../components/content/question-card.js";
import { calculateScore } from "./result.js";
import { showResults } from "./showResults.js";

let questionList = document.getElementById("question-list");
let quizNameText = document.querySelector(".quiz-name-text");
let questionCount = document.getElementById("question-count");
let quizData = [];

fetch("http://localhost:3000/quizzes")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // luu data vao 1 array
    quizData = data;

    // Ten quiz va so luong cau hoi
    quizNameText.innerText = data.html[0].questionTitle;
    questionCount.innerText = data.html.length;

    // Tao so cau hoi
    for (let i = 0; i < data.html.length; i++) {
      const question = new QuestionCard();
      questionList.appendChild(question.render());
    }
  })
  .then(() => {
    // Set placeholder (loading)
    let queryText = document.querySelectorAll(".query-text");
    queryText.forEach((element) => {
      const placeholder = new Placeholder();
      element.appendChild(placeholder.render());
    });
  })
  .then(() => {
    // Render cau hoi
    let queryText = document.querySelectorAll(".query-text");
    queryText.forEach((element, index) => {
      element.innerHTML = quizData.html[index].quiz;
    });

    let questionNum = document.querySelectorAll(".question-num");
    questionNum.forEach((element, index) => {
      element.innerHTML += quizData.html[index].quizNumber;
    });

    // Render 4 dap an
    let questionOptions = document.querySelectorAll(".question-options");
    questionOptions.forEach((element, index) => {
      // element : container boc 4 dap an

      element.childNodes.forEach((answer, answerIndex) => {
        // answer : div boc dap an A, B, C hoac D
        answer.firstChild.setAttribute("name", quizData.html[index].quizNumber);

        // Tinh diem dung sai
        answer.firstChild.addEventListener("click", () => {
          if (
            answer.lastChild.innerText[0] == quizData.html[index].rightAnswer
          ) {
            element.dataset.point = 1;
            console.log(element);
          } else {
            element.dataset.point = 0;
            console.log(element);
          }
        });

        answer.lastChild.innerHTML = quizData.html[index].answers[answerIndex];
      });
    });
  })
  .then(() => {
    calculateScore();
    showResults();
  })
  .catch((error) => {
    console.log(error);
  });

export { quizData };
