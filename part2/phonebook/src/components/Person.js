const Person = ({ persons, filter }) => {
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
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default Person;
