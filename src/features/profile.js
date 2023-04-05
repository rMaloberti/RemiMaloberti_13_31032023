import { createSlice } from '@reduxjs/toolkit';
import { selectProfile } from '../utils/selectors';

const initialState = {
  status: 'void',
  data: null,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetching: (draft) => {
      if (draft.status === 'void') {
        draft.status = 'pending';
        return;
      }
      if (draft.status === 'rejected') {
        draft.error = null;
        draft.status = 'pending';
        return;
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating';
        return;
      }
      return;
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload;
        draft.status = 'resolved';
        return;
      }
      return;
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload;
        draft.data = null;
        draft.status = 'rejected';
        return;
      }
      return;
    },
  },
});

const { actions, reducer } = profileSlice;

export const { fetching, resolved, rejected } = actions;

export default reducer;

export const fetchOrUpdateProfile = (authToken) => {
  return async (dispatch, getState) => {
    const status = selectProfile(getState()).status;

    if (status === 'pending' || status === 'updating') {
      return;
    }

    dispatch(fetching());

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      dispatch(resolved(data));
    } catch (error) {
      dispatch(rejected(error));
    }
  };
};
