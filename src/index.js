var swiperProjects = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     pagination: {
       el: ".swiper-pagination",
     },
     breakpoints: {
           1200: {
             slidesPerView: 2,
             spaceBetween: -56,
       
      
           },
         },
   });