import React,{useState, useEffect, useRef, createRef, useMemo, useContext} from 'react'
import { useTestMode } from '../Context/TextModeContext';
import { generate, count } from "random-words";
import UpperMenu from './UpperMenu';
import Stats from './Stats';

function TypingBox() {
    const {testTime} = useTestMode();
    const [countDown, setCountDown] = useState(testTime)
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [wordsArray, setWordsArray] = useState(()=>generate(50));
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [inCorrectChars, setInCorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [graphData, setGraphData] = useState([]);

    const inputRef = useRef(null);
    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    },[wordsArray])

    const startTimer = ()=>{
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId)

        function timer() {
            setCountDown((latestCountDown)=>{

                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData, [
                            testTime-latestCountDown+1,
                            (correctChars/5)/((testTime-latestCountDown+1)/60)
                        ]]
                    })

                    return correctChars;
                })

                if(latestCountDown === 1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return latestCountDown - 1;
            })
        } 
    }

    const resetTest = ()=>{
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(generate(50));
        resetWordSpanRef();
        focusInput();

        setGraphData([]);
        setCorrectChars(0);
        setCorrectWords(0);
        setExtraChars(0);
        setInCorrectChars(0);
        setMissedChars(0);
    }

    const resetWordSpanRef = ()=>{
        wordsSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(j=>{
                j.className = "";
            })
        })
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }

    const handleInputChange = (e)=>{

        // check if user started typing ans as soon as he start typing also start timer
        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        if(e.keyCode === 32){
            // logic for space

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords + 1);
            }

            if(allCurrChars.length <= currCharIndex){
                // remove cursor from last place in a word
                allCurrChars[currCharIndex-1].classList.remove("current-right");
            }
            else{
                // remove cursor from in between of the word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove("current");
            }

            // add cursor at the starting of next word
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className = "current";
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }

        if(e.keyCode === 8){
            // logic for backspace and user can use this only in current word and not in prev word

            if(currCharIndex !== 0){

                // check for last letter of word
                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex-1].className.includes('extra')){
                        allCurrChars[currCharIndex-1].remove();
                        allCurrChars[currCharIndex-2].className += " current-right";
                    }
                    else{
                        allCurrChars[currCharIndex-1].className = "current";
                    }
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }
                // check for remaining letter of word
                allCurrChars[currCharIndex].className = "";
                allCurrChars[currCharIndex - 1].className = "current";
                setCurrCharIndex(currCharIndex - 1);
            }
            return;
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right";
            allCurrChars[currCharIndex-1].classList.remove('current-right')
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            setExtraChars(extraChars + 1);
            return;
        }

        //   checks for correct and incorrect letter typed
        if(e.key === allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className = "correct";
            setCorrectChars(correctChars + 1);
        }
        else{
            allCurrChars[currCharIndex].className = "incorrect";
            setInCorrectChars(inCorrectChars + 1);
        }

        // when we are at last letter of current word
        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className += " current-right";
        }
        else{
            allCurrChars[currCharIndex + 1].className = "current";
        }
        
        setCurrCharIndex(currCharIndex + 1);
    }

    const calculateWPM = ()=>{
        return Math.round((correctChars/5)/(testTime/60))
    }

    const calculateAcc = ()=>{
        return Math.round((correctWords/currWordIndex) * 100)
    }

    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        resetTest();
    },[testTime])

    useEffect(()=>{
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    },[])

  return (
    <div>
      
      {
        (testEnd) ? (
        <Stats 
        wpm={calculateWPM()} 
        accuracy={calculateAcc()} 
        correctChars={correctChars} 
        inCorrectChars={inCorrectChars} 
        missedChars={missedChars} 
        extraChars={extraChars}
        graphData={graphData}
        />) : (
        <div className="type-box" onClick={focusInput}>
            <UpperMenu countDown={countDown}/>
        <div className="words">
            {
                wordsArray.map((word, index)=>(
                    <span className='word' ref={wordsSpanRef[index]}>
                        {
                            word.split("").map(chars=>(
                                <span>{chars}</span>
                            ))
                        }
                    </span>
                ))
            }
        </div>
        <input type="text"
        className='hidden-input'
        ref={inputRef}
        onKeyDown={handleInputChange} />
      </div>)
      }
    </div>
  )
}

export default TypingBox


//  difference betn useRef and createRef
//  useRef is a hook which can't be used inside a callback while createRef can be used inside a
//  callback and both do the same functionality just one is hook and one is function