import { getMe , isLogin } from "./auth.js"


const info=document.querySelector('.left h3')
const list=document.querySelector('.list') 

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

// get all products and popular products

const getALlProductAndShow=async(api,elem)=>{
    
    const elems=document.querySelector(`.${elem}`) 
    const data=await fetch(`http://localhost:4000/v1/${api}`)
    const result =await data.json();

    api=='courses' ? 
    result.map(course=>{
        elems.innerHTML+=`
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
    :
    result.map(course=>{
        elems.innerHTML+=`
        <swiper-slide>
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
    </swiper-slide>
        `})

}


export {getInfoUser ,menuTopBar ,getALlProductAndShow}
