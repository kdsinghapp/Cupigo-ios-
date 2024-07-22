import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform, Keyboard } from 'react-native';
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

export default function Askabout() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, age, gender, address } = route.params; // Receive data from previous screens
  const isLoading = useSelector(state => state.auth.isLoading);
  const Question = useSelector(state => state.auth.Question);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [height1, setHeight1] = useState('');
  const [height2, setHeight2] = useState('');
  const [height3, setHeight3] = useState('');

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const AboutQuestion = Question?.first;
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
    if (!height1 || !height2 || !height3) {
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
    };

    navigation.navigate(ScreenNameEnum.ASK_LOOKING, { ...data });
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']}style={{flex:1,
    alignItems:'center',
    paddingTop:Platform.OS == 'ios'?20:5}}>
      {isLoading ? <Loading /> : null}

      <View style={{ marginTop: hp(5), justifyContent: 'center', marginBottom: 30 }}>
        <Image source={image.whiteLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.greetingContainer}>
            <Text style={{fontWeight:'800',fontSize:22,color:'#fff'}}>Some criteria about you ?</Text>
          </View>
          {AboutQuestion?.map((question, index) => (
            <View key={index} style={{}}>
              <Text style={[{ fontFamily:'Lexend',fontSize: 18, width: '80%',marginVertical:10,color:'#fff',fontWeight:'700',lineHeight:20 }]}>
                {question.question}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={'#BD0DF4'}
                
                  style={styles.input}
                  placeholder={`Enter ${question.question}`}
                  value={index === 0 ? height1 : index === 1 ? height2 : height3}
                  onChangeText={text => {
                    if (index === 0) setHeight1(text);
                    else if (index === 1) setHeight2(text);
                    else if (index === 2) setHeight3(text);
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
    marginBottom: 30,
  },
  progressIndicator: {
    backgroundColor: '#794ebc',
    height: 20,
    width: '60%', // Adjust width based on completion
    borderRadius: 20,
  },
  contentContainer: {
    borderRadius:20,
    shadowColor: "#f0f0f0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation:2,
paddingHorizontal:10,
    backgroundColor: '#da3dd3',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  
  },

  inputContainer: {
    backgroundColor: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 15,
    width: wp(80),
    paddingHorizontal: 10,
    marginTop:10,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
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
