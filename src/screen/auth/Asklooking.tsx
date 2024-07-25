import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Keyboard, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { get_quesctions } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import { errorToast } from '../../configs/customToast';
import { Dropdown } from 'react-native-element-dropdown';

export default function Asklooking() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, age, gender, address, height1, height2, height3 } = route.params; // Receive data from previous screens
  const isLoading = useSelector(state => state.auth.isLoading);
  const Question = useSelector(state => state.auth.Question);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const data = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const data2 = [
    { label: 'Small to Medium (1m50 - 1m70)', value: 'Small to Medium (1m50 - 1m70)' },
    { label: 'Medium to Tall (1m71 - 1m90)', value: 'Medium to Tall (1m71 - 1m90)' },
  ];
  const data3 = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'other' },
  ];
  // State variables for input fields
  const [genre, setGenre] = useState('');
  const [idealSize, setIdealSize] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const AboutQuestion = Question?.second; // Update to use Question.second
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      getQuestions();
    }
  }, [isFocused]);

  const getQuestions = async () => {
    try {
      await dispatch(get_quesctions());
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error here, such as displaying an error message or retrying
    }
  };

  const handleNext = () => {
    // Prepare data object to send to the next screen
    if (!genre || !idealSize || !idealWeight) {
      return errorToast("Please fill all fields.");
     }
    const data = {
      username,
      age,
      gender,
      address,
      height1,
      height2,
      height3,
      genre,
      idealSize,
      idealWeight,
    };

    // Navigate to the next screen with collected data
    navigation.navigate(ScreenNameEnum.ASK_RELATIONSHIP, { ...data });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{ flex: 1,alignItems:'center' }}>
      {isLoading ? <Loading /> : null}
      <View style={{ marginTop: hp(8), justifyContent: 'center', marginBottom: 30 }}>
        <Image source={image.whiteLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
       
        <View style={styles.contentContainer}>
          {AboutQuestion?.map((question, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{width:'90%',paddingHorizontal:10}}>
              <Text style={[styles.greetingText, { fontSize: 18,  fontFamily:'Lexend' }]}>
                {question.question}
              </Text>
              </View>
              <View style={styles.inputContainer}>
                {/* <TextInput
                  placeholderTextColor={'#BD0DF4'}
                  style={styles.input}
                  placeholder={`Enter ${question.question}`}
                  value={
                    index === 0 ? genre : index === 1 ? idealSize : index === 2 ? idealWeight : ''
                  }
                  onChangeText={text => {
                    if (index === 0) setGenre(text);
                    else if (index === 1) setIdealSize(text);
                    else if (index === 2) setIdealWeight(text);
                  }}
                /> */}
                   <Dropdown
               style={styles.dropdown}
               data={index == 1?data2:index ==2?data:data3}
               labelField="label"
               valueField="value"
               selectedTextStyle={{
                color:'#000',
                fontWeight:'600'
               }}
               placeholder="Select an option"
               placeholderStyle={{
                color:'#BD0DF4',
                fontWeight:'600'
               }}
               itemTextStyle={{
                color:'#BD0DF4',
                fontWeight:'600'
               }}
               value={index == 0?genre:index ==1?idealSize:idealWeight}
               onChange={item =>{
                if (index === 0) setGenre(item.value);
                else if (index === 1) setIdealSize(item.value);
                else if (index === 2) setIdealWeight(item.value);
               }}
             />
              </View>
           
            </View>
          ))}
  
         
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
        {isKeyboardOpen && <View  style={{height:hp(20)}} />}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: wp(85),
    paddingHorizontal: 10,
    marginTop: 10,
    height: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logo: {
    height: 80,
    width: 80,
  },
  progressBar: {
    backgroundColor: '#eb90e7',
    alignSelf: 'center',
    marginTop:0,
    borderRadius: 20,
    height: 20,
    width: '90%',
    marginBottom:30,
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '75%', // Adjust width based on completion
    borderRadius: 20,
  },
  contentContainer: {
    borderRadius:20,
  
paddingHorizontal:10,
backgroundColor:'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    fontFamily:'Lexend'
  },
  inputContainer: {

    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,

    borderRadius:30,
    width: wp(85),

  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    fontFamily:'Lexend',
    color:'#000'
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingHorizontal: mWidth * 0.05,
    paddingVertical: 15,
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
