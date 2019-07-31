#!/usr/local/bin/node


const {spawn} = require('child_process')
process.env.PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

process.stdin.on('readable', () => {
    let input = []
    let chunk
    while (chunk = process.stdin.read()) {
      input.push(chunk)
    }
    input = Buffer.concat(input)

    let content = input.slice(4, 4+input.readUInt32LE(0))
    let object = JSON.parse(content.toString())
    
    messageHandler(object)
    
})



function messageHandler(msg) {
     
    let {command,cwd}=msg

    let tmp=command.split(" ")
    let exec=tmp[0]
    let args=tmp.splice(1)
   
    let options={
        cwd: cwd,
        env: process.env
    }
    
    let terminal=spawn(exec,args,options)
    terminal.stdout.on('data',(data)=>{
        sendMessage(data.toString())
    }) 
    
    terminal.stderr.on('data', (data) => {
        sendMessage(data.toString())
    })
      
    terminal.on('close', (code) => {
    })
    
}


function sendMessage (msg) {
    //object to native msg
    let buffer = Buffer.from(JSON.stringify(msg))
    let header = Buffer.alloc(4)
    header.writeUInt32LE(buffer.length, 0)
    let data = Buffer.concat([header, buffer])
    process.stdout.write(data)
}