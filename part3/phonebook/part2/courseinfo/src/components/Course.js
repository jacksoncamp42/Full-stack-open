import React from "react";

const Header = ({ name }) => {
  return <h3>{name}</h3>;
};

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Sum = ({ parts }) => {
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>
        total of {parts.map((part) => part.exercises).reduce((s, p) => s + p)}{" "}
        exercises
      </span>
    </div>
  );
};

const Course = ({ courses }) => {
  const output = courses.map((course) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  ));

  return output;
};

export default Course;
