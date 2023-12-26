const api_Key =  "b477440fe0fc111bd5ea3d8e";
const url =  " https://v6.exchangerate-api.com/v6/" +api_Key;
const url2= " https://v6.exchangerate-api.com/v6/b477440fe0fc111bd5ea3d8e/latest/"


const oneValue= document.getElementById("oneValue");
const twoValue = document.getElementById("twoValue")
const oneList = document.getElementById("one_list")
const twoList = document.getElementById("two_list")
const moneyAmount = document.getElementById("moneyAmount")
const exchangeCalculate = document.getElementById("exchangeCalculate")
const resultValue = document.getElementById("resultValue")
const resultValue2 = document.getElementById("resultValue2")

async function showMoney(){
    document.querySelector("#load").style.display = "none"
    try{
        const response = await fetch(url + "/codes");
       
        const data = await response.json();
        const items = await data.supported_codes;
        let options;
        for(let exchange of items){
            options += `
            <option value = ${exchange[0]}> ${exchange[1]}</option>`

            oneList.innerHTML = options;
            twoList.innerHTML = options
        }

    }catch(err){
        throw new Error(err)
    }
}
showMoney()
exchangeCalculate.addEventListener("click", function(){
    document.querySelector("#load").style.display = "block"
    const exchange1 = oneValue.value;
    const exchange2 = twoValue.value;
    const  amount = moneyAmount.value;
    async function showExchange(){
        const resp = await fetch(url + "/latest/" + exchange1)
        const data = await resp.json();
        const outpot = data.conversion_rates;
        const result =  (data.conversion_rates[exchange2]*amount).toFixed(2);
    
     let valueResult;
        valueResult = `
        <div class="card border-primary shadow mt-2" >
            <div class="card-body text-center " style=" font-size:24px; font-weight:bold;">
            ${amount} ${exchange1} = ${result} ${exchange2}
            </div>
        
        </div>
        `
   resultValue.innerHTML = valueResult
   for(let otherExchange in outpot){
    resultValue2.innerHTML += `
    <div class =  " card border-primary d-inline-flex ava mt-2"> 
    <ul style="list-style-type:none" class="list-group list-group-horizontal d-inline-flex">
      <li class="list-group-item float-end">
      ${otherExchange}:${outpot[otherExchange]}
      </li>
    </ul>
    </div>
    `
   }

   document.querySelector("#load").style.display="none"

    }
    setTimeout(()=>{
        document.getElementById("resultValue2").remove()
    },10000)

    showExchange()
})
