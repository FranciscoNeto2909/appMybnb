import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"

export const createUser = createAsyncThunk("createUser", async user => {
  try {
    await api.post("users/", user)
      .then(data => data.status)
  } catch (err) {
    console.log(err)
  }
})

export const login = createAsyncThunk("login", async user => {
  try {
    const res = await api.post("users/login", user)
      .then(data => data.data)
      .catch(err => err)
    return res
  } catch (err) {
    console.log(err)
  }
})

export const emailAuth = createAsyncThunk("emailAuth", async email => {

  try {
    const res = await api.post("emailAuth", email)
      .then(data => data)
      .catch(err => err)
    return res
  } catch (error) {
    console.log(error)
  }
})

export const getUser = createAsyncThunk("getUser", async userId => {
  try {
    const res = await api.get(`users/${userId}`)
    const data = res.data
    return data
  } catch (err) {
    localStorage.clear()
    return err
  }
})

export const DeleteUser = createAsyncThunk("deleteUser", async userId => {
  const res = api.delete(`users/${userId}`)
    .then(data => data.data)
    .catch(err => err)
  return res

})

export const setUserImage = createAsyncThunk("setUserImage", async userImage => {
  const userId = localStorage.getItem("userId")
  const formData = new FormData()
  formData.append('image', userImage)

  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  try {
    const res = await api.put(`users/image/${userId}`, formData, headers)
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    throw err;
  }
})

export const updateUser = createAsyncThunk("updateUser", async user => {
  const userId = localStorage.getItem("userId")

  const res = await api.put(`users/${userId}`, user)
    .then(data => data.data)
    .catch(err => err)
  return res
})

const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    sex: "",
    address: ""
  },
  isLogged: false
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout(state) {
      return { ...state, isLogged: false, user: initialState.user }
    },
    userLogin(state) {
      return { ...state, isLogged: true }
    },
    setUser(state, { payload }) {
      return { ...state, user: payload }
    }
  },
  extraReducers: (build) => {
    build
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.token != undefined && action.payload.token != null) {
          localStorage.setItem('token', action.payload.token)
          return { ...state, isLogged: true }
        } else {
          return { ...state, isLogged: false }
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.message === "Network Error") {
          localStorage.clear()
          return { ...state }
        } else {
          return { ...state, user: action.payload, isLogged: true }
        }
      })
  }
})
export const { logout, userLogin } = userSlice.actions
export default userSlice.reducer