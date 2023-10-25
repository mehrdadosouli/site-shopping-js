import {getInfoUser ,menuTopBar ,getALlProductAndShow} from "./funcs/shared.js"
window.addEventListener('load',()=>{
    getInfoUser()
    menuTopBar()
    getALlProductAndShow('courses','new_products')
    getALlProductAndShow('courses/popular','mySwiper')
})