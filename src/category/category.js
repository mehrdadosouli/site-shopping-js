import {geturlSearch ,getAndShowCategory ,changeRowAndColumn ,fetchCategory ,sortCategory ,searchInput,swalalert,pagination } from "../js/funcs/utils.js"
const category=document.querySelector('.category');
const topbar_row=document.querySelector('.topbar_row');
const topbar_column=document.querySelector('.topbar_column');
const topbar_sort=document.querySelector('.topbar_sort');
const inputSearch=document.querySelector('#inputSearch');
const handler=(event,i)=>{
    window.location.href=`/src/category/category-info.html?cat=/category-info/frontend&page=${i}`
}
window.handler=handler

window.addEventListener('load',()=>{
    const resul=geturlSearch('cat').slice(15)
    fetchCategory(resul).then(data=>{
        let fetchData=[...data]
        const pagin=pagination(category,fetchData,4)
            getAndShowCategory(category,pagin)        
        topbar_column.addEventListener('click',()=>{
            changeRowAndColumn('column',category,pagin);
        })

        topbar_row.addEventListener('click',()=>{
            changeRowAndColumn('row',category,pagin);
        })

        topbar_sort.addEventListener('change',(e)=>{
           const resultNewData=sortCategory(fetchData,e.target.value)
           fetchData=resultNewData
           const pagin=pagination(category,fetchData,4)
           getAndShowCategory(category,pagin)
        })
        inputSearch.addEventListener('keyup',(event)=>{
            let inputVal=event.target.value.toLowerCase();
            const resultSearch=searchInput(fetchData,inputVal)          
            if(resultSearch.length){
                const pagin=pagination(category,resultSearch,4)
                getAndShowCategory(category,pagin)
            }else{
                swalalert('چیزی یافت نشد','warning','ok',()=>{})
                category.innerHTML=`<div class="notting_category"><h3>ایتمی موجود نمی باشد</h3></div>`
            }
        })
    })
})
