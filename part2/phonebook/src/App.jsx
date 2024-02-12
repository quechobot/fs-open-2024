import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from "./services/Person.js";
const Filter = ({onType})=>{
    return(
        <div>
            Filter shown with<input onChange={onType}/>
        </div>
    );
}
const PersonForm = ({onSub, newName, newNumber, onTypeName, onTypeNumber})=>{
    return(
        <div>
            <form onSubmit={onSub}>
                <div>name: <input value={newName} onChange={onTypeName}/></div>
                <div>number: <input value={newNumber} onChange={onTypeNumber}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}
const Persons = ({persons, handleDelete}) => {
    return (
        <>
            <ul>
                {persons.map(person=><Person key={person.id} person={person} handleDelete={handleDelete}/>)}
            </ul>
        </>
    );
}
const Person = ({person, handleDelete}) => <li>{person.name} {person.number}<button onClick={()=>handleDelete(person)}>delete</button></li>
const Notification = ({ message, notificationStyle}) => {
    if (message === null) {
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const personsToShow = persons.filter(e => e.name.split(" ").join("").toLowerCase().includes(filter));
    const [alertMessage, setAlertMessage] = useState(null);
    const [notificationStyle, setNotificationStyle] = useState(null);
    const redNotificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const greenNotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const hook = () => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }
    useEffect(hook, [])
    const addPerson = (event) => {
        event.preventDefault();
        const nameToSearch = newName.split(" ").join("").toLowerCase();
        const personFound = persons.find(e=> e.name.split(" ").join("").toLowerCase()===nameToSearch);
        const exist = personFound!==undefined?true:false;
        if(!exist){
            const personObject = {
                name: newName.trim(),
                number:newNumber.trim(),
                id: `${persons.length+1}`,
            }
            personService.create(personObject)
                .then( returnedPerson =>{
                    console.log("created Person in server",returnedPerson);
                    setNotificationStyle(greenNotificationStyle);
                    setAlertMessage(`created Person in server '${returnedPerson.name}'`)
                    setTimeout(() => {
                        setAlertMessage(null)
                    }, 3000);
                    setPersons(persons.concat(returnedPerson));
                    setNewNumber('');
                    setNewName('');
                    }
                );
        }else{
            const confirm = window.confirm(`"${newName.trim()}" is already added in the phonebook as "${personFound.name}", replace the old number "${personFound.number}" with "${newNumber}"?`).valueOf();
            if(confirm){
                const personNewNumber = {...personFound, number: newNumber};
                personService.update(personNewNumber.id, personNewNumber)
                    .then(returnedPerson=>{
                        setPersons(persons.map(p=> p.id !== personNewNumber.id ? p:returnedPerson));
                        setNewName("");
                        setNewNumber('');
                        setNotificationStyle(greenNotificationStyle);
                        setAlertMessage(`Person '${personNewNumber.name}' updated`)
                        setTimeout(() => {
                            setAlertMessage(null)
                        }, 3000)
                    }).catch(error =>{
                        //alert(`${personNewNumber} was already deleted from the server`);
                        setNotificationStyle(redNotificationStyle);
                        setAlertMessage(`Person '${personNewNumber.name}' was already removed from server`)
                        setTimeout(() => {
                            setAlertMessage(null)
                        }, 3000)
                        setPersons(persons.filter(n => n.id !== personFound.id));
                    })
            }
        }
    }
    const handleNameChange = event=>setNewName(event.target.value)
    const handleNumberChange = event=>setNewNumber(event.target.value)
    const handleFilterChange = event=>setFilter(event.target.value.split(" ").join("").toLowerCase())
    const handleDelete = person => {
        const confirm = window.confirm(`delete ${person.name}?`).valueOf();
        if(confirm){
            personService.deleteFromServer(person.id)
                .then(returnedPerson=>{
                    console.log("Deleted person from server", returnedPerson);
                    setNotificationStyle(redNotificationStyle);
                    setAlertMessage(`Deleted '${returnedPerson.name}' Person from server `)
                    setTimeout(() => {
                        setAlertMessage(null)
                    }, 3000);
                    setPersons(persons.filter(p => p.id !== returnedPerson.id));
                }).catch(error =>{
                //alert(`${personNewNumber} was already deleted from the server`);
                    setNotificationStyle(redNotificationStyle);
                    setAlertMessage(`Person '${person.name}' was already removed from server`)
                    setTimeout(() => {
                        setAlertMessage(null)
                    }, 3000)
                setPersons(persons.filter(n => n.id !== person.id));
            })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={alertMessage} notificationStyle={notificationStyle}/>
            <Filter onType={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm onSub={addPerson} newName={newName} newNumber={newNumber} onTypeName={handleNameChange} onTypeNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleDelete={handleDelete}/>
        </div>
    )
}
export default App