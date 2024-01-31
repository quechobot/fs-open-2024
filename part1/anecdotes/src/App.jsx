import { useState } from 'react'
const Header = ({text}) => (<h1>{text}</h1>)
const Button = ({text, onSmash}) => (<button onClick={onSmash}>{text}</button>)
const Anecdote = ({text, votes}) => {
 return(
     <>
         <p>{text}</p>
         <p>has {votes} votes</p>
     </>
 )
}
const MostVotesAnecdote = ({text, votes}) => {
    if (votes ===0){
        return(
            <>
                <p>{text}</p>
            </>
        )
    }else{
        return(
            <>
                <p>{text}</p>
                <p>has {votes} votes</p>
            </>
        )
    }
}

function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
    const randNumber = number => Math.floor(Math.random() * number);
    const randHandler = () => setSelected(randNumber(anecdotes.length));
    const voteHandler = () => {
        let pointsCpy = [...points];
        pointsCpy[selected]+=1;
        setPoints(pointsCpy);
    }
    let votes = 0; let mostVoted="no votes yet";
    points.forEach((e,index)=>{
        if(e>votes){
            votes = e;
            mostVoted = anecdotes[index];
        }
    });
    return (
        <>
            <Header text={"Anecdote of the day"} />
            <Anecdote text={anecdotes[selected]} votes={points[selected]}/>
            <Button onSmash={voteHandler} text={"vote"}/>
            <Button onSmash={randHandler} text={"next anecdote"} />
            <Header text={"Anecdote with most votes"} />
            <MostVotesAnecdote text={mostVoted} votes={votes}/>
        </>
    )
}

export default App
