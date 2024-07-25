import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, social_login } from '../../redux/feature/authSlice';
import { errorToast } from '../../configs/customToast';
import Loading from '../../configs/Loader';


const SignupMethod = ({  }) => {
  const isLoading = useSelector(state => state.auth.isLoading);
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: '438738743028-fr1s2rrijn8qos6cnsqtkfm7q8dp6ttq.apps.googleusercontent.com', // From Google Cloud Console
    });
  }, []);


   const dispatch = useDispatch();
   const navigation = useNavigation();

   async function onGoogleButtonPress() {
   
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const data = await auth().signInWithCredential(googleCredential);

      // Check if `data` and its properties are defined
      const email = (data && data.profile && data.profile.email) || (data && data.user && data.user.email);
      const userName = (data && data.user && data.user.displayName) || (data && data.profile && data.profile.name);
      const profileImage = (data && data.user && data.user.photoURL) || (data && data.profile && data.profile.picture);
    

    
      const params = {
        navigation:navigation,
        email: email || 'No email found',
        user_name: userName || 'No name found',
        url: profileImage || 'No image found',
        type: 'image/jpeg', // Adjust if needed
        name: `image${(email || 'unknown').replace('@', '_').replace('.', '_')}.png`,
      };
    
      
      if(email && userName && profileImage){
        dispatch(social_login(params))
      } 
      console.log('userCredential', params);
    
// dispatch(social_login(params))
      
    } catch (error) {
      console.error('Google sign in error:', error);
      // Handle error if necessary
    }
  }
  async function onFacebookButtonPress() {
    
  }
  return (
    <View style={styles.container}>
         {isLoading?<Loading />:null}
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#BD0DF4', '#FA3EBA']}
        style={styles.background}
      >

        <View style={{marginTop:hp(12),justifyContent:'center',marginVertical:hp(8)}}>
          <Image source={image.whiteLogo}  style={{width:100,height:100}} />
        </View>
        <View
      style={{
        backgroundColor:'rgba(255, 255, 255, 0.35)',
      
           

            borderRadius: 10, paddingVertical:20,width: wp(90), padding:15
          }}>
          <Text style={styles.welcomeText}>Hello, <Text style={[styles.welcomeText, { fontWeight: '500' ,    fontFamily:'Lexend'}]}>Welcome</Text> </Text>
          <TouchableOpacity 
          
          onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
          style={[styles.button, { marginTop: 50 }]} >
            <Image source={image.F_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          style={styles.button} >
            <Image source={image.G_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPressIn={()=>{
            navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
          }}
          style={styles.button} onPress={() => { }}>
            <Image source={image.call_icon} style={{ height: 30, width: 30 }} />
            <Text style={styles.buttonText}>Sign with Phone</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: hp(40),
    width: 170
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,

    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 20,
    fontWeight: '800',
    alignSelf: 'center',
    fontFamily:'Lexend'
  },
  brandName: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily:'Lexend'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFFFFF', // White button background
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 50,
    borderRadius:30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000000', // Black text color
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    fontFamily:'Lexend'

  },
});

export default SignupMethod;
