// ======================================================
// QUIZFORFRIENDS - FULL SCRIPT.JS
// ======================================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    limit
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================================================
// FIREBASE
// ======================================================

const firebaseConfig = {

    apiKey: "AIzaSyDQJTStzsNkirI3lNX3SVwrR08xvZXdJr8",

    authDomain:
        "friendquiz-bc420.firebaseapp.com",

    projectId:
        "friendquiz-bc420",

    storageBucket:
        "friendquiz-bc420.firebasestorage.app",

    messagingSenderId:
        "290019969759",

    appId:
        "1:290019969759:web:f0cfd0f7e06cd68360776a",

    measurementId:
        "G-SK8QLXY92M"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("🌊 QuizForFriends loaded successfully!");


// ======================================================
// RICO QUIZ
// ======================================================

const ricoQuestions = [

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
        question:
            "What country would Rico like to visit or possibly live in someday?",

        answers: [
            "Japan",
            "Canada 🇨🇦",
            "South Korea",
            "Australia"
        ],

        correct: 1
    },

    {
        question:
            "What is something Rico really wants to achieve someday?",

        answers: [
            "Become successful and financially stable",
            "Become famous in gaming",
            "Become a professional athlete",
            "Travel the world"
        ],

        correct: 0
    }

];


// ======================================================
// GAME VARIABLES
// ======================================================

let currentQuestions = ricoQuestions;

let currentQuestion = 0;

let score = 0;

let playerName = "";

let currentQuizId = "rico";

let currentQuizTitle = "Rico Quiz";

let answered = false;


// ======================================================
// SCREEN SYSTEM
// ======================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(id);


    if (screen) {

        screen.classList.add("active");

    } else {

        console.error(
            "Screen not found:",
            id
        );

    }

}


// ======================================================
// HOME
// ======================================================

function goHome() {

    showScreen("home");

}


// ======================================================
// NAME SCREEN
// ======================================================

function askPlayerName() {

    const input =
        document.getElementById("playerName");


    if (!input) {

        alert(
            "Player name input not found."
        );

        return;

    }


    input.value = "";

    showScreen("nameScreen");

}


// ======================================================
// START RICO QUIZ
// ======================================================

function startRicoQuiz() {

    const input =
        document.getElementById("playerName");


    if (!input) {

        alert(
            "Name input not found."
        );

        return;

    }


    const name =
        input.value.trim();


    if (!name) {

        alert(
            "Enter your name first!"
        );

        return;

    }


    playerName = name;

    currentQuestions = ricoQuestions;

    currentQuizId = "rico";

    currentQuizTitle = "Rico Quiz";

    currentQuestion = 0;

    score = 0;

    startGame();

}


// ======================================================
// START GAME
// ======================================================

function startGame() {

    showScreen("quizScreen");

    showQuestion();

}


// ======================================================
// SHOW QUESTION
// ======================================================

