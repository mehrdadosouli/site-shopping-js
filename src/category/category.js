import {geturlSearch ,getAndShowCategory ,changeRowAndColumn ,fetchCategory ,sortCategory ,searchInput,swalalert} from "../js/funcs/utils.js"
const category=document.querySelector('.category');
const topbar_row=document.querySelector('.topbar_row');
const topbar_column=document.querySelector('.topbar_column');
const topbar_sort=document.querySelector('.topbar_sort');
const inputSearch=document.querySelector('#inputSearch');


window.addEventListener('load',()=>{
    const resul=geturlSearch('cat').slice(15)
    fetchCategory(resul).then(data=>{
        let fetchData=[...data]
        getAndShowCategory(category,fetchData)
        
        topbar_column.addEventListener('click',()=>{
            changeRowAndColumn('column',category,fetchData);
        })

        topbar_row.addEventListener('click',()=>{
            changeRowAndColumn('row',category,fetchData);
        })

        topbar_sort.addEventListener('change',(e)=>{
           const resultNewData=sortCategory(fetchData,e.target.value)
           fetchData=resultNewData
           getAndShowCategory(category,resultNewData)
        })
        inputSearch.addEventListener('keyup',(event)=>{
            let inputVal=event.target.value.toLowerCase();
            const resultSearch=searchInput(fetchData,inputVal)          
            if(resultSearch.length){
                getAndShowCategory(category,resultSearch)
            }else{
                swalalert('چیزی یافت نشد','warning','ok',()=>{})
                category.innerHTML=`<div class="notting_category"><h3>ایتمی موجود نمی باشد</h3></div>`
            }
        })
    })
})
