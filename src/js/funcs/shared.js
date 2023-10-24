import { getMe , isLogin } from "./auth.js"
const info=document.querySelector('.contain .left h3')
const getInfoUser=()=>{
    const isUserLogin = isLogin()
    if(isUserLogin){
        getMe().then(data=>{
            info.innerHTML=`<a href="#">${data.name}</a>`  
        })
    }else{
        info.innerHTML='<a href="./login/login.html">Login</a>'
    }
}

export {getInfoUser}
