import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Platform, FlatList } from 'react-native';
import { colors } from '../../configs/utils/colors';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { get_que_ans, submit_answers_update } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function changeIdentifier() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getQueAns = useSelector(state => state.feature.getQueAns);
  const isLoading = useSelector(state => state.feature.isLoading);
  const user = useSelector(state => state.auth.User);
  const [isEdit, setIsEdit] = useState(false); // State to manage edit mode
  const [answers, setAnswers] = useState({}); // State to manage answers

  useEffect(() => {
    getQuestions();
  }, [user]);

  const getQuestions = () => {
    const params = {
      user_id: user?.id
    };
    dispatch(get_que_ans(params));
  };

  // Function to handle answer changes
// Function to handle answer changes
// Function to handle answer changes
const handleAnswerChange = (questionId, text) => {
  if (text.trim() == '') {
    // If text is empty, keep the previous answer
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]:' '
    }));
  } else {
    // Update with the new text
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: text
    }));
  }
};


  // Function to update answers
  const updateQuestion = () => {


    
 
    const updatedAnswers = getQueAns.map(item => ({
      id: item.id,
      question_id: item.question_id,
      user_id: user?.id,
      answer: answers[item.question_id] || item.answer, // Use updated answer if available, else use original
      date_time: item.date_time,
      question: item.question,
    }));
  
    const params = {
      user_id: user?.id,
      answers: JSON.stringify(updatedAnswers),
    };
    console.log('amswer',updatedAnswers);
    dispatch(submit_answers_update(params)).then(res => {
      // After updating, fetch the questions again to reflect changes if needed
      getQuestions();
      setIsEdit(false); // Turn off edit mode after saving changes
    });
  };
  
  const renderItem = ({ item }) => {
    const answerText = answers[item.question_id] || item.answer;
  
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{item.question}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            editable={isEdit} // Control whether the input is editable based on isEdit state
            placeholder={`Answer for ${item.question}`}
            value={answerText}
            onChangeText={(text) => handleAnswerChange(item.question_id, text)}
            style={styles.input}
          />
        </View>
      </View>
    );
  };
  
  return (
    <View style={{ backgroundColor: colors.backgroundColorLight, flex: 1 }}>
      {isLoading ? <Loading /> : null}
      <View style={{ height: Platform.OS == 'ios' ? 30 : 0 }} />
      <ScrollView>
        <View style={styles.header}>
        <Text style={styles.headerText}>Change identifier</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Image source={image.left} style={styles.backButtonImage} />
          </TouchableOpacity>
        </View>
      
        {!isEdit && // Render Edit button only when not in edit mode
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEdit(true)}
              >
                <LinearGradient
                  colors={['#BD0DF4', '#FA3EBA']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                  style={[styles.linearGradient, { height: 45, width: '30%' }]}
                >
                  <Text style={styles.saveButtonText}>Edit</Text>
                </LinearGradient>
              </TouchableOpacity>
            }
        {getQueAns?.length > 0 &&
          <View style={styles.formContainer}>
            <FlatList
              data={getQueAns}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
            />

          

            {isEdit && // Render Save Changes button when in edit mode
              <TouchableOpacity
                style={styles.saveButton}
                onPress={updateQuestion}
              >
                <LinearGradient
                  colors={['#BD0DF4', '#FA3EBA']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                  style={styles.linearGradient}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            }
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
   marginLeft:30

  },
  linearGradient: {
    backgroundColor: colors.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 55,
    borderRadius: 30,
    width: '90%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4D005A',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(5),
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  backButtonImage: {
    height: 40,
    width: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 40
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 55,
    borderRadius: 30,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  editButton: {
    height: 40,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
});
