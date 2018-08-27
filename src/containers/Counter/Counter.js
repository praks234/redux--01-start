import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctrl} />
                <CounterControl label="Increment" clicked={this.props.onIncrementHandler} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementHandler}  />
                <CounterControl label="Add 5" clicked={this.props.onAdd5Handler}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtract5Handler}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctrl)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((result) => (
                        <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.val}</li>
                    ))}
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctrl: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementHandler: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementHandler: () => dispatch({type: actionTypes.DECREMENT}),
        onAdd5Handler: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSubtract5Handler: () => dispatch({type: actionTypes.SUBTRACT, value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, rsltElId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);