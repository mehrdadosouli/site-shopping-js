// get all products and popular products

const getALlProductAndShow=async(api,elem)=>{
    
  const elems=document.querySelector(`.${elem}`) 
  const data=await fetch(`http://localhost:4000/v1/${api}`)
  const result =await data.json();

  api=='courses' ? 
  result.map(course=>{
      elems.innerHTML+=`
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
                      Array(5 - course.courseAverageScore).fill(0).map(item=>
                     `<img src="../photo/icon/icons8-star-24.png" alt="">`
                      ).join('')
                 }
                  ${
                       Array(course.courseAverageScore).fill(0).map(item=>
                      `<img src="../photo/icon/icons8-star-16.png" alt="">`
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
      <img src='http://localhost:4000/courses/covers/${course.cover}' alt="">
      <h4 class="title">${course.name}</h4>
                <div class="info_product">
                    <div class="info_product__right">
                        <img src="../photo/icon/icons8-teacher-30.png" alt="">
                        <span>${course.creator}</span>
                    </div>
                    <div class="info_product__left">
                    ${
                        Array(5 - course.courseAverageScore).fill(0).map(item=>
                        `<img src="../photo/icon/icons8-star-24.png" alt="">`
                        ).join('')
                    }
                    ${
                        Array(course.courseAverageScore).fill(0).map(item=>
                        `<img src="../photo/icon/icons8-star-16.png" alt="">`
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


// get all article
const getALllArticle=async()=>{
  const articles=document.querySelector('.articles') 
  const fetchData=await fetch(`http://localhost:4000/v1/articles`)
  const res=await fetchData.json()
  res.map(item=>{
      articles.insertAdjacentHTML('beforeend',`<div class="article"><img src="http://localhost:4000/courses/covers/${item.cover}" />
      <span>${item.title}</span>
      </div>
          `)
      })
}

window.addEventListener('load',()=>{
  getALlProductAndShow('courses','new_products')
  getALlProductAndShow('courses/popular','mySwiper')
  getALllArticle()
})