import { useState } from 'react'
import Results from './results';

function Quiz() {

    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which language is used for web apps?",
            options: ["PHP", "Python", "JavaScript", "All"],
            answer: "All"
        },
        {
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML", 
                "Java Syntax Extension", 
                "Just a Simple example", 
                "None of the above"
            ],
            answer: "JavaScript XML"
        },
    ];

    const initialAnswer = [null, null, null];

    const [userAnswers, setUserAnswers] = useState(initialAnswer);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false)

    const seletedAnswer = userAnswers[currentQuestion];

    function handleSelectOption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);
    }

    function goToNext() {
        if (currentQuestion === questionBank.length - 1) {
            setIsQuizFinished(true)
        }else{
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
            
    }

    function restartQuiz() {
        setUserAnswers(initialAnswer);
        setCurrentQuestion(0);
        setIsQuizFinished(false)
    }

    if (isQuizFinished) {
        return <Results userAnswers={userAnswers} questionBank={questionBank} restartQuiz={restartQuiz} />
    }

    return (
        <div>
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question">{questionBank[currentQuestion].question} </p>

            {questionBank[currentQuestion].options.map((option) => (
                <button className={"option" + (seletedAnswer === option ? " selected" : "")} onClick={() => handleSelectOption(option)}>
                    {option}
                </button>
            ))}


            <div className="nav-buttons">
                <button onClick={goToPrev} disabled={currentQuestion === 0}>
                    Previous
                </button>
                <button onClick={goToNext} disabled={!seletedAnswer}>
                    {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Quiz;