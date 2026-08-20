import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// FIREBASE
// ===============================

const firebaseConfig = {
    apiKey: "PASTE_YOUR_EXISTING_FIREBASE_API_KEY_HERE",
    authDomain: "friendquiz-bc420.firebaseapp.com",
    projectId: "friendquiz-bc420",
    storageBucket: "friendquiz-bc420.firebasestorage.app",
    messagingSenderId: "290019969759",
    appId: "1:290019969759:web:f0cfd0f7e06cd68360776a",
    measurementId: "G-SK8QLXY92M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===============================
// QUESTIONS
// ===============================

const questions = [

    {
        question: "Who is Rico's crush?",
        answers: [
            "Secret 🤫",
            "None",
            "Kristine",
            "Someone from another school"
        ],
        correct: 3
    },

    {
        question: "What are Rico's favorite colors?",
        answers: [
            "Ocean Blue & Blush Pink",
            "Black & White",
            "Red & Orange",
            "Purple & Green"
        ],
        correct: 0
    },

    {
        question: "What's Rico's favorite food?",
        answers: [
            "Adobo",
            "Bistek",
            "Sinigang",
            "Fried Chicken"
        ],
        correct: 1
    },

    {
        question: "Which social media does Rico use the most?",
        answers: [
            "Facebook & Snapchat",
            "TikTok & Instagram",
            "X & Facebook",
            "Snapchat & Instagram"
        ],
        correct: 1
    },

    {
        question: "How would Rico describe himself?",
        answers: [
            "Genuine, kind, and funny",
            "Quiet and serious",
            "Competitive and strict",
            "Shy and reserved"
        ],
        correct: 0
    },

    {
        question: "What is Rico currently getting into?",
        answers: [
            "Calisthenics & trying new things",
            "Swimming",
            "Skateboarding",
            "Volleyball"
        ],
        correct: 0
    },

    {
        question: "What career paths has Rico considered?",
        answers: [
            "Culinary / IT",
            "Law / Medicine",
            "Architecture / Engineering",
            "Business / Accounting"
        ],
        correct: 0
    },

    {
        question: "What does Rico enjoy doing?",
        answers: [
            "Playing guitar",
            "Collecting watches",
            "Photography",
            "Skateboarding"
        ],
        correct: 0
    },

    {
        question: "What sports is Rico into?",
        answers: [
            "Badminton & boxing",
            "Basketball & football",
            "Tennis & swimming",
            "Volleyball & football"
        ],
        correct: 0
    },

    {
        question: "What does Rico call himself?",
        answers: [
            "A jack of all trades",
            "A professional athlete",
            "A gamer",
            "A musician"
        ],
        correct: 0
    },

    {
        question: "What type of content does Rico want to make?",
        answers: [
            "Cooking & fitness",
            "Gaming only",
            "Travel vlogs",
            "Music covers only"
        ],
        correct: 0
    },

    {
        question: "What is Rico's nickname?",
        answers: [
            "Rocky",
            "Riko",
            "Rico",
            "Rick"
        ],
        correct: 2
    },

    {
        question: "What is Rico most likely to do when he's interested in something?",
        answers: [
            "Try it out",
            "Ignore it",
            "Wait for someone else to do it",
            "Give up immediately"
        ],
        correct: 0
    },

    {
        question: "When is Rico's birthday?",
        answers: [
            "June 30",
            "July 15",
            "June 18",
            "May 30"
        ],
        correct: 0
    },

    {
        question: "What career paths has Rico considered?",
        answers: [
            "Culinary / IT",
            "Medicine",
            "Law",
            "Architecture"
        ],
        correct: 0
    },

    {
        question: "What kind of person is Rico when it comes to his interests?",
        answers: [
            "He likes trying different things",
            "He sticks to only one hobby",
            "He doesn't really have hobbies",
            "He avoids learning new skills"
        ],
        correct: 0
    },

    {
        question: "What's Rico's favorite game?",
        answers: [
            "CODM",
            "Roblox",
            "Mobile Legends",
            "Minecraft"
        ],
        correct: 0
    },

    {
        question: "What country would Rico like to visit or possibly live in someday?",
        answers: [
            "Japan",
            "Canada 🇨🇦",
            "South Korea",
            "Australia"
        ],
        correct: 1
    },

    {
        question: "What is something Rico really wants to achieve someday?",
        answers: [
            "Become successful and financially stable",
            "Become famous in gaming",
            "Become a professional athlete",
            "Travel the world"
        ],
        correct: 0
    }

];


// ===============================
// GAME VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let playerName = "";
let answered = false;


// ===============================
// SCREEN CONTROL
// ===============================

function hideScreens() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

}


