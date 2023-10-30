import {geturlSearch ,getAndShowCategory ,changeRowAndColumn ,fetchCategory} from "../js/funcs/utils.js"
const category=document.querySelector('.category');
const topbar_row=document.querySelector('.topbar_row');
const topbar_column=document.querySelector('.topbar_column');
const topbar_sort=document.querySelector('.topbar_sort');


window.addEventListener('load',()=>{
    const resul=geturlSearch('cat')
    fetchCategory(resul).then(data=>{
        const fetchData=[...data]
        getAndShowCategory(category,fetchData)
        
        topbar_column.addEventListener('click',()=>{
            changeRowAndColumn('column',category,fetchData);
            topbar_sort.value='column'
        })

        topbar_row.addEventListener('click',()=>{
            changeRowAndColumn('row',category,fetchData);
            topbar_sort.value='row'
        })

        topbar_sort.addEventListener('change',(e)=>{
            if(e.target.value=='row'){
                changeRowAndColumn('row',category,fetchData)
            }
            if(e.target.value=='column'){
                changeRowAndColumn('column',category,fetchData)
            }
        })
    })
    
    
})
