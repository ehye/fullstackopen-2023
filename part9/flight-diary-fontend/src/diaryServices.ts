import axios from 'axios'
import { Diary, NewDiary } from './types'

const baseUrl = '/api/diaries'

const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

const createDiary = async (object: NewDiary) => {
  const response = await axios.post<Diary>(baseUrl, object)
  return response.data
}

export default { getAllDiaries, createDiary }
