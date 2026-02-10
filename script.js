// Quiz Data
const quizData = [
    {
        question: "How do you typically start your day?",
        answers: [
            { text: "Jump out of bed ready to conquer the world", type: "black" },
            { text: "Gentle wake-up with some stretching", type: "green" },
            { text: "Gradually ease into the morning", type: "oolong" },
            { text: "Take it slow and peaceful", type: "herbal" }
        ]
    },
    {
        question: "What's your preferred work style?",
        answers: [
            { text: "Fast-paced and high-energy", type: "black" },
            { text: "Focused and balanced", type: "green" },
            { text: "Flexible and adaptive", type: "oolong" },
            { text: "Calm and methodical", type: "herbal" }
        ]
    },
    {
        question: "How do you handle stress?",
        answers: [
            { text: "Power through with determination", type: "black" },
            { text: "Take a mindful break", type: "green" },
            { text: "Find a creative solution", type: "oolong" },
            { text: "Relax and let it pass", type: "herbal" }
        ]
    },
    {
        question: "What's your ideal evening?",
        answers: [
            { text: "Going out for an exciting activity", type: "black" },
            { text: "Reading or pursuing a hobby", type: "green" },
            { text: "Trying something new", type: "oolong" },
            { text: "Cozy night in with comfort activities", type: "herbal" }
        ]
    },
    {
        question: "Which flavor profile appeals to you most?",
        answers: [
            { text: "Bold and robust", type: "black" },
            { text: "Fresh and crisp", type: "green" },
            { text: "Complex and layered", type: "oolong" },
            { text: "Sweet and soothing", type: "herbal" }
        ]
    },
    {
        question: "How do you approach new challenges?",
        answers: [
            { text: "Head-on with confidence", type: "black" },
            { text: "With careful consideration", type: "green" },
            { text: "With curiosity and openness", type: "oolong" },
            { text: "At my own comfortable pace", type: "herbal" }
        ]
    },
    {
        question: "What's your energy level throughout the day?",
        answers: [
            { text: "High and consistent", type: "black" },
            { text: "Steady and balanced", type: "green" },
            { text: "Comes in waves", type: "oolong" },
            { text: "Low-key and relaxed", type: "herbal" }
        ]
    },
    {
        question: "Which of these describes your personality best?",
        answers: [
            { text: "Strong and assertive", type: "black" },
            { text: "Thoughtful and centered", type: "green" },
            { text: "Unique and sophisticated", type: "oolong" },
            { text: "Gentle and nurturing", type: "herbal" }
        ]
    }
];

// Tea Results Data
const teaResults = {
    black: {
        name: "Black Tea ☕",
        icon: "☕",
        description: "You're bold, energetic, and always ready to take on challenges! Like black tea, you have a strong presence and bring warmth and energy to every situation. You're the go-to person when things need to get done.",
        traits: [
            "High energy and driven",
            "Natural leader",
            "Confident and assertive",
            "Thrives in fast-paced environments"
        ]
    },
    green: {
        name: "Green Tea 🍃",
        icon: "🍃",
        description: "You're balanced, mindful, and health-conscious. Like green tea, you bring clarity and freshness to your surroundings. You value harmony and prefer a thoughtful approach to life's challenges.",
        traits: [
            "Balanced and centered",
            "Values wellness and mindfulness",
            "Clear-headed decision maker",
            "Brings calm to chaos"
        ]
    },
    oolong: {
        name: "Oolong Tea 🌸",
        icon: "🌸",
        description: "You're sophisticated, unique, and full of depth. Like oolong tea, you're a perfect blend of different qualities - neither too intense nor too mild. You appreciate complexity and nuance in life.",
        traits: [
            "Adaptable and versatile",
            "Appreciates life's subtleties",
            "Creative thinker",
            "Brings unique perspectives"
        ]
    },
    herbal: {
        name: "Herbal Tea 🌿",
        icon: "🌿",
        description: "You're calming, nurturing, and naturally soothing. Like herbal tea, you bring comfort and peace to those around you. You value tranquility and create a safe, warm atmosphere wherever you go.",
        traits: [
            "Calming presence",
            "Nurturing and supportive",
            "Values peace and comfort",
            "Great listener and friend"
        ]
    }
};

// Quiz State
let currentQuestion = 0;
let answers = [];

// Initialize Quiz
function startQuiz() {
    currentQuestion = 0;
    answers = [];
    showScreen('quiz-screen');
    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const question = quizData[currentQuestion];
    const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
    
    document.getElementById('progress-fill').style.width = progressPercentage + '%';
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.type);
        answersContainer.appendChild(button);
    });
}

// Handle Answer Selection
function selectAnswer(type) {
    answers.push(type);
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        setTimeout(() => {
            displayQuestion();
        }, 200);
    } else {
        setTimeout(() => {
            showResults();
        }, 200);
    }
}

// Calculate and Display Results
function showResults() {
    const tally = {
        black: 0,
        green: 0,
        oolong: 0,
        herbal: 0
    };
    
    // Count each tea type
    answers.forEach(answer => {
        tally[answer]++;
    });
    
    // Find the tea type with the highest count
    let winningTea = 'black';
    let maxCount = 0;
    let tiedTeas = [];
    
    for (const tea in tally) {
        if (tally[tea] > maxCount) {
            maxCount = tally[tea];
            winningTea = tea;
            tiedTeas = [tea];
        } else if (tally[tea] === maxCount) {
            tiedTeas.push(tea);
        }
    }
    
    // If there's a tie, select randomly among tied options
    if (tiedTeas.length > 1) {
        winningTea = tiedTeas[Math.floor(Math.random() * tiedTeas.length)];
    }
    
    // Display results
    const result = teaResults[winningTea];
    document.getElementById('tea-icon').textContent = result.icon;
    document.getElementById('tea-type').textContent = result.name;
    document.getElementById('tea-description').textContent = result.description;
    
    const traitsList = document.getElementById('tea-traits-list');
    traitsList.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsList.appendChild(li);
    });
    
    showScreen('results-screen');
}

// Screen Management
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Restart Quiz
function restartQuiz() {
    showScreen('welcome-screen');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome-screen');
});
