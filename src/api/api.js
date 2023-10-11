import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"




export const getTodos = createAsyncThunk (
    'todos/getTodos',
    async function (_, {dispatch, rejectWithValue}){
        try {
            const {data} = await axios.get("http://localhost:3000/ToDoAsync")
            return data
        } catch (error) {
            
        }
    }
)