function goHome() {

    hideScreens();

    const home = document.getElementById("home");

    if (home) {
        home.classList.add("active");
    }

}


function showNameScreen() {

    hideScreens();

    const screen =
        document.getElementById("nameScreen");

    if (screen) {
        screen.classList.add("active");
    }

}


function showCreateScreen() {

    hideScreens();

    const screen =
        document.getElementById("createScreen");

    if (screen) {
        screen.classList.add("active");
    }

}


// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    const input =
        document.getElementById("playerName");

    if (!input) {
        alert("Player name input was not found.");
        return;
    }

    playerName =
        input.value.trim();

    if (playerName === "") {

        alert("Enter your name first!");

        return;
    }

    currentQuestion = 0;
    score = 0;

    hideScreens();

    const quizScreen =
        document.getElementById("quizScreen");

    if (quizScreen) {
        quizScreen.classList.add("active");
    }

    showQuestion();

}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    answered = false;

    const q =
        questions[currentQuestion];

    const questionNumber =
        document.getElementById("questionNumber");

    const scoreText =
        document.getElementById("scoreText");

    const question =
        document.getElementById("question");

    const progressBar =
        document.getElementById("progressBar");

    const answers =
        document.getElementById("answers");

    const nextButton =
        document.getElementById("nextButton");

    if (!q || !answers) {
        return;
    }

    if (questionNumber) {
        questionNumber.textContent =
            `Question ${currentQuestion + 1}/${questions.length}`;
    }

    if (scoreText) {
        scoreText.textContent =
            `Score: ${score}`;
    }

    if (question) {
        question.textContent =
            q.question;
    }

    if (progressBar) {
        progressBar.style.width =
            ((currentQuestion / questions.length) * 100) + "%";
    }

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            answer;

        button.addEventListener("click", () => {
            chooseAnswer(index, button);
        });

        answers.appendChild(button);

    });

    if (nextButton) {
        nextButton.disabled = true;
    }

}


// ===============================
// ANSWER
// ===============================

function chooseAnswer(index, button) {

    if (answered) {
        return;
    }

    answered = true;

    const q =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");

    if (index === q.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        if (buttons[q.correct]) {
            buttons[q.correct]
                .classList.add("correct");
        }

    }

    const scoreText =
        document.getElementById("scoreText");

    if (scoreText) {
        scoreText.textContent =
            `Score: ${score}`;
    }

    const nextButton =
        document.getElementById("nextButton");

    if (nextButton) {
        nextButton.disabled = false;
    }

}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

    } else {

        showQuestion();

    }

}


// ===============================
// FINISH QUIZ
// ===============================

async function finishQuiz() {

    hideScreens();

    const resultScreen =
        document.getElementById("resultScreen");

    if (resultScreen) {
        resultScreen.classList.add("active");
    }

    const finalScore =
        document.getElementById("finalScore");

    if (finalScore) {
        finalScore.textContent =
            score;
    }

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );

    const percentageElement =
        document.getElementById("percentage");

    if (percentageElement) {
        percentageElement.textContent =
            `You got ${percentage}% correct.`;
    }


    let title;
    let message;
    let emoji;


    if (score <= 4) {

        title = "Who are you? 😭";
        message = "Bro barely knows Rico.";
        emoji = "🐚";

    } else if (score <= 8) {

        title = "Not bad.";
        message = "You know some stuff about Rico.";
        emoji = "🐟";

    } else if (score <= 12) {

        title = "Pretty solid.";
        message = "Okay, you actually know Rico.";
        emoji = "🐠";

    } else if (score <= 16) {

        title = "Rico Expert";
        message = "You know way too much about Rico.";
        emoji = "🦈";

    } else {

        title = "RICO WIKI";
        message = "Bro knows everything. 💀";
        emoji = "👑";

    }


    const resultTitle =
        document.getElementById("resultTitle");

    const resultMessage =
        document.getElementById("resultMessage");

    const resultEmoji =
        document.getElementById("resultEmoji");


    if (resultTitle) {
        resultTitle.textContent =
            title;
    }

    if (resultMessage) {
        resultMessage.textContent =
            message;
    }

    if (resultEmoji) {
        resultEmoji.textContent =
            emoji;
    }


    // SAVE TO FIRESTORE

    try {

        await addDoc(
            collection(db, "scores"),
            {
                name: playerName,
                score: score,
                total: questions.length,
                percentage: percentage,
                createdAt: new Date().toISOString()
            }
        );

        console.log("Score saved to Firebase!");

    } catch (error) {

        console.error(
            "Could not save score:",
            error
        );

    }

}


