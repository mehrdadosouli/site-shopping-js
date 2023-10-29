import {geturlSearch ,getAndShowCategory} from "../js/funcs/utils.js"
const category=document.querySelector('.category')

window.addEventListener('load',()=>{
    const resul=geturlSearch('cat')
    getAndShowCategory(resul).then(response=>{
        response.length ?
        response.map(course=>{
            
            category.insertAdjacentHTML('beforeend',`
            
                    <div class="product">
                        <img src='http://localhost:4000/courses/covers/${course.cover}' alt="">
                        <h4 class="title">${course.name}</h4>
                                    <div class="info_product">
                                        <div class="info_product__right">
                                            <img src="../photo/icon/icons8-teacher-30.png" alt="">
                                            <span>${course.creator}</span>
                                        </div>                 
                                    </div>
                            <div class="product_price">${course.price == 0 ? "رایگان" : course.price}</div>
                            <button class="product_btn">اطلاعات بیشتر</button>
                    </div>
            
            `)
           
        })
        : category.innerHTML=`<div class="notting_category"><h3>ایتمی موجود نمی باشد</h3></div>`
    })
})