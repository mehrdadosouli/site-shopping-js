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

// geturlSearch
const geturlSearch=(key)=>{
  const urlparam= new URLSearchParams(window.location.search);
  const result=urlparam.get(key).slice(15)
  return result
}

const getAndShowCategory=async(categoryName)=>{
  const fetchData=await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
  const result=await fetchData.json()
  return result
}
export { swalalert , getToken , setTokenToLocalstorage , getTokenFromLocalstorage , geturlSearch ,getAndShowCategory}