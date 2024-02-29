import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  let options = {
    method: 'GET',
    url: baseUrl,
  }

  const response = await axios.request(options)
  return response.data
}

export default { getAll }
