console.log("Manage file loading")
chrome.storage.local.get("Alltabs",(items)=>{
    let listOfItems = items["Alltabs"].reverse();
    console.log(listOfItems.sort())
    let html = ``
    listOfItems.forEach((item)=>{
        html+= `
        <div class="col">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${item.timestamp}</h5>
            ${item.Tabs.map(tab=>{
              return (`<li class="card-subtitle mb-2 text-muted"><a href="${tab}">${tab}</a></li>`)
          }).join("")
        }   
          </div>
        </div>
      </div>
   `
    })

    document.getElementById("row").innerHTML = html
})