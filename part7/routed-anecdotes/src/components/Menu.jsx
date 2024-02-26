import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { About } from './About'
import { AnecdoteList } from './AnecdoteList'
import { Anecdote } from './Anecdote'
import { CreateNew } from './CreateNew'
import { Notification } from './Notification'

export const Menu = ({ anecdotes, addNew, notification }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/anecdotes">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>

      <Notification anecdote={notification} />

      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}
