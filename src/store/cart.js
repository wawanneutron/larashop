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
    },
    // batch update carts
    set: (state, payload) => {
      state.carts = payload
    }
  },
  /* untuk dapat mengakses mutation
  pada component perlu membuat method
  pada properti actions untuk meng-commit mutation */
  actions: {
    addCart: ({state, commit}, payload) => {
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
    },
    //menghapus cart pada item tertentu
    removeCart: ({state, commit}, payload) => {
      let cartItem = state.carts.find(item => item.id === payload.id)
      if (cartItem) {
        cartItem.quantity--
        commit('update', cartItem)
      }
    },
    // batch update carts
    set: ({commit}, payload) => {
      commit('set', payload)
    }
  },

  getters: {
    carts: state => state.carts,
    /* menghitung jumlah jenis barang 
    yang tersimpan didalam keranjang belanja */
    countCarts: (state) => {
      return state.carts.length
    },
    //menghitung totol harga
    totalPrice: (state) => {
      let total = 0
      state.carts.forEach(function(cart) {
        total += cart.price * cart.quantity
      })
      return total
    },
    // total jumblah barang
    totalQuantity: (state) => {
      let total = 0
      state.carts.forEach(function(cart){
        total += cart.quantity
      })
      return total
    },
    //total berat barang
    totalWeight: (state) => {
      let total = 0
      state.carts.forEach(function(cart) {
        total += cart.weight
      })
      return total
    }
  },
}