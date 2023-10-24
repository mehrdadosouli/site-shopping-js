const swalalert=(title,icon,buttons,callback)=>{
    Swal.fire({
        title,
        icon,
        confirmButtonText: buttons
      }).then(res=>{
        callback(res)
      })
}

// getToken
const getToken=()=>{
   return JSON.parse(localStorage.getItem('user')).token
}


// set token to localstorage
const setTokenToLocalstorage=(key,value)=>{
    return localStorage.setItem(key,JSON.stringify({token:value.accessToken}))
}


// get token from localstorage
const getTokenFromLocalstorage=(key)=>{
    return localStorage.getItem(key)
}


export {swalalert , getToken , setTokenToLocalstorage ,getTokenFromLocalstorage}