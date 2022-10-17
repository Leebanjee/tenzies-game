
import './App.css';
import Die from './components/Die';
import { useEffect, useState } from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
function generateNewDie(){
 return {
    value: Math.ceil(Math.random() * 6 ),
    isHeld: false,
    id: nanoid()
  }
}

function createDot(){
  
}
  function allNewDice(){
    const newDiceArr = []
    for (let i = 0; i < 10; i++) {
      newDiceArr.push(generateNewDie())
    }



   return newDiceArr
   console.log(newDiceArr);
  }

  function rollDice(){

    if (!tenzies) {
       setDice(oldDice => oldDice.map(die => {
    return   die.isHeld ? die : generateNewDie()
    }))

    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
   
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
       {...die, isHeld: !die.isHeld}: die }))

  }

const dieElements = dice.map(die =>(
<Die
 key={die.id}
  value={die.value}  
  isHeld={die.isHeld}
   holdDice={()=> holdDice(die.id)}/>
) )

useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue )
  if (allHeld && allSameValue) {
    setTenzies(true)
    console.log("You Won!!");
    if (setTenzies(true)) {
      
    }
  }
}, [dice])

  return (
   <main>
     {tenzies &&
     <Confetti />
     }
     <h1 className='title'>Tenzies</h1>
     <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className='dice__container'>
     {dieElements}
     </div>
     <button onClick={rollDice} className='roll__dice'>{tenzies ? "New Game" : "Role"}</button>
   </main>
  );
}

export default App;
// https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple