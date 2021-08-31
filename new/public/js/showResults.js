import { quizData } from "./createTest.js";

function showResults() {
    let showAnswersBtn = document.querySelector('.show-answers-btn');
    showAnswersBtn.addEventListener('click', () => {
        const answerList = [];
        quizData.html.forEach(element => {
            answerList.push(element.rightAnswer);
        });
        if (document.getElementById('submit-score').hidden == false) {

            // Hien thong bao 
            Swal.fire({
                icon: 'warning',
                title: 'Thông báo',
                text: 'Bạn phải submit!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })


            if (showAnswersBtn.dataset.temp) {
                showAnswersBtn.removeAttribute('data-temp');
                showAnswersBtn.lastElementChild.innerText = 'SHOW ANSWERS';

            } else {
                showAnswersBtn.dataset.temp = 'shown';
                showAnswersBtn.lastElementChild.innerText = 'HIDE ANSWERS';
                let questionOptions = document.querySelectorAll('.question-options');
                questionOptions.forEach((element, index) => {
                    const answersContainer = element.querySelectorAll('.form-check-label');
                    console.log(answersContainer);
                    // if (answersContainer.lastElementChild.innerText[0] == answerList[index]) {
                    //     answersContainer.lastElementChild.style.color = 'green';
                    // }
                });
            }
        } else {
            if (showAnswersBtn.innerText == 'SHOW ANSWERS') {
                let questionOptions = document.querySelectorAll('.question-options');
                console.log(questionOptions)
            }
        }
    })
}

export { showResults };









