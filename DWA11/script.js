

/**
  * Maximum allowed number.
  * @constant {number}
  */

 const MAX_NUMBER = 15

/**
 * Minimum allowed number.
 * @constant {number}
 */

const MIN_NUMBER = -5
/**
 * The number input element.
 * @type {HTMLInputElement}  
 * 
 */
const STEP_AMOUNT = 1
/**
 * The number input element.
 * @type {HTMLInputElement}  
 * 
 */

const ActionTypes= {
    increment:"increment",
    decrement:"decrement",
    reset:"reset",
};


//action creators
function increment() {
return { type:ActionTypes.increment };
}

function decrement() {
    return { type:ActionTypes.decrement };
}
function reset() {
    return { type:ActionTypes.reset};
}

//define reducer function
function counterReducer(state = 0,action) {
    switch(action.type) {
        case ActionTypes.increment:
            return state + STEP_AMOUNT;
        case ActionTypes.decrement:
            return state - STEP_AMOUNT;
        case ActionTypes.reset:
            return 0;
            default:
            return state;
    }
}

//Redux store
const store = Redux.createStore(counterReducer);

//update UI
let currentValue = store.getState();
function updateUI() 
{
    currentValue = store.getState();
    if(currentValue <= MIN_NUMBER){
        subtract.disabled = true;
    } else if(currentValue >= MAX_NUMBER) {
        add.disabled = true
    } else {
        subtract.disabled = false;
        add.disabled =false;
    }

    console.log(currentValue)
}

// subscribe to state and update
store.subscribe(updateUI);

const number = document.querySelector('[data-key="number"]')
/**
 * The subtract button element.
 * @type {HTMLButtonElement}
 */

const subtract = document.querySelector('[variant="danger"]')
/**
 * The add button element.
 * @type {HTMLButtonElement}
 */


const add = document.querySelector('[variant="success"]')



const resetbtn = document.querySelector('[variant="default"]')

subtract.addEventListener("click",() =>{
    store.dispatch(decrement());
});

add.addEventListener("click",() =>{
    store.dispatch(increment());
});
resetbtn.addEventListener("click",() =>{
    store.dispatch(reset());
    alert("The reset button has been pressed");
});

//initialize UI
updateUI();

// /**
//  * Event handler for the subtract button click event.
//  * @prop {Function} subtractHandler - Event handler for the subtract button click event.
//  * @param {Event} event - The click event object.
//  */
// const subtractHandler = (event) => {
//     /**
//      * The new value after subtracting one from the current number value.
//      * @type {number}
//      * @prop {number} newValue - The new value after subtracting one.
//      */
//     const newValue = parseInt(number.value) - 1;

//     number.value = newValue;

//     if (newValue <= MIN_NUMBER) {
//         subtract.disabled = true;
//     } else {
//         subtract.disabled = false;
//     }
// };


// const addHandler = () => {
//     const newValue = parseInt(number.value) + 1
//     number.value = newValue

//     if (newValue >= MAX_NUMBER) {
//         add.disabled = true
//     } else {
//         add.disabled = false
//     }
// }

// const resetHandler = () => {
//     number.value = 0;
//     add.disabled = false;
//     subtract.disabled = false;
//     showMessage("Reset has been pressed");
// }

// const showMessage = (message) => {
//     alert(message);
//     message.disabled = false
    
// };



// subtract.addEventListener('click', subtractHandler)
// add.addEventListener('click', addHandler)
// reset.addEventListener('click', resetHandler )




