import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice'
import adminreducer from './adminSlice'

const persistConfig = {
    key: 'userdata',
    version: 1,
    storage,
};

const rootReducer = combineReducers({

    userLogin:userReducer,
    adminLogin:adminreducer
    
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);