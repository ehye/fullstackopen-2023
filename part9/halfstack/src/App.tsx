interface HeaderProps {
  name: string
}

interface TotalProps {
  totalExercises: number
}

interface PartProps {
  course: CoursePart
}

interface CoursePartBase {
  name: string
  exerciseCount: number
  kind: string
}

interface CoursePartRequire extends CoursePartBase {
  description: string
  requirements: Array<string>
  kind: 'special'
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic'
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string
  kind: 'background'
}

interface ContentProps {
  courses: Array<CoursePart>
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequire

const Header = (props: HeaderProps): JSX.Element => <h1>{props.name}</h1>

const Content = (props: ContentProps): JSX.Element[] =>
  props.courses.map((course, i) => <Part course={course} key={i} />)

const Part = ({ course }: PartProps, key: number) => {
  switch (course.kind) {
    case 'basic':
      return (
        <p key={key}>
          {course.name} {course.exerciseCount}
          <li>{course.description}</li>
        </p>
      )
    case 'group':
      return (
        <p key={key}>
          {course.name} {course.exerciseCount}
          <li>project {course.groupProjectCount}</li>
        </p>
      )
    case 'background':
      return (
        <p key={key}>
          {course.name} {course.exerciseCount}
          <li>{course.backgroundMaterial}</li>
        </p>
      )
    case 'special':
      return (
        <p key={key}>
          {course.name} {course.exerciseCount}
          <li>required skills: {course.requirements.join(', ')}</li>
        </p>
      )
    default:
      return <div></div>
  }
}

const Total = (props: TotalProps): JSX.Element => <p>Number of exercises {props.totalExercises}</p>

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
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
