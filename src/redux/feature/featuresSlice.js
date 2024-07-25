import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, base_url } from '../Api';

import { Alert } from 'react-native';
import { SuccessToast } from 'react-native-toast-message';
import { errorToast, successToast } from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
import { err } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  SubscriptionPlan: null,
  PayMentStatus: null,
  matchPersons:[],
  privacy_policy: [],
  general_conditions: [],
  NearByUser: [],
  myPlan:[],
  getQueAns:[]

};
export const get_Plans = createAsyncThunk(
  'get_Plans',
  async (params, thunkApi) => {
    try {
      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/getPlans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status == '1') {
        console.log('get_Plans Success', data.message);
        return data.result;
      } else {
        console.log('get_Plans Not Found');
        return thunkApi.rejectWithValue(data.result);
      }
    } catch (error) {
      console.log('Error: get_Plans ', error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const get_que_ans = createAsyncThunk(
  'get_que_ans',
  async (params, thunkApi) => {
    try {

      console.log('change idenfire ',params);
      let fromData = new FormData();
      fromData.append('user_id', params.user_id);
    
      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/get_que_ans', {
        method: 'POST',
        body: fromData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status == '1') {
        console.log('get_que_ans Success', data.message);
        return data.result;
      } else {
        console.log('get_que_ans Not Found');
        return thunkApi.rejectWithValue(data.result);
      }
    } catch (error) {
      console.log('Error: get_que_ans ', error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);


export const my_plan = createAsyncThunk(
  'my_plan',
  async (params, thunkApi) => {
    console.log('🚀 my_plan', params);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
    

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/my-plan',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();
      console.log('responseData',responseData);

      if (responseData.status == '1') {
        console.log('my-plan get was successful');
      } else {
        errorToast(responseData.message || 'Unknown error occurred');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in create_subscription:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/get-privacy-policy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status == '1') {
        console.log('get_privacy_policy Success', data.message);
        return data.result;
      } else {
        console.log('get_privacy_policy Not Found');
        return thunkApi.rejectWithValue(data.result);
      }
    } catch (error) {
      console.log('Error: get_privacy_policy ', error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const get_general_conditions = createAsyncThunk(
  'get_general_conditions',
  async (params, thunkApi) => {
    try {
      const response = await fetch('https://server-php-8-2.technorizen.com/cupigo/api/get_general_conditions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status == '1') {
        console.log('get_general_conditions Success', data.message);
        return data.result;
      } else {
        console.log('get_general_conditions Not Found');
        return thunkApi.rejectWithValue(data.result);
      }
    } catch (error) {
      console.log('Error: get_general_conditions', error);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const Payment_api = createAsyncThunk(
  'Payment_api',
  async (params, thunkApi) => {
    try {
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      console.log('Payment_api=>>>>>>>>>>>>>>', params.data);
      
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/create-checkout-session',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response Payment_api=>>>>>>>>>>>>> :', responseData.data);

      // Handle successful response
      if (responseData.data) {
        // successToast(responseData.message);
      } else {
        // Handle the case where data is not present
        console.error('Payment_api: No data in response');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.log('==========Payment_api==========================', error);
      // Display network error toast
      errorToast('Network error');
      // Reject with error
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const create_subscription = createAsyncThunk(
  'create_subscription',
  async (params, thunkApi) => {
    console.log('🚀 create_subscription', params);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('plan_id', params.plan_id);
      data.append('price', params.price);
      data.append('payment_status', params.payment_status);
      data.append('payment_intent', params.payment_intent);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/create-subscription',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      if (responseData.status == '1') {
        successToast('Your purchase Subscription was successful');
      } else {
        errorToast(responseData.message || 'Unknown error occurred');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in create_subscription:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const  submit_answers_update = createAsyncThunk(
  'submit_answers_update',
  async (params, thunkApi) => {
    console.log('🚀 submit_answers_update', params.data);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('answers', params.answers);
     

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/submit-answers-update',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      if (responseData.status == '1') {
       successToast('Submit answers successfuly');
      } else {
       console.log('Submit_answers_update success');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in create_subscription:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const  add_ratting = createAsyncThunk(
  'add_ratting',
  async (params, thunkApi) => {
    console.log('🚀 submit_answers_update', params);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('rating', params.rating);
      data.append('review', params.review);
  

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/addratting',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      if (responseData.status == '1') {
       successToast('Submit Review successfuly');
      } else {
       
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in create_subscription:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const matchPersons = createAsyncThunk(
  'matchPersons',
  async (params, thunkApi) => {
    console.log('🚀 matchPersons:', params.data);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/matchPersons',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      if (responseData.status == '1') {
        console.log('Match persons success');
      } else {
        errorToast(responseData.message || 'Unknown error occurred');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in matchPersons:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const add_support_inquiries = createAsyncThunk(
  'add_support_inquiries',
  async (params, thunkApi) => {
    console.log('🚀 add_support_inquiries:', params);

    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('message', params.message);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/add_support_inquiries',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      if (responseData.status == '1') {
        console.log('Support inquiry sent successfully');
        successToast('Support inquiry sent successfully');
      } else {
        errorToast(responseData.message || 'Unknown error occurred');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in add_support_inquiries:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getNearBy = createAsyncThunk(
  'getNearBy',
  async (params, thunkApi) => {
    console.log('🚀 getNearBy:', params);

    try {
      // Create FormData and append lat and lon parameters
      let data = new FormData();
      data.append('lat', params.lat);
      data.append('lon', params.lon);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to the API endpoint
      const response = await fetch(
        'https://server-php-8-2.technorizen.com/cupigo/api/getNearBy',
        requestOptions
      );

      // Parse response as JSON
      const responseData = await response.json();

      // Handle successful response
      if (responseData.status == '1') {
        console.log('Nearby locations retrieved successfully');
      } else {
        errorToast(responseData.message || 'Unknown error occurred');
      }

      return responseData.result;
    } catch (error) {
      console.log('Error in getNearBy:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  }
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {
    clearMatchPersons(state,action) {
      state.matchPersons = null;
    },

  },
  extraReducers: builder => {


    builder.addCase(Payment_api.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Payment_api.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PayMentStatus = action.payload;
    });
    builder.addCase(Payment_api.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(add_ratting.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_ratting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_ratting.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(submit_answers_update.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(submit_answers_update.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    
    });
    builder.addCase(submit_answers_update.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_que_ans.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_que_ans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getQueAns = action.payload;
    });
    builder.addCase(get_que_ans.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(my_plan.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(my_plan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.myPlan = action.payload
    
    });
    builder.addCase(my_plan.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.myPlan = []
    });

    builder.addCase(getNearBy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getNearBy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.NearByUser = action.payload;
    });
    builder.addCase(getNearBy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.privacy_policy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_general_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_general_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.general_conditions = action.payload;
    });
    builder.addCase(get_general_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(add_support_inquiries.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_support_inquiries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_support_inquiries.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(matchPersons.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(matchPersons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.matchPersons = action.payload;
    });
    builder.addCase(matchPersons.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_Plans.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_Plans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.SubscriptionPlan = action.payload
    });
    builder.addCase(get_Plans.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(create_subscription.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(create_subscription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(create_subscription.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });



  },
});
export const {  clearMatchPersons } = FeatureSlice.actions;
export default FeatureSlice.reducer;
