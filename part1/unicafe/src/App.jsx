import { useState } from 'react'
const Header = ({text}) => (<h1>{text}</h1>)
const Button = ({onSmash, text}) => (<button onClick={onSmash}>{text}</button>)
const Statistics = ({goodNumber, neutralNumber, badNumber, totalNumber}) => {
    const avg = totalNumber !== 0 ?  (goodNumber - badNumber)/totalNumber : 0;
    const positivePer = totalNumber !== 0 ? (goodNumber*100)/totalNumber : 0;
    return(
        <>
            <p>good {goodNumber}</p>
            <p>neutral {neutralNumber}</p>
            <p>bad {badNumber}</p>
            <p>all {totalNumber}</p>
            <p>average: {avg}</p>
            <p>positive {positivePer} %</p>
        </>
    )
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
