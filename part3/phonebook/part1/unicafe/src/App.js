import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticLine = ({ text, value, endtext }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value}
      {endtext}
    </td>
  </tr>
);
const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good " value={good} />
        <StatisticLine text="neutral " value={neutral} />
        <StatisticLine text="bad " value={bad} />
        <StatisticLine text="all " value={good + neutral + bad} />
        <StatisticLine
          text="average "
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text="positive "
          value={100 * (good / (good + neutral + bad))}
          endtext="%"
        />
      </tbody>
    </table>
  );
};

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
