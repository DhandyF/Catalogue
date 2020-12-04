export const state = () => ({
  category: '',
  minPrice: 0,
  maxPrice: 0
})

export const mutations = {
  STORE_CATEGORY (state, category) {
    state.category = category
  },
  REMOVE_CATEGORY (state) {
    state.category = ''
  },
  STORE_MIN_PRICE (state, price) {
    if (price !== null) {
      state.minPrice = price
    }
  },
  REMOVE_MIN_PRICE (state) {
    state.minPrice = 0
  },
  STORE_MAX_PRICE (state, price) {
    if (price !== null || price !== '') {
      state.maxPrice = price
    }
  },
  REMOVE_MAX_PRICE (state) {
    state.maxPrice = 0
  }
}

export const actions = {
  storeCategory ({ commit }, category) {
    commit('STORE_CATEGORY', category)
  },
  removeCategory ({ commit }) {
    commit('REMOVE_CATEGORY')
  },
  storeMinPrice ({ commit }, price) {
    commit('STORE_MIN_PRICE', price)
  },
  removeMinPrice ({ commit }) {
    commit('REMOVE_MIN_PRICE')
  },
  storeMaxPrice ({ commit }, price) {
    commit('STORE_MAX_PRICE', price)
  },
  removeMaxPrice ({ commit }) {
    commit('REMOVE_MAX_PRICE')
  }
}

export const getters = {
  getCategory (state) {
    return state.category
  },
  getMinPrice (state) {
    return state.minPrice
  },
  getMaxPrice (state) {
    return state.maxPrice
  }
}
