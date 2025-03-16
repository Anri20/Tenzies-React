import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = React.useState(() => generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
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
        setDice(dice =>
            dice.map(die =>
                die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            )
        )
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
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            <div className="dice-container">
                {allDice}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}