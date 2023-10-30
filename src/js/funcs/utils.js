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

const fetchCategory=async(categoryName)=>{
  const fetchData=await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
  const response=await fetchData.json();
  return response
}
const getAndShowCategory=(category,response)=>{
  category.innerHTML="";
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
                                  <div class="info_product__left">
                                      ${
                                         Array(5 - course.courseAverageScore).fill(0).map(item=>`<img src="../photo/icon/icons8-star-24.png" alt=""/>`).join('')
                                      }                          
                                      ${
                                         Array( course.courseAverageScore).fill(0).map(item=>`<img src="../photo/icon/icons8-star-16.png" alt=""/>`).join('')
                                      }                          
                                  </div>           
                              </div>
                      <div class="product_price">${course.price == 0 ? "رایگان" : course.price}</div>
                      <button class="product_btn">اطلاعات بیشتر</button>
              </div>
      
      `)
     
  })

  : category.innerHTML=`<div class="notting_category"><h3>ایتمی موجود نمی باشد</h3></div>`
}

const changeRowAndColumn=(locations,category,data)=>{
    if(locations=='row'){
     category.innerHTML="";
     data.map(course=>{
     category.insertAdjacentHTML('beforeend',`<div id="products">
      <img src='http://localhost:4000/courses/covers/${course.cover}' style="max-width:20rem;border-radius:10px" alt="">
      <div class="sub_product">
        <h4 class="title">${course.name}</h4>
                  <div class="info_product">
                      <div class="info_product__right">
                          <img src="../photo/icon/icons8-teacher-30.png" alt="">
                          <span>${course.creator}</span>
                      </div>      
                                 
                  </div>
          <div class="product_price">قیمت ${course.price == 0 ? "رایگان" : course.price}</div>
          <button class="product_btn">اطلاعات بیشتر</button>
        </div>
        <div class="description_product"><span>${course.description}</span></div>
  </div>`

     )})
  }
    if(locations=='column'){
      getAndShowCategory(category,data)
    }
}
export { swalalert , getToken , setTokenToLocalstorage , getTokenFromLocalstorage , geturlSearch ,getAndShowCategory ,changeRowAndColumn ,fetchCategory}