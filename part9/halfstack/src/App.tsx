interface HeaderProps {
  name: string
}

interface TotalProps {
  totalExercises: number
}

interface Course {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courses: Array<Course>
}

const Header = (props: HeaderProps): JSX.Element => <h1>{props.name}</h1>

const Content = (props: ContentProps): JSX.Element[] =>
  props.courses.map((course, i) => (
    <p key={i}>
      {course.name} {course.exerciseCount}
    </p>
  ))

const Total = (props: TotalProps): JSX.Element => <p>Number of exercises {props.totalExercises}</p>

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App