function showQuestion() {

    answered = false;


    const q =
        currentQuestions[currentQuestion];


    if (!q) {

        console.error(
            "Question not found."
        );

        return;

    }


    const titleDisplay =
        document.getElementById(
            "quizTitleDisplay"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const scoreText =
        document.getElementById(
            "scoreText"
        );


    const question =
        document.getElementById(
            "question"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const answers =
        document.getElementById(
            "answers"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (titleDisplay) {

        titleDisplay.textContent =
            currentQuizTitle;

    }


    if (questionNumber) {

        questionNumber.textContent =
            `Question ${currentQuestion + 1}/${currentQuestions.length}`;

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

        const percentage =
            (
                (currentQuestion + 1) /
                currentQuestions.length
            ) * 100;


        progressBar.style.width =
            `${percentage}%`;

    }


    if (!answers) {

        console.error(
            "Answers container not found."
        );

        return;

    }


    answers.innerHTML = "";


    q.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-btn";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    chooseAnswer(
                        index,
                        button
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );


    if (nextButton) {

        nextButton.disabled =
            true;

    }

}


// ======================================================
// CHOOSE ANSWER
// ======================================================

function chooseAnswer(
    index,
    button
) {

    if (answered) {

        return;

    }


    answered = true;


    const q =
        currentQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    if (index === q.correct) {

        button.classList.add(
            "correct"
        );

        score++;

    } else {

        button.classList.add(
            "wrong"
        );


        if (buttons[q.correct]) {

            buttons[
                q.correct
            ].classList.add(
                "correct"
            );

        }

    }


    const scoreText =
        document.getElementById(
            "scoreText"
        );


    if (scoreText) {

        scoreText.textContent =
            `Score: ${score}`;

    }


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (nextButton) {

        nextButton.disabled =
            false;

    }

}


// ======================================================
// NEXT QUESTION
// ======================================================

function nextQuestion() {

    if (!answered) {

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        currentQuestions.length
    ) {

        finishQuiz();

    } else {

        showQuestion();

    }

}


// ======================================================
// FINISH QUIZ
// ======================================================

async function finishQuiz() {

    showScreen(
        "resultScreen"
    );


    const total =
        currentQuestions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    const finalScore =
        document.getElementById(
            "finalScore"
        );


    const finalTotal =
        document.getElementById(
            "finalTotal"
        );


    const percentageElement =
        document.getElementById(
            "percentage"
        );


    const resultTitle =
        document.getElementById(
            "resultTitle"
        );


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    const resultEmoji =
        document.getElementById(
            "resultEmoji"
        );


    if (finalScore) {

        finalScore.textContent =
            score;

    }


    if (finalTotal) {

        finalTotal.textContent =
            `/${total}`;

    }


    if (percentageElement) {

        percentageElement.textContent =
            `${percentage}% correct`;

    }


    if (percentage >= 90) {

        if (resultEmoji)
            resultEmoji.textContent =
                "👑";


        if (resultTitle)
            resultTitle.textContent =
                "LEGENDARY!";


        if (resultMessage)
            resultMessage.textContent =
                "Bro absolutely destroyed the quiz.";

    }

    else if (percentage >= 70) {

        if (resultEmoji)
            resultEmoji.textContent =
                "🦈";


        if (resultTitle)
            resultTitle.textContent =
                "Great job!";


        if (resultMessage)
            resultMessage.textContent =
                "You really know your stuff.";

    }

    else if (percentage >= 50) {

        if (resultEmoji)
            resultEmoji.textContent =
                "🐠";


        if (resultTitle)
            resultTitle.textContent =
                "Not bad!";


        if (resultMessage)
            resultMessage.textContent =
                "You know some things.";

    }

    else {

        if (resultEmoji)
            resultEmoji.textContent =
                "🐚";


        if (resultTitle)
            resultTitle.textContent =
                "Bro 😭";


        if (resultMessage)
            resultMessage.textContent =
                "You need to study your friend.";

    }


    // ==================================================
    // SAVE SCORE
    // ==================================================

    try {

        await addDoc(
            collection(
                db,
                "scores"
            ),
            {

                quizId:
                    currentQuizId,

                quizTitle:
                    currentQuizTitle,

                name:
                    playerName,

                score:
                    score,

                total:
                    total,

                percentage:
                    percentage,

                createdAt:
                    new Date().toISOString()

            }
        );


        console.log(
            "✅ Score saved!"
        );


    } catch (error) {

        console.error(
            "❌ Score save error:",
            error
        );

    }

}


// ======================================================
// COMMUNITY QUIZZES
// ======================================================

async function showCommunity() {

    showScreen(
        "communityScreen"
    );


    const list =
        document.getElementById(
            "quizList"
        );


    if (!list) {

        console.error(
            "quizList not found."
        );

        return;

    }


    list.innerHTML =
        "<p>Loading quizzes...</p>";


    try {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "quizzes"
                )
            );


        if (snapshot.empty) {

            list.innerHTML =
                "<p>No community quizzes yet.</p>";

            return;

        }


        list.innerHTML = "";


        snapshot.forEach(
            item => {

                const quiz =
                    item.data();


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "community-card";


                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    quiz.title ||
                    "Untitled Quiz";


                const creator =
                    document.createElement(
                        "p"
                    );


                creator.textContent =
                    `Created by ${quiz.creator || "Anonymous"}`;


                const count =
                    document.createElement(
                        "p"
                    );


                count.textContent =
                    `${quiz.questions?.length || 0} questions`;


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "main-btn";


                button.textContent =
                    "🎮 PLAY QUIZ";


                button.addEventListener(
                    "click",
                    function () {

                        playCommunityQuiz(
                            item.id,
                            quiz
                        );

                    }
                );


                card.appendChild(
                    title
                );


                card.appendChild(
                    creator
                );


                card.appendChild(
                    count
                );


                card.appendChild(
                    button
                );


                list.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Community error:",
            error
        );


        list.innerHTML =
            "<p>Couldn't load community quizzes.</p>";

    }

}


// ======================================================
// PLAY COMMUNITY QUIZ
// ======================================================

function playCommunityQuiz(
    id,
    quiz
) {

    const name =
        prompt(
            "Enter your name:"
        );


    if (
        !name ||
        !name.trim()
    ) {

        return;

    }


    if (
        !quiz.questions ||
        !Array.isArray(
            quiz.questions
        ) ||
        quiz.questions.length === 0
    ) {

        alert(
            "This quiz has no questions."
        );

        return;

    }


    playerName =
        name.trim();


    currentQuizId =
        id;


    currentQuizTitle =
        quiz.title ||
        "Friend Quiz";


    currentQuestions =
        quiz.questions;


    currentQuestion =
        0;


    score =
        0;


    startGame();

}


// ======================================================
// CREATE QUIZ - ADD QUESTION
// ======================================================

function addQuestion() {

    const builder =
        document.getElementById(
            "questionBuilder"
        );


    if (!builder) {

        alert(
            "Question builder not found."
        );

        return;

    }


    const card =
        document.createElement(
            "div"
        );


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


    builder.appendChild(
        card
    );

}


// ======================================================
// CREATE QUIZ
// ======================================================

async function createQuiz() {

    const titleInput =
        document.getElementById(
            "quizTitle"
        );


    const creatorInput =
        document.getElementById(
            "quizCreator"
        );


           if (
        !titleInput ||
        !creatorInput
    ) {

        alert(
            "Quiz title or creator input not found."
        );

        return;

    }


    const title =
        titleInput.value.trim();


    const creator =
        creatorInput.value.trim();


    if (!title) {

        alert(
            "Enter a quiz title!"
        );

        return;

    }


    if (!creator) {

        alert(
            "Enter your name!"
        );

        return;

    }


    // ==================================================
    // GET ALL QUESTION CARDS
    // ==================================================

    const cards =
        document.querySelectorAll(
            ".builder-card"
        );


    const newQuestions = [];


    cards.forEach(
        card => {

            const questionInput =
                card.querySelector(
                    ".new-question"
                );


            const answerInputs =
                card.querySelectorAll(
                    ".new-answer"
                );


            const correctInput =
                card.querySelector(
                    ".correct-answer"
                );


            if (
                !questionInput ||
                !correctInput ||
                answerInputs.length !== 4
            ) {

                return;

            }


            const question =
                questionInput.value.trim();


            const answers =
                Array.from(
                    answerInputs
                ).map(
                    input =>
                        input.value.trim()
                );


            const correct =
                Number(
                    correctInput.value
                );


            if (
                question &&
                answers.every(
                    answer => answer.length > 0
                )
            ) {

                newQuestions.push({

                    question:
                        question,

                    answers:
                        answers,

                    correct:
                        correct

                });

            }

        }
    );


    // ==================================================
    // CHECK QUESTIONS
    // ==================================================

    if (
        newQuestions.length === 0
    ) {

        alert(
            "Fill in at least one complete question!"
        );

        return;

    }


    // ==================================================
    // SAVE QUIZ TO FIRESTORE
    // ==================================================

    try {

        console.log(
            "Creating quiz..."
        );


        const quizRef =
            await addDoc(
                collection(
                    db,
                    "quizzes"
                ),
                {

                    title:
                        title,

                    creator:
                        creator,

                    questions:
                        newQuestions,

                    createdAt:
                        new Date().toISOString()

                }
            );


        console.log(
            "✅ Quiz created:",
            quizRef.id
        );


        // ==================================================
        // CREATE SHARE LINK
        // ==================================================

        const shareLink =
            `${window.location.origin}${window.location.pathname}?quiz=${quizRef.id}`;


        const shareInput =
            document.getElementById(
                "shareLink"
            );


        if (shareInput) {

            shareInput.value =
                shareLink;

        }


        showScreen(
            "successScreen"
        );


    } catch (error) {

        console.error(
            "❌ CREATE QUIZ ERROR:",
            error
        );


        alert(
            "Couldn't create the quiz.\n\n" +
            error.message
        );

    }

}


// ======================================================
// COPY SHARE LINK
// ======================================================

async function copyShareLink() {

    const input =
        document.getElementById(
            "shareLink"
        );


    if (!input) {

        alert(
            "Share link not found."
        );

        return;

    }


    const link =
        input.value;


    if (!link) {

        alert(
            "There is no share link yet."
        );

        return;

    }


    try {

        await navigator.clipboard.writeText(
            link
        );


        alert(
            "✅ Quiz link copied!"
        );


    } catch (error) {

        input.select();

        document.execCommand(
            "copy"
        );


        alert(
            "✅ Quiz link copied!"
        );

    }

}


// ======================================================
// OPEN SHARED QUIZ
// ======================================================

async function checkSharedQuiz() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const quizId =
        params.get(
            "quiz"
        );


    if (!quizId) {

        return;

    }


    console.log(
        "🔗 Shared quiz:",
        quizId
    );


    try {

        const quizRef =
            doc(
                db,
                "quizzes",
                quizId
            );


        const quizSnapshot =
            await getDoc(
                quizRef
            );


        if (
            !quizSnapshot.exists()
        ) {

            alert(
                "❌ Quiz not found!"
            );

            return;

        }


        const quiz =
            quizSnapshot.data();


        if (
            !quiz.questions ||
            !Array.isArray(
                quiz.questions
            ) ||
            quiz.questions.length === 0
        ) {

            alert(
                "This quiz has no questions."
            );

            return;

        }


        const name =
            prompt(
                `You're about to play "${quiz.title}".\n\nEnter your name:`
            );


        if (
            !name ||
            !name.trim()
        ) {

            return;

        }


        playerName =
            name.trim();


        currentQuizId =
            quizId;


        currentQuizTitle =
            quiz.title ||
            "Friend Quiz";


        currentQuestions =
            quiz.questions;


        currentQuestion =
            0;


        score =
            0;


        startGame();


    } catch (error) {

        console.error(
            "❌ Shared quiz error:",
            error
        );


        alert(
            "Couldn't open this quiz.\n\n" +
            error.message
        );

    }

}


