import axios from 'axios'
import config from './../utils/config'
const baseUrl = `${config}`

const getAll = async () => {
  const request = axios.get(baseUrl + "/data")
  return await request.then(response => response.data)

}

const getIndicator = async (indicator) => {
  const request = axios.post(baseUrl + "/data/indicator", {
    indicator
  })

  return await request.then(response => response.data)

}

export {getAll, getIndicator}
