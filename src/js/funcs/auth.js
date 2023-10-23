import {swalalert ,setTokenToLocalstorage} from "./utils.js" 
 const register =() =>{
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

const login=()=>{
    const email=document.querySelector('#email')
    const password=document.querySelector('#password')
    const checkbox=document.querySelector('#checkbox');
    const sentData={
        identifier: email.value.trim(),
        password:password.value.trim()
    }
    
    fetch('http://localhost:4000/v1/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(sentData)
    })
    .then(response=>{
        console.log(response);
        if(response.status==200){
            swalalert('با موفقیت لاگین شدید','success','خانه',()=>{
                location.href="/src/index.html"
            })
        }else if(response.status==400){
            swalalert('ایمیل یا پسورد اشتباه است','error','ok',()=>{})
            email.value='';
            password.value=''
        }else if(response.status==401){
            swalalert('همچین کاربری نیست','error','ok',()=>{})
            email.value='';
            password.value=''
        }
        return response.json()
    })
    .then(result=>{
        if(checkbox.checked){
            setTokenToLocalstorage('user',result)
        }else{
            return result
        }
    })
    
}

export {register , login}