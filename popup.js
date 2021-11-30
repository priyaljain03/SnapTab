document.getElementById("snapTab").addEventListener('click',()=>{
    let tabs = []
    chrome.windows.getAll({populate:true}).then((data)=>{
        data.forEach((item)=>{
            item.tabs.forEach((tab)=>{
                tabs.push(tab.url)
            })
        })
        let today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        let dateTimeNow = date + " " + time
        
       
    })
    
})

document.getElementById("manageBtn").addEventListener('click',()=>{
    chrome.tabs.create({active:true})
})