// ======================================================
// LEADERBOARD
// ======================================================

async function showLeaderboard() {

    showScreen(
        "leaderboardScreen"
    );


    const list =
        document.getElementById(
            "leaderboardList"
        );


    if (!list) {

        console.error(
            "leaderboardList not found."
        );

        return;

    }


    list.innerHTML =
        "<p>Loading leaderboard...</p>";


    try {

        const scoresRef =
            collection(
                db,
                "scores"
            );


        const scoreQuery =
            query(
                scoresRef,
                orderBy(
                    "score",
                    "desc"
                ),
                limit(50)
            );


        const snapshot =
            await getDocs(
                scoreQuery
            );


        list.innerHTML = "";


        let rank =
            1;


        let found =
            false;


        snapshot.forEach(
            item => {

                const data =
                    item.data();


                // Only show scores
                // for current quiz

                if (
                    data.quizId !==
                    currentQuizId
                ) {

                    return;

                }


                found =
                    true;


                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "leader";


                row.innerHTML = `

                    <span>
                        #${rank}
                        ${escapeHTML(
                            data.name ||
                            "Anonymous"
                        )}
                    </span>

                    <strong>
                        ${data.score}/${data.total}
                    </strong>

                `;


                list.appendChild(
                    row
                );


                rank++;

            }
        );


        if (!found) {

            list.innerHTML = `

                <p>
                    No scores yet for
                    <strong>
                        ${escapeHTML(
                            currentQuizTitle
                        )}
                    </strong>.
                </p>

            `;

        }


    } catch (error) {

        console.error(
            "❌ Leaderboard error:",
            error
        );


        list.innerHTML = `

            <p>
                Couldn't load leaderboard.
            </p>

        `;

    }

}


