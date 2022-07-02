const Person = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons
        .filter(
          (person) =>
            person.name.substring(0, filter.length).toLowerCase() ===
            filter.toLowerCase()
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.name, person.id)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Person;
