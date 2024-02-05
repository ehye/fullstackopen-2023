import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (auth) => {
  let options = {
    method: 'GET',
    url: baseUrl,
    headers: {
      Accept: '*/*',
      Authorization: 'Bearer ' + auth,
    },
  }

  const response = await axios.request(options)
  return response.data
}

export default { getAll }
