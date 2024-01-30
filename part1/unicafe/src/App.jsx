import { useState } from 'react'
const Header = ({text}) => (<h1>{text}</h1>)
const Button = ({onSmash, text}) => (<button onClick={onSmash}>{text}</button>)
const Statistics = ({goodNumber, neutralNumber, badNumber, totalNumber}) => {
    if(totalNumber!==0){
        const avg = (goodNumber - badNumber)/totalNumber;
        const positivePer = (goodNumber*100)/totalNumber;
        return (
            <>
                <p>good {goodNumber}</p>
                <p>neutral {neutralNumber}</p>
                <p>bad {badNumber}</p>
                <p>all {totalNumber}</p>
                <p>average: {avg}</p>
                <p>positive {positivePer} %</p>
            </>
        )
    } else {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }
}
function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    // study the diference/benefits  of useState and a let variable +
    // let total=good+neutral+bad;
    const [total, setTotal] = useState(0);
    const increaseGood = () =>{
        const updatedGood = good+1;
        setGood(updatedGood);
        setTotal(updatedGood+neutral+bad);
    }
    const increaseNeutral = () =>{
        const updatedNeutral = neutral+1;
        setNeutral(updatedNeutral);
        setTotal(updatedNeutral+good+bad);
    }
    const increaseBad = () =>{
        const updatedBad = bad+1;
        setBad(updatedBad);
        setTotal(updatedBad+good+neutral);
    }
    return (
        <div>
            <Header text={"give feedback"}/>
            <Button onSmash={increaseGood} text='good' />
            <Button onSmash={increaseNeutral} text='neutral' />
            <Button onSmash={increaseBad} text='bad' />
            <Header text={"statistics"}/>
            <Statistics goodNumber={good} neutralNumber={neutral} badNumber={bad} totalNumber={total}/>
        </div>
    )
}
export default App
