// scripts.js
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend === '' || divider === '' ){
    document.body.innerHTML =  /* html */ " Division not performed. Both values are required in inputs. Try again."
 }
        else if  (divider  < 0) {
            result.innerHTML = "Division not performed. Invalid number provided. Try again."
            console.error("invalid")
            } 


                    else if (isNaN(dividend)||isNaN(divider)) {
  
             document.body.innerHTML =   "Something critical went wrong. Please reload the page"
                console.error("invalid")
          } 

     else 


    {
  result.innerText = Math.floor( dividend / divider)
   
  }


});























//const quotient = Math.floor (dividend/  divider);
//result.innerText = quotient;



//if (dividend ===6 && divider ===3){
  //  const quotient = Math.floor (dividend/  divider);
    //result.innerText = quotient;
    
//}
