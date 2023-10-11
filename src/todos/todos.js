import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    getUsers: [],
    objAdd:{
        "title": "",
        "text": "",
        "status": false,
        "color": "#fff",
        img: ""
    },
    imgAdd: {
        img: ""
    },
    objEdit:{
        "id": "",
        "title": "",
        "text": "",
        "status": false,
        "color": "#fff",
        "img": ""
    },
    animateSearch: false,
    animateNotify: false,
    special: true,

    search: "",
    modalEdit: false,
    modalAdd: false,
    idx: null,
  },
  reducers: {
    handleChange:(state, action)=> {
        state[action.payload.value] = action.payload.answer
    },
    handleChangeObj:(state, action)=> {
        state[action.payload.value][action.payload.key] = action.payload.answer
    },
    clear:(state, action)=> {
        state.objAdd = {
            "title": "",
            "text": "",
            "status": false,
            "color": "#fff",
            "img": ""
        }
        state.modalAdd = false
    }
  },
  extraReducers: {
  }
})

// Action creators are generated for each case reducer function
export const { handleChange, handleChangeObj } = counterSlice.actions

export default counterSlice.reducer