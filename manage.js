console.log("Manage file loading")
function showItems (){
  chrome.storage.local.get("Alltabs",(items)=>{
    let listOfItems = items["Alltabs"];
    let html = ``
    listOfItems.forEach((item,index)=>{
        html+= `
        <div class="col">
        <div class="card" style="width: 18rem;">
        
          <div class="card-body">
            <div class="row">
              <div class="col-6">
              <h5 class="card-title" style="font-size:13px;">${item.timestamp}</h5>
              </div>
              <div class="col-3">
              <h6 class="badge rounded-pill bg-success mt-0 openAll" id="${index}">Open All</h6>
              </div>
              <div class="col-3 m-0">
              <h6 class="badge rounded-pill bg-danger mt-0  delete" id="${index}">Delete</h6>
              </div>
            </div>    
           <div >
            
            ${item.Tabs.map(tab=>{
              return (`<li class="card-subtitle mb-2 mt-2 text-muted"><a href="${tab}">${tab}</a></li>`)
          }).join("")
        }   
        </div>
        
        
          </div>
        </div>
      </div>
   `
    })

    document.getElementById("row").innerHTML = html
    deleteNode()
    openAll(listOfItems)
})
}



function deleteNode (){
  let deleteBtns = [...document.getElementsByClassName('delete')]
  deleteBtns.forEach(btn =>btn.addEventListener('click',()=>{
    console.log(btn)
    chrome.storage.local.get("Alltabs",(items)=>{
      let allItems = items["Alltabs"]
      console.log(btn)
      allItems.splice(btn.id,1)
      chrome.storage.local.set({"Alltabs":allItems},()=>{
        console.log("This is result")
        showItems()
      })
      
    })
  })
)
}


function openAll(Alltabs){
  console.log("Opened all tabs")
  let openAllBtns = [...document.getElementsByClassName("openAll")]
  openAllBtns.forEach(item=>item.addEventListener('click',(e)=>{
    console.log(e.target)
    let tabs = Alltabs[e.target.id].Tabs
    tabs.forEach((tab)=>{
      chrome.tabs.create({url:tab})
    })
    console.log(tabs)
  }))
  
}

showItems()