import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const[height, setHeight] = useState('initial')

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().frontHeight
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.math(frontHeight, backHeight, 100))
  }

  return (
    <div
    className={`card ${flip ? 'flip' : ''}`} 
    onClick={() => setFlip(!flip)}>

      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}