// ===============================
// LEADERBOARD
// ===============================

async function showLeaderboard() {

    hideScreens();

    const leaderboardScreen =
        document.getElementById("leaderboardScreen");

    if (leaderboardScreen) {
        leaderboardScreen.classList.add("active");
    }

    const list =
        document.getElementById("leaderboardList");

    if (!list) {
        return;
    }

    list.innerHTML =
        "<p>Loading leaderboard...</p>";


    try {

        const scoresRef =
            collection(db, "scores");

        const scoresQuery =
            query(
                scoresRef,
                orderBy("score", "desc"),
                limit(50)
            );

        const snapshot =
            await getDocs(scoresQuery);


        if (snapshot.empty) {

            list.innerHTML =
                "<p>No scores yet.</p>";

            return;
        }


        list.innerHTML = "";


        let rank = 1;


        snapshot.forEach(doc => {

            const player =
                doc.data();

            const row =
                document.createElement("div");

            row.className =
                "leader";


            row.innerHTML = `
                <span class="rank">
                    #${rank} ${escapeHTML(player.name)}
                </span>

                <strong>
                    ${player.score}/${player.total || questions.length}
                </strong>
            `;


            list.appendChild(row);

            rank++;

        });


    } catch (error) {

        console.error(
            "Leaderboard error:",
            error
        );

        list.innerHTML =
            "<p>Couldn't load leaderboard.</p>";

    }

}


// ===============================
// SAFE HTML
// ===============================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ===============================
// CREATE QUIZ
// ===============================

function addQuestion() {

    const builder =
        document.getElementById("questionBuilder");

    if (!builder) {
        return;
    }


    const card =
        document.createElement("div");

    card.className =
        "builder-card";


    card.innerHTML = `

        <input
            type="text"
            class="new-question"
            placeholder="Question..."
        >

        <input
            type="text"
            class="new-answer"
            placeholder="Answer A"
        >

        <input
            type="text"
            class="new-answer"
            placeholder="Answer B"
        >

        <input
            type="text"
            class="new-answer"
            placeholder="Answer C"
        >

        <input
            type="text"
            class="new-answer"
            placeholder="Answer D"
        >

        <select class="correct-answer">

            <option value="0">
                Correct: A
            </option>

            <option value="1">
                Correct: B
            </option>

            <option value="2">
                Correct: C
            </option>

            <option value="3">
                Correct: D
            </option>

        </select>

    `;


    builder.appendChild(card);

}


// ===============================
// CREATE QUIZ
// ===============================

async function createQuiz() {

    const titleInput =
        document.getElementById("quizTitle");

    const cards =
        document.querySelectorAll(".builder-card");


    if (!titleInput) {
        return;
    }


    const title =
        titleInput.value.trim();


    if (title === "") {

        alert("Give your quiz a title!");

        return;
    }


    if (cards.length === 0) {

        alert("Add at least one question!");

        return;
    }


    const newQuestions = [];


    cards.forEach(card => {

        const questionInput =
            card.querySelector(".new-question");

        const answerInputs =
            card.querySelectorAll(".new-answer");

        const correctInput =
            card.querySelector(".correct-answer");


        const question =
            questionInput.value.trim();


        const answers =
            Array.from(answerInputs)
                .map(input => input.value.trim());


        const correct =
            Number(correctInput.value);


        if (
            question !== "" &&
            answers.every(answer => answer !== "")
        ) {

            newQuestions.push({
                question: question,
                answers: answers,
                correct: correct
            });

        }

    });


    if (newQuestions.length === 0) {

        alert("Fill in at least one complete question!");

        return;
    }


    try {

        await addDoc(
            collection(db, "quizzes"),
            {
                title: title,
                questions: newQuestions,
                createdAt: new Date().toISOString()
            }
        );


        alert(
            "Quiz created! 🌊\n\n" +
            "Your quiz has been saved!"
        );


        titleInput.value = "";


        const builder =
            document.getElementById("questionBuilder");

        if (builder) {
            builder.innerHTML = "";
        }


    } catch (error) {

        console.error(
            "Create quiz error:",
            error
        );

        alert(
            "Couldn't save the quiz.\n\n" +
            "Check your Firebase Firestore rules."
        );

    }

}


// ===============================
// MAKE BUTTON FUNCTIONS GLOBAL
// ===============================

window.goHome = goHome;
window.showNameScreen = showNameScreen;
window.showCreateScreen = showCreateScreen;
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.showLeaderboard = showLeaderboard;
window.addQuestion = addQuestion;
window.createQuiz = createQuiz;


// ===============================
// START
// ===============================

console.log("🌊 FriendQuiz loaded successfully!");
