import { createStore } from 'redux';
import rootReducer from './reducers'; // Créez les reducers nécessaires

const store = createStore(rootReducer);

export default store;
