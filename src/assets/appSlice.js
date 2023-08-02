import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "housesSlice",
    initialState: {
        isNavVisible: true,
        isModalOpened: false,
        isFilterOpened: false,
        isLoginOpened: false,
        isMenuOpened: false,
        isFavoritesOpened: false,
        clickedCard: {},
        favorites: [{
            title: "gostei",
            items: []
        }],
        destinyFilter: {
            localization: "",
            date: "",
            hosts: 0,
            cordenates: "",
            price: "",
            hostPlace: "",
            bedroomsQuant: "",
            bedsQuant: "",
            bethroomsQuant: "",
            hostSpace: "",
            preferences: ""
        }
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
        setClickedCard(state, { payload }) {
            return { ...state, clickedCard: payload }
        },
        cleanClickedCard(state) {
            return { ...state, clickedCard: {} }
        },
        showFavorites: (state) => {
            return { ...state, isFavoritesOpened: true }
        },
        hideFavorites: (state) => {
            return { ...state, isFavoritesOpened: false }
        },
        setFavorite(state, { payload }) {
            const { id, item } = payload
            return {
                ...state,
                favorites: [
                    {
                        ...state.favorites[id],
                        items: [...state.favorites[id].items, item],
                    },
                ],
            };
        },
        createCategorie(state, { payload }) {
            return {
                ...state,
                favorites: [...state.favorites, payload],
            };
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
        setDestiny(state) {
            return { ...state, hasDestiny: true }
        },
        clearDestiny(state) {
            return { ...state, hasDestiny: false }
        },
        setDestinyFilter(state, { payload }) {
            console.log(payload)
            return { ...state, destinyFilter: { ...state.destinyFilter, payload } }
        }
    },
    extraReducers: (builder) => { }
})

export const { hideNav, showNav, showModal, hideModal, showFavorites, hideFavorites, setClickedCard, cleanClickedCard, setFavorite, createCategorie, showFilter, hideFilter, showLogin, hideLogin, showMenu, hideMenu, setDestiny, clearDestiny, setDestinyFilter } = slice.actions

export default slice.reducer