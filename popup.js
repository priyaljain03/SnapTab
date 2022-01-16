document.getElementById("snapTab").addEventListener('click', (e) => {
    let tabs = []
    chrome.windows.getAll({ populate: true }).then((data) => {
        data.forEach((item) => {
            item.tabs.forEach((tab) => {
                tabs.push(tab.url)
            })
        })
        let today = new Date()
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
        let time = today.getHours() + ":" + today.getMinutes() + (today.getHours() > 0 && today.getHours() < 12 ? 'AM' : 'PM')
        // let dateTimeNow = date + " " + time

        let obj = {
            time: time,
            date: date,
            Tabs: tabs
        }

        chrome.storage.local.get("Alltabs", (items) => {
            console.log(items)
            let listOfItems;
            if (JSON.stringify(items) == '{}') {
                console.log("Here")
                listOfItems = []
            } else {
                console.log("Here2")
                listOfItems = items["Alltabs"]
            }
            listOfItems.unshift(obj)
            chrome.storage.local.set({ "Alltabs": listOfItems }, () => {
                e.target.innerHTML = "Snapped"
                // window.close()  
            })
        })
    })
})


document.getElementById("manageBtn").addEventListener('click', () => {
    chrome.runtime.openOptionsPage()
})