import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './Components/FlashcardList';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  const categoryEl = useRef()

  useEffect(() => {
    axios 
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      console.log(res.data)
    })
  }, [])

  useEffect(() => {
    axios
    .get('https://opentdb.com/api.php?amount=25&category=18&difficulty=easy')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), answer
        ]
        return {
          id: `${index} -${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
    }))
  })
  }, [])

  function decodeString(string){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = string;
    return textArea.value
  }

  function handleSubmit(e){
    e.preventDefault()
  }
  return (
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
      );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is the proper way to create a link element?",
    answer: "<link />",
    options: [
      "<link>",
      "lanky",
      "</link>",
      "<link />"
    ]
  },
  
  {
    id: 2,
    question: "If I had an id set to header, what is the create way to reference it in my index.css?",
    answer: "#header",
    options: [
      ".header",
      "#Header",
      "#header",
      "header"
    ]
  },

  {
    id: 3,
    question: "What is the correct way to change the color of my text to red?",
    answer:"color: red",
    options: [
      "color: red",
      "color; red",
      "color: red;",
      "text-color: red;"
    ]
  }
]

export default App;
