import {swalalert ,setTokenToLocalstorage} from "./utils.js" 
 const register =async () =>{
    const name=document.querySelector('#name');
    const family=document.querySelector('#family');
    const email=document.querySelector('#email');
    const phone=document.querySelector('#phone');
    const password=document.querySelector('#password');
    const confirm_password=document.querySelector('#confirm_password');
    const bodyinput={
        
            name: name.value.trim(),
            username: family.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            password: password.value.trim(),
            confirmPassword: password.value.trim(),
        
    }
    fetch('http://localhost:4000/v1/auth/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(bodyinput)
    })
    .then(res=>{
    if(res.status==201){
        swalalert('ثبت نام شما با موفقیت ثبت شد','success','باشه',()=>{location.href='/src/index.html'}) 
    }else if(res.status == 409){
        swalalert('قبلا ثبت نام کرده اید','warning','باشه',()=>{})  
    }else if(res.status == 400){
        swalalert('لطفا فیلد ها را پر کنید','error','باشه',()=>{})   
    }
 return res.json()})
 .then(result=>{
    return setTokenToLocalstorage('user',result)
 })
    
}

export {register}