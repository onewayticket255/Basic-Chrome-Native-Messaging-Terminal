
let cwd=undefined
let host="mpv"



chrome.webNavigation.onCreatedNavigationTarget.addListener((detail)=>{
    let bilibili=/https:\/\/www.bilibili.com\/video\/av.*/
    if(detail.url.match(bilibili)){
        let port = chrome.runtime.connectNative(host)
        command=`mpv ${detail.url}`
        port.postMessage({cwd,command})      
    }
})
 