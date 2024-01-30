import { useState } from 'react'
const Header = ({text}) => (<h1>{text}</h1>)
const Button = ({onSmash, text}) => (<button onClick={onSmash}>{text}</button>)
const Statistics = ({goodNumber, neutralNumber, badNumber}) => {
    return(
        <>
            <p>good {goodNumber}</p>
            <p>neutral {neutralNumber}</p>
            <p>bad {badNumber}</p>
        </>
    )
}
function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const increaseGood = () => setGood(good + 1);
    const increaseNeutral = () => setNeutral(neutral + 1);
    const increaseBad = () => setBad(bad + 1);
    return (
        <div>
            <Header text={"give feedback"}/>
            <Button onSmash={increaseGood} text='good' />
            <Button onSmash={increaseNeutral} text='neutral' />
            <Button onSmash={increaseBad} text='bad' />
            <Header text={"statistics"}/>
            <Statistics goodNumber={good} neutralNumber={neutral} badNumber={bad} />
        </div>
    )
}
export default App
