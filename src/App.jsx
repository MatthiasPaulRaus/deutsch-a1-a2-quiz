import { useState } from 'react'
import List from './List'
import Stufen from './Stufen'
import './App.css'
import {v4 as uuidv4} from 'uuid';
import {FaAngleLeft} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'


const App =()=> {
  const [selector, setSelector] = useState(true)

  const [QuestionsList, setQuestionsList]= useState(List[0][0])

  const [currentStufe, setCurrentStufe]= useState(0)

  const prev =()=> {
    setCurrentStufe(currentStufe === 0 ? Stufen.length -1 : currentStufe -1)
  }
  const next =()=> {
    setCurrentStufe(currentStufe === Stufen.length -1 ? 0 : currentStufe +1)
  }

  const actual =()=> {
    setSelector(false)
    if(currentStufe === 0){setQuestionsList(List[0][0])}
    if(currentStufe === 1){setQuestionsList(List[1][0])}
    if(currentStufe === 2){setQuestionsList(List[2][0])}
    if(currentStufe === 3){setQuestionsList(List[3][0])}
  }
  
  const [currentQuestion, setCurrentQuestion]= useState(0);
  const [score, setScore]= useState(0)
  const [clicked, setClicked] = useState(false);
  const [showScore, setShowScore]= useState(false);
  const [valid, setValid]= useState(false)
  const [nextButton, setNextButton]=useState(false)

  const handleCorrectAnswer = (isCorrect) => {
    if(isCorrect) {
      setScore(score + 1);
      setValid(true)
      
    }
    setNextButton(true)
    setClicked(true); 
  }

  const handleNextQuestion = () => {
    setClicked(false);
    setValid(false)
    setNextButton(false)
    if(currentQuestion < QuestionsList.length -1){
      setCurrentQuestion(currentQuestion +1)
    }
    else{
      setShowScore(true);
    }
  }

  const playAgain = ()=> {
    window.location.reload()
  }



  return (
  
  <div>
    {selector ? (
      <div className="wrapper2">

      <h2 className="completed">Deutsch-Quiz</h2>

      <div className="dotsList">
        {Stufen.map((stufen, index)=>(
          <button 
          key={index}
          className={currentStufe === index ? "dots dots-active":"dots"} 
          onClick={() => setCurrentStufe(index)}
          >
          {stufen.name}
          </button> 
        ))} 
      </div>
      
      <div className="slide">

        <button className="arrow"
        onClick={prev}><FaAngleLeft/>
        </button>
            
        <div className="next-button"
        onClick={actual}>
        <h2>Start</h2>
        </div> 
                
        <button className="arrow"
        onClick={next}><FaAngleRight/>
        </button> 

      </div>

      


      <div className="dotsList">
        {Array.from({length:4}).map((_, index)=>(
        <div key={index}
        className={currentStufe === index ? "dots dots-active":"dots"}
        onClick={() => setCurrentStufe(index)} 
        ></div>
        ))}
      </div>

      </div>

    ) : (

      <div>

      {showScore ?
       (
        <div className="wrapper2">

          <div className="completed">Ende!</div>

          <div className="score-section">
            Punkte: {score}/{QuestionsList.length}
          </div>

          <button className="repeat" 
          onClick={playAgain}>
          <FaAngleLeft/>
          </button>

        </div>

          ) : (
 
            <div className="wrapper1">

              <div className="question-section-wrapper">


              <div className="info">
                <div className="question-count">
                  {Stufen[currentStufe].name}
                </div>

                <div className="question-count">
                  {currentQuestion + 1} / {QuestionsList.length}
                </div>
              </div>
              
              <div className="question">
              {QuestionsList[currentQuestion].question}
              </div>

              <div className="answer-section-wrapper">

              {QuestionsList[currentQuestion].answersList.map((answerOption) => (
              <li className="answer-list" key={uuidv4()}>
                <button 
                disabled={clicked}
                className={`answer-button
                 ${clicked && answerOption.isCorrect ? "correct" : null}`}
                onClick={() => handleCorrectAnswer(answerOption.isCorrect)}
                >
                {answerOption.answer} 
                </button>
              </li>
              ))}
              
              </div> 
            
                {clicked && valid &&
                  <div className="richtig"
                >richtig</div>
                }

                {clicked && !valid &&
                  <div className="falsch"
                >falsch</div>
                }

                {nextButton && 
                <div>
                  <button className="next-button"
                    onClick={handleNextQuestion}
                    >
                    <FaAngleRight className="arrow"/>
                  </button> 
                </div>}
            
              </div>
           
          </div>
        )
       }
      </div>
     
    )}
         
  </div>)
}

export default App;