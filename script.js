let state = {
    count: 0,
    name: "jacob"
}

let prevState = state;

console.log(prevState, "prevState")

function increment () {
    //mutating state - prevState will be same as current state
    // state.count = state.count + 1;
    //not mutating state - prevState will not be same as current state
    //we spread state to preserve the other state in the object
    //we are providing a new state and hence during comparison it will not match the address and update
    state = {
        ...state,
        count: state.count + 1
    }
}

increment();
console.log(state)
increment();
console.log(state)


