import {configureStore} from '@reduxjs/toolkit';
import checkAuthReducer from './slice/checkAuth';

const store = configureStore({
    reducer:{
        checkAuth: checkAuthReducer
    }
});

export default store;