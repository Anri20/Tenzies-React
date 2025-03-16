import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(() => generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                // value: 1,
                isHeld: false,
                id: nanoid()
            }))
    }

    const allDice = dice.map(dieObj =>
        <Die
            key={dieObj.id}
            hold={() => hold(dieObj.id)}
            {...dieObj}
        />
    )

    function rollDice() {
        if (gameWon) {
            setDice(generateAllNewDice())
        } else {
            setDice(dice =>
                dice.map(die =>
                    die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
                )
            )
        }
    }

    function hold(id) {
        setDice(dice =>
            dice.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        )
    }

    return (
        <main>
            {gameWon && <Confetti numberOfPieces={400} recycle={false} />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            <div className="dice-container">
                {allDice}
            </div>
            <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}