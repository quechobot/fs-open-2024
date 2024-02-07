const Course = ({course}) =>{
    const Header = ({courseName}) => <h2>{courseName}</h2>
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

export default Course