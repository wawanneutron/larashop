"use strict"
import Vue from 'vue'

/* helper image */
const Helper = {
    install(vue) {
        Vue.prototype.appName = process.env.VUE_APP_NAME
        vue.prototype.getImage = function (image) {
            if (image != null && image.length > 0) {
                return process.env.VUE_APP_BACKEND_URL + '/storage/' + image
            }
            /* deafult image jika tidak
            ditemukan */
                return process.env.VUE_APP_BACKEND_URL + '/storage/books/unavailable.jpg'
        }
        
    }
}

Vue.use(Helper)