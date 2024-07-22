import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { errorToast } from '../../configs/customToast';

export default function Asklive() {
  const navigation = useNavigation();
  const route = useRoute();
  const { age, gender, username } = route.params; // Receive age and gender from previous screen
  const [address, setAddress] = useState('');

  const handleNext = () => {
    // Navigate to the next screen with all collected data
    if (address == '') return errorToast("Enter your City")
    navigation.navigate(ScreenNameEnum.ASK_ABOUT, { username, age, gender, address });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{flex:1,
    alignItems:'center',
    paddingTop:Platform.OS == 'ios'?20:5}}>
       <View style={{ marginTop: hp(10), justifyContent: 'center', marginBottom: 30 }}>
        <Image source={image.whiteLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>
      <View  style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Where do you live ?</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image source={image.city} style={styles.icon} />
          <TextInput
            placeholderTextColor={'#BD0DF4'}
            style={styles.input}
            placeholder="Write your city here"
            value={address}
            onChangeText={text => setAddress(text)}
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
  icon:{
height:30,width:30
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
    marginTop: 30,
    borderRadius: 20,
    height: 20,
    width: '90%',
    marginBottom: 20,
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '45%',
    borderRadius: 20,
  },
  contentContainer: {
 paddingVertical:20,
    alignItems: 'center',
    justifyContent: 'center',
  
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
paddingHorizontal:10,
    backgroundColor: '#da3dd3',
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily:'Lexend'
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    width: wp(80),
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    width:'90%',
    marginLeft:10,
    fontFamily:'Lexend'
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingHorizontal: mWidth * 0.05,
    paddingVertical:15,
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
