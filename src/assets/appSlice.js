import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "housesSlice",
    initialState: {
        isNavVisible: true,
        isModalOpened: false,
        isFilterOpened: false,
        isLoginOpened: false,
        isMenuOpened: false,
        isLogged: true,
    },
    reducers: {
        showNav: (state) => {
            return { ...state, isNavVisible: true }
        },
        hideNav: (state) => {
            return { ...state, isNavVisible: false }
        },
        showModal: (state) => {
            return { ...state, isModalOpened: true }
        },
        hideModal: (state) => {
            return { ...state, isModalOpened: false }
        },
        showFilter: (state) => {
            return { ...state, isFilterOpened: true }
        },
        hideFilter: (state) => {
            return { ...state, isFilterOpened: false }
        },
        showLogin: (state) => {
            return { ...state, isLoginOpened: true }
        },
        hideLogin: (state) => {
            return { ...state, isLoginOpened: false }
        },
        showMenu: (state) => {
            return { ...state, isMenuOpened: true }
        },
        hideMenu: (state) => {
            return { ...state, isMenuOpened: false }
        },
        login: (state) => {
            return { ...state, isLogged: true }
        },
        logout: (state) => {
            return { ...state, isLogged: false }
        }
    },
    extraReducers: (builder) => { }
})

export const { hideNav, showNav, showModal, hideModal, showFilter, hideFilter, showLogin,hideLogin, login, logout, showMenu, hideMenu } = slice.actions

export default slice.reducer