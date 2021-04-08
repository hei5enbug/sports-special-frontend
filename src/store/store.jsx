import { configureStore } from '@reduxjs/toolkit';
import specialReducer from './specialSlice';

export default configureStore({
    reducer: {
        special: specialReducer
    }
});
