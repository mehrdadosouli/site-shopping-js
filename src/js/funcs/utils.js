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
  const result=urlparam.get(key)
  return result
}

const fetchCategory=async(categoryName)=>{
  const fetchData=await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
  const response=await fetchData.json();
  return response
}

const pagination=(category,respons,itempage)=>{
 const current=geturlSearch('page')
  const element=document.querySelector('.pagination');
    element.innerHTML="";
    const endData=current * itempage;
    const startData=endData - itempage;
    const res=respons.length / itempage
    for (let i = 1; i < res + 1; i++) {
      element.insertAdjacentHTML('beforeend',`<button onclick=handler(event,${i})>
        ${i}
      </button>`)
    }
   return respons.slice(startData,endData)
}

const getAndShowCategory=(category,response)=>{
  category.innerHTML="";
      response.length ?
      response.map((item)=>{
          category.insertAdjacentHTML('beforeend',`
                  <div class="product">
                      <img src='http://localhost:4000/courses/covers/${item.cover}' alt="">
                      <h4 class="title">${item.name}</h4>
                                  <div class="info_product">
                                      <div class="info_product__right">
                                          <img src="../photo/icon/icons8-teacher-30.png" alt="">
                                          <span>${item.creator}</span>
                                      </div>      
                                      <div class="info_product__left">
                                          ${
                                             Array(5 - item.courseAverageScore).fill(0).map(item=>`<img src="../photo/icon/icons8-star-24.png" alt=""/>`).join('')
                                          }                          
                                          ${
                                             Array( item.courseAverageScore).fill(0).map(item=>`<img src="../photo/icon/icons8-star-16.png" alt=""/>`).join('')
                                          }                          
                                      </div>           
                                  </div>
                      <div class="product_price">${item.price == 0 ? "رایگان" : item.price}</div>
                      <button class="product_btn"><a href="/src/course/course.html?name=${item.shortName}">اطلاعات بیشتر</a></button>
                  </div>
          `)      

      
    })
    : category.innerHTML=`<div class="notting_category"><h3>ایتمی موجود نمی باشد</h3></div>`   
  }

 

const changeRowAndColumn=(locations,category,data)=>{
  category.innerHTML="";
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
const sortCategory=(data,key)=>{
  switch (key) {
    case "مرتب سازی بر اساس امتیاز":
      const result1=data.sort(function (a,b){return b.courseAverageScore - a.courseAverageScore})
     return result1;
    case "مرتب سازی بر اساس محبوبیت":
      const result2=data.sort(function (a,b){return b.courseAverageScore - a.courseAverageScore})
     return result2;
    case "مرتب سازی بر اساس آخرین":
    const result3=data.sort(function (a,b){return new Date(a.createdAt) - new Date(b.createdAt)})
    console.log(result3);
    return result3;
    case "مرتب سازی بر اساس ارزان ترین":
      const result4=data.sort(function (a,b){return (a.price) - (b.price)})
     return result4;
    case "مرتب سازی بر اساس گران تربن":
      const result5=data.sort(function (a,b){return (b.price) - (a.price)})
     return result5;

    default:
      break;
  }
}
const searchInput=(data,valResult)=>{
 const res= data.filter(item=>{  
    return (item.name.toLowerCase()).includes(valResult)
  })
  return res
}
const getAndShowCourses=async(url)=>{
  const data=await fetch(`http://localhost:4000/v1/courses/${url}`,{
          method:'GET',
          headers:{
            Authorization:`Bearer ${getToken()}`
          }
        })
        const response=await data.json()
        return response
}
const getAndShowEpisode=async()=>{
        const data=await fetch(`http://localhost:4000/v1/courses/sessions`)
        const response=await data.json()
        return response
}
const getAndShowSession=async(url,id)=>{
        const data=await fetch(`http://localhost:4000/v1/courses/${url}/${id}`,{
          method:'GET',
          headers:{
            Authorization:`Bearer ${getToken()}`
          }
        })
        const response=await data.json()
        return response
}

export { swalalert , getToken , setTokenToLocalstorage , getTokenFromLocalstorage , geturlSearch ,getAndShowCategory ,
  changeRowAndColumn ,fetchCategory ,sortCategory,searchInput ,getAndShowCourses ,getAndShowEpisode,getAndShowSession ,pagination}