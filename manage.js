console.log("Manage file loading")


function showItems() {
  chrome.storage.local.get("Alltabs", (items) => {

    let listOfItems = items["Alltabs"];
    let html = ``
    let counter = 0
    listOfItems.forEach((item, index) => {

      html += `
        <div class="col my-5">
        <div class="card-container">
          <div class="card"">
          <div class="card-header sticky-top">
          <button type="button" class="btn-close btn-close-white btn-close-sm delete" id="${index} aria-label="Close"></button>
          <h5 class="card-title m-0 p-0" style="font-size:13px;">${item.date} | ${item.time}</h5>
        </div> 
            <div class="card-body mb-4">
             
  
                  ${item.Tabs.map(tab => {
        return (`<li class="card-subtitle mb-2 mt-2 text-muted"><a href="${tab}">${tab}</a></li>`)
      }).join("")
        }   
            
            </div>
            <div class="card-footer footer text-muted">
            <hr />
        </div>
          </div>    
          
        </div> 
       
        <div><span class="btn btn-outline mt-2 openAll" id="${index}">Open all</span></div>
        
      </div>
   `
    })

    document.getElementById("row").innerHTML = html
    deleteNode()
    openAll(listOfItems)
  })
}



function deleteNode() {
  let deleteBtns = [...document.getElementsByClassName('delete')]
  deleteBtns.forEach(btn => btn.addEventListener('click', () => {
    console.log(btn)
    chrome.storage.local.get("Alltabs", (items) => {
      let allItems = items["Alltabs"]
      console.log(btn)
      allItems.splice(btn.id, 1)
      chrome.storage.local.set({ "Alltabs": allItems }, () => {

        showItems()
      })

    })
  })
  )
}


function openAll(Alltabs) {
  console.log("Opened all tabs")
  let openAllBtns = [...document.getElementsByClassName("openAll")]
  openAllBtns.forEach(item => item.addEventListener('click', (e) => {
    console.log(e.target)
    let tabs = Alltabs[e.target.id].Tabs
    tabs.forEach((tab) => {
      chrome.tabs.create({ url: tab })
    })
    console.log(tabs)
  }))

}

showItems()