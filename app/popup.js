let cwd=undefined
let host="mpv"
document.getElementById('command').addEventListener('keydown',(event)=>{
      
        if (event.keyCode ==13) {
        let port = chrome.runtime.connectNative(host)
        let command=document.getElementById('command').value.split(/\n/).pop()
        let tmp=command.split(" ")   
        
        if(tmp[0]=="cd"){
            cwd=tmp[1]
        }
   
       
        port.postMessage({cwd,command})


        port.onMessage.addListener(msg=>{
            var p = document.createElement("p");
            p.appendChild(document.createTextNode(msg))
            document.getElementById("command").insertAdjacentElement("afterend",p)
        })
        
        port.onDisconnect.addListener(()=>{
         alert("Disconnected")
        })

         
    }
})