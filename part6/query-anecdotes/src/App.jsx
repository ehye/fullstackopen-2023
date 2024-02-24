import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => (
  <div>
    <h3>Anecdote app</h3>
    <Notification />
    <AnecdoteForm />
    <AnecdoteList />
  </div>
)

export default App
