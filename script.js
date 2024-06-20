const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const message = document.querySelector(".message");

document.addEventListener("load",()=>{
    updateRates();
})

for(let select of dropdowns)
// to perform the operations for each of the "from" and "to" dropdown lists
{
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // setting defaults as from - USD and to - INR
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newLink = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newLink;
}

const updateRates = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === '' || amtVal < 0){
        alert("Please enter a valid amount!");
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let excAmt = amtVal*rate;

    message.innerText = `${amtVal} ${fromCurr.value} = ${excAmt} ${toCurr.value}`;
};

btn.addEventListener("click",async (event)=>{
    // to prevent automatic refreshing of page when form is submitted
    event.preventDefault();
    updateRates();
});