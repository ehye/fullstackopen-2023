import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const baseUrl = '/api/diaries'

interface Diary {
  id: number
  date: string
  weather: string
  visibility: string
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setDiaries(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary, i) => (
        <div key={i}>
          <h3>{diary.id}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  )
}

export default App
