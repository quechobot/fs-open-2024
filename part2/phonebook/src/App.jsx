import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            id: 1
        }])
    const [newName, setNewName] = useState('')
    const addPerson = (event) => {
        event.preventDefault();
        const nameToSearch = newName.split(" ").join("").toLowerCase();
        const nameFound = persons.find(e=> e.name.split(" ").join("").toLowerCase()===nameToSearch);
        const exist = nameFound!==undefined?true:false;
        if(!exist){
            const personObject = {
                name: newName.trim(),
                id: persons.length+1,
            }
            setPersons(persons.concat(personObject));
            setNewName('');
        }else{
            alert(`"${newName.trim()}" Already exist as "${nameFound.name}" in the phonebook`);
            setNewName("");
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person=><li key={person.id}>{person.name}</li>)}
            </ul>
        </div>
    )
}

export default App