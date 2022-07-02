import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Person";
import Filter from "./components/Filter";
import AddNew from "./components/AddNew";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  //updates/loads on initial mount
  useEffect(() => {
    personService.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (isDuplicate()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldInfo = persons.filter((person) => person.name === newName)[0];
        const newPerson = { ...oldInfo, number: newNumber };
        personService
          .update(oldInfo.id, newPerson)
          .then((data) => {
            setPersons(
              persons
                .filter((person) => person.id !== newPerson.id)
                .concat(data)
            );
            setMessage(`${newName} was successfully updated`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setPersons(persons.filter((person) => person.id !== newPerson.id));
            setMessage(`[ERROR] ${newName} was already deleted from server`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      if (persons.length === 0) {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: 0,
        };
        personService
          .create(newPerson)
          .then((initialData) => {
            setPersons(persons.concat(initialData));
            setMessage(`${newName} was successfully added`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(`[ERROR] ${error.response.data.error}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            console.log(error.response.data);
          });
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: persons[persons.length - 1].id + 1,
        };
        personService
          .create(newPerson)
          .then((initialData) => {
            setPersons(persons.concat(initialData));
            setMessage(`${newName} was successfully added`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(`[ERROR] ${error.response.data.error}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            console.log(error.response.data);
          });
      }
      setMessage(`Added ${newName} to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const isDuplicate = () => {
    const names = persons.map((person) => person.name);
    return names.includes(newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <AddNew
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
