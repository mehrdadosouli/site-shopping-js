import { getMe , isLogin } from "./auth.js"
const info=document.querySelector('.left h3')
const list=document.querySelector('.list') 
const new_products=document.querySelector('.new_products') 
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

// menu topbar

const menuTopBar=async()=>{
   const getData=await fetch('http://localhost:4000/v1/menus/topbar');
   const res=await getData.json()
   let shufflmenu=[...res].sort((a,b)=>0.5 - Math.random())
   shufflmenu.slice(0,6).forEach(menu => {
    list.insertAdjacentHTML('beforeend',`
        <li class="li"><a href='${menu.href}'>${menu.title}</a></li>
    `)
   });
}

// get all products

const getALlProductAndShow=async()=>{
    const data=await fetch('http://localhost:4000/v1/courses')
    const result =await data.json();
    result.map(course=>{
        new_products.innerHTML+=`
            <div class="product">
                <img src='http://localhost:4000/v1/${course.cover}' alt="">
                <h4 class="title">${course.name}</h4>
                <div class="info_product">
                    <div class="info_product__right">
                        <img src="photo/icon/icons8-teacher-30.png" alt="">
                        <span>${course.creator}</span>
                    </div>
                    <div class="info_product__left">
                    ${
                        Array(5 - course.courseAverageScore).fill(0).map(item=>
                       `<img src="photo/icon/icons8-star-24.png" alt="">`
                        ).join('')
                   }
                    ${
                         Array(course.courseAverageScore).fill(0).map(item=>
                        `<img src="photo/icon/icons8-star-16.png" alt="">`
                         ).join('')
                    }             
                                 
                    </div>         
                    </div>
                    <div class="product_price">${course.price == 0 ? "رایگان" : course.price}</div>
                    <button class="product_btn">اطلاعات بیشتر</button>
            </div>
        `
    })

}
export {getInfoUser ,menuTopBar ,getALlProductAndShow}
