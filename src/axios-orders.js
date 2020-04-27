import axios from 'axios'

export default axios.create({
  baseURL: 'https://burger-project-1ed73.firebaseio.com/'
})