import { register } from "./funcs/auth.js";

let login__submit=document.querySelector('.login__submit')
login__submit.addEventListener('click',event=>{
    event.preventDefault()
    register()
})