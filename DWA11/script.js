

/**
  * Maximum allowed number.
  * @constant {number}
  */

 const MAX_NUMBER = 15;

/**
 * Minimum allowed number.
 * @constant {number}
 */

const MIN_NUMBER = -5;
/**
 * The number input element.
 * @type {HTMLInputElement}  
 * 
 */
const STEP_AMOUNT = 1;
/**
 * The number input element.
 * @type {HTMLInputElement}  
 * 
 */

const ActionTypes = {
    INCREMENT: "INCREMENT",
    DECREMENT : "DECREMENT",
    RESET: "RESET",
};


//action creators
function incrementCounter() {
return { type: ActionTypes.INCREMENT };
}

function decrementCounter() {
    return { type: ActionTypes.DECREMENT };
}
function resetCounter() {
    return { type: ActionTypes.RESET};
}

//define reducer function
function counterReducer(state = 0,action) {
    switch(action.type) {
        case ActionTypes.INCREMENT: return state + STEP_AMOUNT;
        case ActionTypes.DECREMENT: return state - STEP_AMOUNT;
        case ActionTypes.RESET:return 0;
            default:
            return state;
    }
}

//Redux store
const store = Redux.createStore(counterReducer);

//update UI
let currentValue = store.getState();
function updateUI() {

    currentValue = store.getState();
    number.value = currentValue.toString();
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



const reset = document.querySelector('[variant="default"]')

subtract.addEventListener("click",() => {
    store.dispatch(decrementCounter());
});

add.addEventListener("click",() => {
    store.dispatch(incrementCounter());
});
reset.addEventListener("click",() => {
    store.dispatch(resetCounter());
    alert("The reset button has been pressed");
});

//initialize UI
updateUI();
           


























