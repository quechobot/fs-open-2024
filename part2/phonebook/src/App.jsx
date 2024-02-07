import { useState } from 'react'

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
const Persons = ({persons}) => {
    return (
        <>
            <ul>
                {persons.map(person=><Person key={person.id} person={person}/>)}
            </ul>
        </>
    );
}
const Person = ({person}) =><li>{person.name} {person.number}</li>

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
        ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const personsToShow = persons.filter(e => e.name.split(" ").join("").toLowerCase().includes(filter));
    const addPerson = (event) => {
        event.preventDefault();
        const nameToSearch = newName.split(" ").join("").toLowerCase();
        const nameFound = persons.find(e=> e.name.split(" ").join("").toLowerCase()===nameToSearch);
        const exist = nameFound!==undefined?true:false;
        if(!exist){
            const personObject = {
                name: newName.trim(),
                number:newNumber.trim(),
                id: persons.length+1,
            }
            setPersons(persons.concat(personObject));
            setNewNumber('');
            setNewName('');
        }else{
            alert(`"${newName.trim()}" Already exist as "${nameFound.name}" in the phonebook`);
            setNewName("");
            setNewNumber('');
        }
    }
    const handleNameChange = event=>setNewName(event.target.value)
    const handleNumberChange = event=>setNewNumber(event.target.value)
    const handleFilterChange = event=>setFilter(event.target.value.split(" ").join("").toLowerCase())
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onType={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm onSub={addPerson} newName={newName} newNumber={newNumber} onTypeName={handleNameChange} onTypeNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow}/>
        </div>
    )
}
export default App