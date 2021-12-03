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
        
        let obj ={
            timestamp:dateTimeNow,
            Tabs : tabs
        } 

        chrome.storage.local.get("Alltabs",(items)=>{
            console.log(items)
            let listOfItems ;
            if(JSON.stringify(items) == '{}'){
                console.log("Here")
                listOfItems = []
            }else{
                console.log("Here2")
                listOfItems = items["Alltabs"]
            }
            listOfItems.push(obj)
            chrome.storage.local.set({"Alltabs":listOfItems},()=>{         
            })
        }) 
    })
})

document.getElementById("manageBtn").addEventListener('click',()=>{
    chrome.runtime.openOptionsPage() 
})