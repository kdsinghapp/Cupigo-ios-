import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

import auth from '@react-native-firebase/auth';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/feature/authSlice';
import { errorToast } from '../../configs/customToast';


const SignupMethod = ({  }) => {
  
   const dispatch = useDispatch();
   const navigation = useNavigation();

   async function onGoogleButtonPress() {
    errorToast('this feature is currently under maintenance')
  //   try {
  //     // Check if your device supports Google Play
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     // Get the users ID token
  //     const { idToken } = await GoogleSignin.signIn();
      
  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
  //     // Sign-in the user with the credential
  //     const userCredential = await auth().signInWithCredential(googleCredential);

  //     // Dispatch action to update Redux state
  //     dispatch(loginSuccess(true));

  //     // Navigate to your bottom tab screen
  //     navigation.navigate(ScreenNameEnum.BOTTOM_TAB); // Replace with your bottom tab screen name
  //   } catch (error) {
  //     console.error('Google sign in error:', error);
  //     // Handle error if necessary
  //   }
  }

  return (
    <View style={styles.container}>
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
        backgroundColor:'#da3dd3',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

            borderRadius: 10, paddingVertical:20,width: wp(90), padding:15
          }}>
          <Text style={styles.welcomeText}>Hello, <Text style={[styles.welcomeText, { fontWeight: '500' ,    fontFamily:'Lexend'}]}>Welcome</Text> </Text>
          <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={() => {errorToast('this feature is currently under maintenance') }}>
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
    borderRadius: 10,
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
