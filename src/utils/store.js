import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import profileReducer from '../features/profile';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