// ======================================================
// SIMPLE HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


// ======================================================
// RESET CREATE QUIZ FORM
// ======================================================

function showCreateScreen() {

    showScreen(
        "createScreen"
    );

}


// ======================================================
// INITIALIZE APP
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "🌊 DOM loaded!"
        );


        // IMPORTANT:
        // Your HTML uses onclick="..."
        // so module functions MUST be
        // attached to window.

        window.showScreen =
            showScreen;

        window.goHome =
            goHome;

        window.askPlayerName =
            askPlayerName;

        window.showNameScreen =
            askPlayerName;

        window.startRicoQuiz =
            startRicoQuiz;

        window.startGame =
            startGame;

        window.nextQuestion =
            nextQuestion;

        window.showCommunity =
            showCommunity;

        window.playCommunityQuiz =
            playCommunityQuiz;

        window.addQuestion =
            addQuestion;

        window.createQuiz =
            createQuiz;

        window.showCreateScreen =
            showCreateScreen;

        window.showLeaderboard =
            showLeaderboard;

        window.copyShareLink =
            copyShareLink;


        // Check if someone opened
        // a friend's shared quiz link.

        checkSharedQuiz();

    }
);


// ======================================================
// ALSO EXPOSE FUNCTIONS IMMEDIATELY
// ======================================================
// This makes the buttons work even if
// Acode loads the module slightly differently.

window.showScreen =
    showScreen;

window.goHome =
    goHome;

window.askPlayerName =
    askPlayerName;

window.showNameScreen =
    askPlayerName;

window.startRicoQuiz =
    startRicoQuiz;

window.startGame =
    startGame;

window.nextQuestion =
    nextQuestion;

window.showCommunity =
    showCommunity;

window.playCommunityQuiz =
    playCommunityQuiz;

window.addQuestion =
    addQuestion;

window.createQuiz =
    createQuiz;

window.showCreateScreen =
    showCreateScreen;

window.showLeaderboard =
    showLeaderboard;

window.copyShareLink =
    copyShareLink;


console.log(
    "✅ ALL BUTTON FUNCTIONS CONNECTED!"
);
