import {getToken, swalalert} from "./funcs/utils.js";

import {login} from "./funcs/auth.js"
const login__submit=document.querySelector('.login__submit');

login__submit.addEventListener('click',event=>{
    event.preventDefault()
    login()
})