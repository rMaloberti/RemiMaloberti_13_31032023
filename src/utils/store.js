import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import profileReducer from '../features/profile';

/* Create the global redux store */
export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
