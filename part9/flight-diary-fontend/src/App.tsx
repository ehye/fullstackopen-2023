import React, { useState, useEffect } from 'react'
import { Diary, NewDiary } from './types'
import diaryServices from './diaryServices'
import axios from 'axios'
import './App.css'

const ErrorMessage = ({ message }: { message: string }) => <div style={{ color: 'red' }}>{message}</div>

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getDiaries = async () => {
      const diaries = await diaryServices.getAllDiaries()
      setDiaries(diaries)
    }

    getDiaries()
  }, [])

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const diaryToAdd: NewDiary = {
        date,
        visibility,
        weather,
        comment,
      }
      const newDiary = await diaryServices.createDiary(diaryToAdd)
      diaries.concat(newDiary)
      setDiaries(diaries)
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    }

    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entries</h2>
      <ErrorMessage message={message} />
      <form onSubmit={submit}>
        <div>
          date <input id="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          weather <input id="weather" value={weather} onChange={({ target }) => setWeather(target.value)} />
        </div>
        <div>
          visibility <input id="visibility" value={visibility} onChange={({ target }) => setVisibility(target.value)} />
        </div>
        <div>
          comment <input id="comment" value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

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
