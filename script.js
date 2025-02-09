import { createStore } from "https://cdn.skypack.dev/redux";

//STORE'S STATE i.e. an account state in a bank

const accountState = {
  name: "Yaman Sharma",
  age: 28,
  accountNumber: "123456789",
  balance: 4000,
};

//ACTION TYPES

const CHECK_BALANCE = "ACCOUNT/CHECK_BALANCE";
const INCREMENT = "ACCOUNT/INCREMENT";
const DECREMENT = "ACCOUNT/DECREMENT";
const INCREMENTBY = "ACCOUNT/INCREMENTBY";
const DECREMENTBY = "ACCOUNT/DECREMENTBY";

//REDUCER/CASHIER - Acocunt Reducer/Account Updater
// It's like a cashier in the bank, which takes ur initial state (aka bank statement) and an action to perform
// It checks the action type in action and makes a new statement (but it doesnt directly update state as it will be critical) and provides to store (ie. bank central system to update)

let accountReducer = (state = accountState, action) => {
  switch (action.type) {
    case CHECK_BALANCE:
      return state;
    case INCREMENT:
      return {
        ...state,
        balance: state.balance + 100,
      };
    case DECREMENT:
      return {
        ...state,
        balance: state.balance - 100,
      };
    case INCREMENTBY:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case DECREMENTBY:
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    default:
        return state;
  }
};

// We call the reducer with state and action payload under manually

// console.log(accountReducer(accountState, {type: CHECK_BALANCE}));
// console.log(accountReducer(accountState, {type: INCREMENT}));
// console.log(accountReducer(accountState, {type: DECREMENT}));
// console.log(accountReducer(accountState, {type: INCREMENT_BY, payload: 10}));
// console.log(accountReducer(accountState, {type: DECREMENT_BY, payload: 10}));

//In case of redux, we pass the reducer to createStore function
const store = createStore(accountReducer);


//SUBSCRIBE is like a notification system which notifies if anything in the state changes i.e. if anything in bank acocunt changes
store.subscribe(()=>{
    //listen for changes in state and console logs
    console.log(store.getState(), "state")
})

//with getState() we can ask the current state
console.log(store.getState(), "store")

//DISPATCH - Telling the reducer to perform an action i.e. cashier do this
store.dispatch({type: DECREMENT});
store.dispatch({type: INCREMENT});
store.dispatch({type: DECREMENTBY, payload:100});