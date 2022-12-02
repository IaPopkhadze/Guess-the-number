import React from "react";
import "./guess.css";
import { useState, useRef } from "react";
let random = Math.floor(Math.random() * 100);

function GuessTheNumber() {
  const myRef = useRef();
  const btnRef = useRef();
  const h1Ref = useRef();
  const msgRef = useRef();
  const congratulation = useRef();
  const startBtn = useRef();
  const [randomNumber, setRandomNumber] = useState("");

  const [randomNumberArray, setRandomNumberArray] = useState([]);

  const [counter, setCounter] = useState(0);
  const [msg, setMsg] = useState("");
  const handleClick = (e) => {
    e.preventDefault();

    if (randomNumber == "" || randomNumber < 0) {
      if (randomNumber == "") {
        setMsg("Please fill input and then submit!");
        msgRef.current.style.color = "red";
      }
      if (randomNumber < 0) {
        setMsg("Dude, you better be joking :D it must be positive number !");
        msgRef.current.style.color = "red";
      }
    } else {
      setRandomNumberArray([...randomNumberArray, randomNumber]);
      setRandomNumber("");

      myRef.current.focus();
      setCounter(counter + 1);

      if (random == randomNumber) {
        msgRef.current.style.color = "green";
        myRef.current.style.display = "none";
        btnRef.current.style.display = "none";
        h1Ref.current.style.display = "none";
        congratulation.current.style.display = "block";
        msgRef.current.style.display = "none";
        startBtn.current.style.display = "block";
      } else if (random < randomNumber) {
        setMsg("your number is highter, try again!");
        msgRef.current.style.color = "red";
      } else {
        setMsg("your number is lower, try again!");
        msgRef.current.style.color = "red";
      }
    }
  };
  const handleStart = () => {
    msgRef.current.style.color = "green";
    myRef.current.style.display = "block";
    btnRef.current.style.display = "block";
    h1Ref.current.style.display = "block";
    congratulation.current.style.display = "none";
    msgRef.current.style.display = "block";
    startBtn.current.style.display = "none";

    random = Math.floor(Math.random() * 100);

    setCounter(0);
    setRandomNumberArray([]);
  };

  return (
    <div className="guessNumberContainer">
      <div className="container">
        <p>{random}</p>
        <p ref={congratulation} className="congratulation">
          Congratulation! You won !
        </p>
        <h1 ref={h1Ref}>
          Guess the number <br /> between 1 and 100
        </h1>

        <input
          className="myInput"
          ref={myRef}
          value={randomNumber}
          onChange={(e) => setRandomNumber(e.target.value)}
          type="number"
          placeholder="enter number"
          required
        />

        <button
          ref={btnRef}
          className="submitBtn"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          Submit
        </button>
        <div className="guessList">
          <p className="guessListTitle"> your guesses:</p>
          {randomNumberArray.map((item, index) => {
            return (
              <p className="yourGuess" key={index}>
                {item}
              </p>
            );
          })}
        </div>
        <p className="totalRound">Total round play by user: {counter}</p>
        <p ref={msgRef}>{msg}</p>
        <button ref={startBtn} onClick={handleStart} className="startBtn">
          Start new Game
        </button>
      </div>
    </div>
  );
}

export default GuessTheNumber;
