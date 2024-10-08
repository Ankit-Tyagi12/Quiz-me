const quizForm = document.getElementById('quiz-form');
const feedback = document.getElementById('feedback');
const questions = [
    {
        question1: "What is the capital of France?",
        correctAnswer: "option1",
        options: [
            "Paris",
            "London",
            "Berlin",
            "Rome"
        ]
    },
    {
        question2: "What is 2 + 2?",
        correctAnswer: "option3",
        options: [
            "3",
            "4",
            "5",
            "6"
        ]
    }
];

let currentQuestion = 2;

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.createElement('div');
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = 'option' + (index + 1);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });
    
    quizForm.innerHTML = '';
    quizForm.appendChild(optionsContainer);
}

function showFeedback(message, correct) {
    feedback.textContent = message;
    feedback.style.color = correct ? 'green' : 'red';
}

function onSubmit(event) {
    event.preventDefault();
    
    const selectedAnswer = document.querySelector('input[name="answer"]:checked'); 
    
    if (!selectedAnswer) {
        showFeedback("Please select an answer.", false);
        return;
    }
    
    const correctAnswer = questions[currentQuestion].correctAnswer;
    
    if (selectedAnswer.value === correctAnswer) {
        showFeedback("Correct!", true);
    } else {
        showFeedback("Incorrect!", false);
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000); // Load next question after 2 seconds
    } else {
        setTimeout(() => {
            quizForm.style.display = 'none';
            feedback.textContent = 'Quiz Completed!';
        }, 2000);
    }
}

quizForm.addEventListener('submit', onSubmit);

// Load first question
loadQuestion();