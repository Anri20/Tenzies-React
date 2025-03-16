import React from "react"
import Die from "./components/Die"

export default function App() {
    const [dice, setDice] = React.useState(() => generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6)
            }))
    }

    const allDice = dice.map(die => <Die value={die.value} />)

    function rollDice() {
        setDice(generateAllNewDice())
    }

    return (
        <main>
            <div className="dice-container">
                {allDice}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}