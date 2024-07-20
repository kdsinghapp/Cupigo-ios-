import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import { errorToast } from '../../configs/customToast';

export default function Askname() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.User);
  console.log('user', user);

  const handleNext = () => {
    // Pass the username to the next screen
    if(username == '') return errorToast("Enter your name")
    navigation.navigate(ScreenNameEnum.ASK_AGE, { username });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{flex:1,
    alignItems:'center',
    paddingTop:Platform.OS == 'ios'?20:5}}>
  
      <View style={{marginTop:hp(10),justifyContent:'center',marginBottom:30}}>
          <Image source={image.whiteLogo}  style={{width:100,height:100}} />
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressIndicator} />
        </View>
      <View  style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>What is your name ?</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image source={image.User} style={styles.userIcon} />
          <TextInput
            placeholderTextColor="#BD0DF4"
            style={styles.input}
            placeholder="Enter your name"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    height: 80,
    width: 80,
  },
  progressBar: {
    backgroundColor: '#eb90e7',
    alignSelf: 'center',
    
    borderRadius: 20,
    height: 20,
    width: '90%',
marginBottom:10
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '0%',
    borderRadius: 20,
  },
  contentContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

backgroundColor:'#da3dd3',
marginTop:20,
paddingVertical:20,
    alignItems: 'center',
    justifyContent: 'center',
   paddingHorizontal:10,
    borderRadius: 10,
   

  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize:22,
    fontWeight: '700',
    color: '#fff',
    fontFamily:'Lexend'
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,

    borderRadius: 15,
    width: wp(80),
    paddingHorizontal: 10,
  },
  userIcon: {
    height: 30,
    width: 30,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft:10,
    fontFamily:'Lexend'
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingHorizontal: mWidth * 0.05,
    paddingVertical: mHeight * 0.04,
    width: mWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: mHeight * 0.05,
    borderRadius: mWidth * 0.01,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
    fontFamily:'Lexend'
  },
});
