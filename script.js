//STORE'S STATE i.e. an account state in a bank
let accountState = {
  name: "Yaman Sharma",
  age: 28,
  accountNumber: "1234567890",
  balance: 100,
};

//ACTIONS - actions customer do in the bank
const CHECK_BALANCE = "ACCOUNT/CHECK BALANCE";
const INCREMENT = "ACCOUNT/INCREMENT BALANCE BY 1";
const DECREMENT = "ACCOUNT/DECREMENT BALANCE BY 1";
const INCREMENT_BY = "ACCOUNT/INCREMENT BY";
const DECREMENT_BY = "ACCOUNT/DECREMENT BY";

// REDUCER/Cashier - AccountReducer/AccountUpdater
// Recevies the bank statement aka state and recieves an action from me
// checks the action type and makes a new statement (doesn't update the state directly as it will be critical) and provide to store i.e. bank Central System to update
let accountReducer = (state = accountState, action) => {
  switch (action.type) {
    case CHECK_BALANCE:
      return state;
    case INCREMENT:
      return { ...state, balance: state.balance + 1 };
    case DECREMENT:
      return { ...state, balance: state.balance - 1 };
    case INCREMENT_BY:
      return { ...state, balance: state.balance + action.payload };
    case DECREMENT_BY:
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
};

export const myCreateStore = (reducer) => {
  let state;
  let listeners=[];
  const store = {
    getState() {
      return state;
    },
    dispatch(action) {
      if(!action.type){
        //throwing a type error when the action doesnt have a type parameter
        throw TypeError("An action object must have a type")
      }
      state = reducer(state, action);
      //once any dispatch runs, we will call all the subscribe listeners
      listeners.forEach((listener)=>{
        listener();
      })
    },
    subscribe(listener) {
      //in subscribe we receive a callback aka listener which we need to run when any dispatch runs
      // these listeners can be many i.e. we can call subscribe with different listeners
      listeners.push(listener);
      //unsubscribe returns a function which when called removes that listener
      return ()=>{
        //this will give the index of the current listener
        const listenerIndex = listeners.findIndex((regListener)=> regListener === listener);
        //once we have the index of the listener, we will call the splice method on it to remove it from listeners
        listeners.splice(listenerIndex, 1)
      }
    },
  };
  //initially our state will be empty.
  //dispatching an action of @@INIT will go to default state of our reducer and return us state.
  store.dispatch({ type: "@@INIT" });
  return store;
};

const store = myCreateStore(accountReducer);

//SUBSCRIBE is like a notification system which notifies if anything in the state changes i.e. if anything in bank acocunt changes
store.subscribe(()=>{
  //listen for changes in state and console logs
  console.log(store.getState(), "subscribe")
})

const unsubscribe = store.subscribe(()=>{
  console.log("Another Subscribe")
})
// this will unsubscibe the above listener and calling unsubscribe will remove the listener from listeners array
unsubscribe();


//with getState() we can ask the current state
console.log(store.getState(), "store");

//DISPATCH - Telling the reducer to perform an action i.e. cashier do this
store.dispatch({ type: DECREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch({ type: DECREMENT_BY, payload: 10 });
