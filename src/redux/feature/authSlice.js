import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API, base_url } from '../Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';
import { errorToast, successToast } from '../../configs/customToast';
import axios from 'axios';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  User: [],
  Question: [],
  user_profile:[]
};

export const login = createAsyncThunk(
  'login',
  async (params, thunkApi) => {
    console.log('🚀 Login_phone:', params.data);
    console.log('login=>>>>>>>>', params.data);
    try {
      const formData = new FormData();
      formData.append('country_code', params.data.country_code);
      formData.append('mobile', params.data.mobile);

      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();
      console.log('🚀 ~ Login_phone', data);

      if (data.status === '1') {
        successToast('OTP sent successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          mobile: params.data.mobile,
        });
      } else {
        errorToast(data.message || 'Unknown error occurred');
      }

      return data;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const login_with_otp = createAsyncThunk(
  'login_with_otp',
  async (params, thunkApi) => {
    console.log('🚀 login_with_otp:', params.data);

    try {
      const formData = new FormData();
      formData.append('otp', params.data.otp);
      formData.append('mobile', params.data.mobile);

      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/login_with_otp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();
      console.log('🚀 ~ login_with_otp', data);

      if (data.status === '1') {
        successToast('Login successfully');
        if (data.register_status) {
          params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        } else {
          params.navigation.navigate(ScreenNameEnum.ASK_NAME);
        }
        thunkApi.dispatch(loginSuccess(data.result));
      } else {
        errorToast(data.message || 'Unknown error occurred');
      }

      return data?.result;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login_with_otp ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const submit_answers = createAsyncThunk(
  'submit_answers',
  async (params, thunkApi) => {
    try {
      console.log('params', params?.answers);
      
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('age', params.age);
      data.append('username', params.username);
      data.append('gender', params.gender);
      data.append('city', params.city);
      data.append('answers', JSON.stringify(params.answers));
      
      console.log('nse:', data);

      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/submit-answers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      const result = await response.json();
      console.log('submit_answers response:', result);

      if (result.status === '1') {
        params.navigation.navigate(ScreenNameEnum.ASK_FINAL);
      } else {
        errorToast(result.message || 'Unknown error occurred');
      }

      return result;
    } catch (error) {
      console.error('submit_answers error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const get_profile = createAsyncThunk(
  'get_profile',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('user_id', params.user_id);

      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/get-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      const result = await response.json();
      console.log('get_profile response:', result);

      if (result.status === '1') {
        return result.result;
      } else {
        errorToast(result.message || 'Unknown error occurred');
        return thunkApi.rejectWithValue(result.message);
      }
    } catch (error) {
      console.error('get_profile error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          data.append(key, params[key]);
        }
      }

      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      const result = await response.json();
      console.log('update_profile response:', result?.result);
      
      if (result.status === '1') {
        if(params?.dob) {
          successToast('Profile Update Successfully');
        }
        console.log('update_profile response success:', result?.result);
      } else {
        errorToast(result.message || 'Unknown error occurred');
      }

      return result;
    } catch (error) {
      console.error('update_profile error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);


export const get_quesctions = createAsyncThunk(
  'get_quesctions',
  async (params, thunkApi) => {
    try {
      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/get-quesctions', {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      console.log('==============get_quesctions call======================', data);

      if (data.status === '1') {
        return data.result;
      } else {
        return thunkApi.rejectWithValue(data.result);
      }
    } catch (error) {
      console.error('get_quesctions error:', error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.User = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases

    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;

    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(get_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
state.user_profile=action.payload

    });
    builder.addCase(get_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(login_with_otp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login_with_otp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.User = action.payload

    });
    builder.addCase(login_with_otp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(get_quesctions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_quesctions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.Question = action.payload

    });
    builder.addCase(get_quesctions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(submit_answers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(submit_answers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
    

    });
    builder.addCase(submit_answers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
    

    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });

  },
});

export const { loginSuccess } = AuthSlice.actions;

export default AuthSlice.reducer;
