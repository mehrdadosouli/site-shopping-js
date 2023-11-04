import {geturlSearch,getAndShowCourses} from "../js/funcs/utils.js"
function getAllClass(params) {
    return document.querySelector(`.${params}`)
}

window.addEventListener('load',(e)=>{
    const url=geturlSearch('name')

    getAndShowCourses(url).then(data=>{
        console.log(data);
        getAllClass('course-info__link').innerHTML='آموزش '+ data.categoryID.title;
        getAllClass('course-info__title').innerHTML=data.name;
        getAllClass('course-info__text').innerHTML=data.description;
        getAllClass('course-info__video').poster=`http://localhost:4000/courses/covers/${data.cover}`;
        getAllClass('techer-details__header-link').innerHTML=data.creator.name;
        getAllClass('techer-details__header-skill').innerHTML=data.categoryID.name;
        getAllClass('techer-details__footer').innerHTML=data.description;
        getAllClass('techer-details__header-img').src="../photo/8.jpg";
        getAllClass('course-info__register-title').innerHTML=data.isUserRegisteredToThisCourse ? 'شما دانشجو ی دوره هستید' : `<span><a href="#">خرید دوره</a></span>`;
        console.log(data.sessions.length);
        if(data.sessions.length){
        data.sessions.map((item,index)=>{
                getAllClass('accordion').insertAdjacentHTML('beforeend',`<div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        معرفی دوره
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body introduction__accordion-body">
                        <div class="introduction__accordion-right">
                        <span class="introduction__accordion-count">${Number(index + 1)}</span>
                        <i class="fab fa-youtube introduction__accordion-icon"></i>
                        ${
                            (item.free || item.isUserRegisteredToThisCourse) ?
                        
                            `<a href="#" class="introduction__accordion-link">
                                 ${item.title}
                            </a>`
                                :
                            `<span href="#" class="introduction__accordion-link">
                                ${item.title}
                            </span>`
                        }
                        <span style="padding-right:2px">   
                        ${
                            !(item.free) ? `<i class="fa fa-lock" aria-hidden="true"></i>` : ' رایگان '
                        }
                        </span>
                        </div>
                        <div class="introduction__accordion-left">
                        <span class="introduction__accordion-time">
                            ${item.time}
                        </span>
                        </div>
                    </div>
                    </div>
                </div>`)
            })
        }else{
            getAllClass('accordion').insertAdjacentHTML('beforeend',`<div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    معرفی دوره
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body introduction__accordion-body">
                    <div class="introduction__accordion-right">
                    <span>دوره ای وجود ندارد</span>                        
                </div>
                </div>
            </div>`)
        }
    })
})