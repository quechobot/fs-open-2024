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
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const personsToShow = persons.filter(e => e.name.split(" ").join("").toLowerCase().includes(filter));
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
        const nameFound = persons.find(e=> e.name.split(" ").join("").toLowerCase()===nameToSearch);
        const exist = nameFound!==undefined?true:false;
        if(!exist){
            const personObject = {
                name: newName.trim(),
                number:newNumber.trim(),
                id: `${persons.length+1}`,
            }
            personService.create(personObject)
                .then( returnedPerson =>{
                    console.log("created Person in server",returnedPerson);
                    setPersons(persons.concat(returnedPerson));
                    setNewNumber('');
                    setNewName('');
                    }
                );
        }else{
            alert(`"${newName.trim()}" Already exist as "${nameFound.name}" in the phonebook`);
            setNewName("");
            setNewNumber('');
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
                    setPersons(persons.filter(p => p.id !== returnedPerson.id));
                })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onType={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm onSub={addPerson} newName={newName} newNumber={newNumber} onTypeName={handleNameChange} onTypeNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleDelete={handleDelete}/>
        </div>
    )
}
export default App