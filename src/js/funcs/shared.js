import { getMe , isLogin } from "./auth.js"


const info=document.querySelector('.left h3')
const list=document.querySelector('.list') 
const menu_right=document.querySelector('.menu_right') 

const getInfoUser=()=>{
    const isUserLogin = isLogin()
    if(isUserLogin){
    getMe().then(data=>{
        info.innerHTML=`<a href="/src/login/login.html">${data.name}</a>`  
    })
    }else{
        info.innerHTML='<a href="/src/login/login.html">Login</a>'
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



// menu
const getALllMenu=async()=>{
    const fetchData=await fetch(`http://localhost:4000/v1/menus`)
    const res=await fetchData.json()
    res.map(item=>{
    menu_right.insertAdjacentHTML('beforeend',`
    <div class="menu">
        <ul>
            <li><a href=/src/category/category-info.html?cat=${item.href}&page=1>${item.title}</a>
                ${item.submenus.length ? `<ul class='submenus'>${item.submenus.map(elem=>`<li><a href=${elem.href}>${elem.title}</a></li>`).join('')}</ul>` :''}
            </li>
        </ul>
    </div>`)
 })
}


export {getInfoUser ,menuTopBar ,getALllMenu }
