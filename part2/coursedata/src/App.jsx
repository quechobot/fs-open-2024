const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }
    return (
        <div>
            <Course course={course} />
        </div>
    );
}
const Course = ({course}) =>{
    const Header = ({courseName}) => <h1>{courseName}</h1>
    const Content = ({parts}) => {
        const Part = ({partName, exercises}) => <p>{partName} {exercises}</p>
        return (
            <>
                {parts.map(part => <Part key={part.id} partName={part.name} exercises={part.exercises}/>)}
            </>
        )
    }
    const Total = ({exercises}) => {
        const total = exercises.reduce((a, b)=> a + b);
        return(
            <>
                <p><strong>total of {total} exercises</strong></p>
            </>
        )
    }
    return (
        <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts.map(e=>e.exercises)}/>
        </>
    );
}
export default App