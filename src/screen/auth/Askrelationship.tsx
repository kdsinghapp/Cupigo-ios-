import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { image, mHeight, mWidth } from '../../configs/utils/utils';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { get_quesctions, submit_answers } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import { errorToast } from '../../configs/customToast';

export default function AskRelationship() {
  const route = useRoute();

  // Extract data from route parameters
  const { username, age, gender, address, height1, height2, height3, genre, idealSize, idealWeight } = route.params;
  const isLoading = useSelector(state => state.auth.isLoading);
  const Question = useSelector(state => state.auth.Question);
  const user = useSelector(state => state.auth.User);
  const [answer, setAnswer] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();


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

  const submitAnswer = async () => {

    if (!answer ) {
      return errorToast("Please Select Option ");
     }
    const params = {
      user_id: user?.id,
      age: age,
      username: username,
      gender: gender,
      city: address,
      answers: [
        [
          { id: Question?.first[0]?.id, answer: height1 },
          { id: Question?.first[1]?.id, answer: height2 },
          { id: Question?.first[2]?.id, answer: height3 },
        ],
        [
          { id: Question?.second[0]?.id, answer: genre },
          { id: Question?.second[1]?.id, answer: idealSize },
          { id: Question?.second[2]?.id, answer: idealWeight },
        ],
        [
          { id: Question?.thired[0]?.id, answer: answer },
        ],
      ],
      navigation:navigation
    };

    dispatch(submit_answers(params))

    // Perform submit logic here
  };

  return (
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']}   style={{flex:1,
    alignItems:'center',
    paddingTop:Platform.OS == 'ios'?20:5}}>
      {isLoading ? <Loading /> : null}
      <View style={{ marginTop: hp(5), justifyContent: 'center', marginBottom: 30 }}>
        <Image source={image.whiteLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>
      <ScrollView>
     
        <View style={styles.contentContainer}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{Question?.thired[0]?.question}</Text>
          </View>
          {/* Display API Questions */}
          {Question?.thired[0]?.option?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.inputContainer,
                { marginTop: 20, backgroundColor: answer === item ? '#FFFFFF' : '#4D005A' },
              ]}
              onPress={() => setAnswer(item)}
            >
              <Text style={{ fontWeight: '600',    fontFamily:'Lexend', fontSize: 14, color: answer === item ? '#4D005A' : '#BD0DF4' }}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={submitAnswer}
            style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
    width: '90%', // Adjust width based on completion
    borderRadius: 20,
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    width: 80,
  },
  contentContainer: {
    marginHorizontal:10,
    borderRadius:20,
 
paddingHorizontal:10,
backgroundColor:'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 20,
  },
  greetingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily:'Lexend'
  },
  inputContainer: {
    backgroundColor: '#4D005A',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,

    borderRadius:30,
    width: wp(85),
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingHorizontal: mWidth * 0.05,
    paddingVertical: mHeight * 0.03,
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
