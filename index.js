
const save=document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl=document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let myLeads=[]
const leadLocalStorage=JSON.parse(localStorage.getItem("myLeadsWeb"))

if(leadLocalStorage){

    myLeads=leadLocalStorage;
    render(myLeads)

}


tabBtn.addEventListener("click",()=>{

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(myLeads)
        localStorage.setItem("myLeadsWeb", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick",()=>{

    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

save.addEventListener("click", function(){
    
    clearLeadsText()
    saveLocal()
    render(myLeads)
    
})

function saveLocal(){
 
    localStorage.setItem("myLeadsWeb",JSON.stringify(myLeads))
}

function clearLeadsText(){

    myLeads.push(inputEl.value)
    inputEl.value=""
}

function render(myLeads){

    let listItems=""
    for(let i=0;i<myLeads.length;i++){
       listItems+=`
       <li>
            <a href='${myLeads[i]}' target='_blank' >
                ${myLeads[i]}
            </a>
        </li>
       `
    }
    ulEl.innerHTML=listItems
}