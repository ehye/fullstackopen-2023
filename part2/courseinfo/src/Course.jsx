const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) =>
  <div>
    {name} {exercises}
  </div>

const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>

const Total = ({ parts }) =>
  <div>
    total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises
  </div>

const Course = ({ courses }) =>
  <div>
    {courses.map(c =>
      <div key={c.id}>
        <Header name={c.name} />
        <Content parts={c.parts} />
        <Total parts={c.parts} />
      </div>
    )}
  </div>

export default Course