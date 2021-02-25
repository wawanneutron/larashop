export default {
  namespaced: true,
  
  state: {
    carts: [],
  },

  mutations: {
    insert: (state, payload) => {
      state.carts.push({
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: 1
      })
    },
    update: (state, payload) => {
      /* mendetesi payload ada di index keberapa? */
      let indx = state.carts.indexOf(payload)
      state.carts.splice(indx, 1, {
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: payload.quantity
      })
      if (payload.quantity <= 0) {
        /* menghapus item carts jika quantity nya nol */
        state.carts.splice(indx, 1)
      }
    }
  },
  /* untuk dapat mengakses mutation
  pada component perlu membuat method
  pada properti actions untuk meng-commit mutation */
  actions: {
    add: ({state, commit}, payload) => {
      /* mendeteksi apakah data yang diinput ada pada carts? */
      let cartItem = state.carts.find(item => item.id === payload.id)
      /* jika tidak ada maka mutation insert dijalankan */
      if (!cartItem){
        commit('insert', payload)
      }else {
        /* jika ada maka mutation update dijalankan */
        cartItem.quantity++
        commit('update', cartItem)
      }
    }
  },

  getters: {
    carts: state => state.carts
  },
}