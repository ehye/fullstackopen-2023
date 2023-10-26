const Header = ({ name }) =>
  <h2>{name}</h2>

const Part = ({ name, exercises }) =>
  <div>
    {name} {exercises}
  </div>


const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>

const Total = ({ sumOfExercises: exerciseArray }) =>
  <div>
    total of {total(exerciseArray)} exercises
  </div>

const total = (course) => course.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sumOfExercises={course.parts} />
    </div>
  )
}

export default App