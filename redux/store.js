import {createStore} from 'redux';
import Reducer from './Reducer';
// import thunk from 'redux-thunk';
const Store = createStore(Reducer);
export default Store;