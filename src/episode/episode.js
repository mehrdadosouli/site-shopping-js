import {getAndShowEpisode,getAndShowSession,geturlSearch } from "../js/funcs/utils.js"
const right=document.querySelector('.right_side')
const left=document.querySelector('.left_side')
const video=document.querySelector('video')
const name=geturlSearch('name')
const id=geturlSearch('id')
window.addEventListener('load',()=>{
    getAndShowEpisode().then(data=>{
        if(data.length){
            data.map((item,index)=>{
        right.insertAdjacentHTML('beforeend',`<div>
                <div style="display:flex;justify-content:right;align-items:center">
                <span class="index_item">${index + 1}</span>
                <h3 class="heading" >
                 ${item.free ? `<a href=${`/src/episode/episode.html?name=${name}&id=${item._id}`}> ${item.title}</a> رایگان ` : `<span> ${item.title}</span>`} 
                </h3>
                </div>
        </div>
        `)
        })
        }else{
            right.insertAdjacentHTML('beforeend',`<div>ویدیو یی موجود نیست</div>`)
        }
    })
    

    getAndShowSession(name,id).then(data=>{

        video.setAttribute('src',`http://localhost:4000/courses/covers/${data.session.video}`)
    })
})