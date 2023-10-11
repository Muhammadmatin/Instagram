import { configureStore } from '@reduxjs/toolkit'
import todos from '../todos/todos'

export default configureStore({
  reducer: {
    todos:todos
  }
})