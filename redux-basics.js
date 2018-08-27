const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

//Reducers -- need to be created before creating store as it needs to be passed to the store.
// there can be only reducer. you can definitely combine multiple reducers but there will be only reducer at the end.
const rootReducer = (state = initialState, action) => {
    //need to return the new state
    if(action.type == 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if(action.type == 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
};

//Store
const store = createStore(rootReducer);
console.log(store.getState());

//Subscriptions --- they should be written before dispatching any action.
store.subscribe(() => {
    console.log("[Subscriptions]: ", store.getState());
});

//Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});

console.log(store.getState());

