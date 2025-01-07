const categories = [
    {
        name: "Concert Tickets",
        questions: [
            { question: "Do you really want to see this concert?", answers: ["Yes", "No"] },
            { question: "Can you comfortably afford the ticket without straining your finances?", answers: ["Yes", "No"] },
            { question: "Does the concert fit within your schedule? (No major conflicts)", answers: ["Yes", "No"] }
        ]
    },
    {
        name: "Recording Gear",
        questions: [
            { question: "Do you have good enough gear right now?", answers: ["Yes", "No"] },
            { question: "Would this new gear significantly improve your recordings?", answers: ["Yes", "No"] },
            { question: "Can you comfortably afford this new gear without impacting your finances?", answers: ["Yes", "No"] }
        ]
    }
];

let currentCategory = null;
let answers = [];

const questionContainer = document.getElementById('question-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const returnButton = document.getElementById('return-button');

// Show category selection page
function showCategorySelection() {
    document.getElementById('category-container').style.display = "block";
    questionContainer.innerHTML = '';
    document.getElementById('navigation-buttons').style.display = "none";
    returnButton.style.display = "none";
}

// Select category (Concert Tickets or Recording Gear)
function selectCategory(categoryIndex) {
    currentCategory = categoryIndex;
    answers = []; // Reset answers
    document.getElementById('category-container').style.display = "none";
    showNextQuestion();
}

// Show current question
function showNextQuestion() {
    if (answers.length < categories[currentCategory].questions.length) {
        const question = categories[currentCategory].questions[answers.length];
        questionContainer.innerHTML = `
            <h2>${categories[currentCategory].name}</h2>
            <p>${question.question}</p>
            <button onclick="handleAnswer(0)">${question.answers[0]}</button>
            <button onclick="handleAnswer(1)">${question.answers[1]}</button>
        `;
        prevButton.style.display = answers.length > 0 ? "inline-block" : "none";
        nextButton.style.display = "none";  // Only show next button after answering
        returnButton.style.display = "inline-block"; // Always show return button
    } else {
        showFinalDecision();
    }
}

// Handle answer selection
function handleAnswer(answerIndex) {
    answers.push(answerIndex);
    showNextQuestion();
}

// Go to the previous question
function goToPrevious() {
    if (answers.length > 0) {
        answers.pop();
        showNextQuestion();
    }
}

// Show final decision
function showFinalDecision() {
    const category = categories[currentCategory];
    let message = '';

    if (currentCategory === 0) { // Concert Tickets
        if (answers[0] === 1) {
            message = "You don’t really want to see this concert. It’s better not to buy.";
        } else if (answers[1] === 1) {
            message = "You can’t afford it without stretching your finances. Reconsider.";
        } else if (answers[2] === 1) {
            message = "It conflicts with your schedule. Skip this one.";
        } else {
            message = "It’s a great decision! Go ahead and enjoy the concert!";
        }
    } else if (currentCategory === 1) { // Recording Gear
        if (answers[0] === 1 && answers[1] === 0 && answers[2] === 0) {
            message = "This new gear is a great upgrade. Go ahead and buy!";
        } else {
            message = "It’s better to reconsider. The new gear might not be necessary right now.";
        }
    }

    questionContainer.innerHTML = `
        <h2>Your Decision</h2>
        <p>${message}</p>
    `;

    prevButton.style.display = "none";
    nextButton.style.display = "none";
    returnButton.style.display = "inline-block"; // Always show return button on final decision
}

// Return to the start page
function returnToStart() {
    showCategorySelection();
    answers = [];
}
