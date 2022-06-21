const AddNew = ({
  newName,
  newNumber,
  handlePersonChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
