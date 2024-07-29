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
import { Dropdown } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
export default function Askabout() {
  const data = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const data2 = [
    { label: 'Small to Medium (1m50 - 1m70)', value: 'Small to Medium (1m50 - 1m70)' },
    { label: 'Medium to Tall (1m71 - 1m90)', value: 'Medium to Tall (1m71 - 1m90)' },
  ];

  const [activity, setActivity] = useState(null);

  // Add this inside your `getQuestions` function or wherever appropriate
  const additionalQuestions = 'What are your hobbies ?'

  const navigation = useNavigation();
  const route = useRoute();
  const { username, age, gender, address } = route.params; // Receive data from previous screens
  const isLoading = useSelector(state => state.auth.isLoading);
  const Question = useSelector(state => state.auth.Question);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(hobbies);
  const [height1, setHeight1] = useState('');
  const [height2, setHeight2] = useState('');


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
    const height3 = `${value[0]},${value[1]},${value[2]} `
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
    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={{
      flex: 1,
      alignItems: 'center',
      paddingTop: Platform.OS == 'ios' ? 20 : 5
    }}>
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
            <Text style={{ fontWeight: '800', fontSize: 22, color: '#fff' }}>Some criteria about you ?</Text>
          </View>
          {AboutQuestion?.map((question, index) => (
            <View key={index} style={{}}>
              <View style={{ width: '90%', paddingHorizontal: 10 }}>
                <Text style={[{
                  fontFamily: 'Lexend', fontSize: 18,
                  marginVertical: 10, color: '#fff', fontWeight: '700', lineHeight: 20
                }]}>
                  {question.question}
                </Text>
              </View>
              {question.question == additionalQuestions ?
                <View style={{
                  marginBottom: hp(3),
                  justifyContent: 'center', alignItems: 'center',
                  backgroundColor: '#fff', borderRadius: 30, width: wp(85)
                }}>
                  <DropDownPicker
                    style={{ borderWidth: 0, borderRadius: 30 }}
                    placeholderStyle={{
                      color: '#BD0DF4',
                      fontWeight: '600'
                    }}
                 
                    mode='BADGE'
                    badgeColors={'#BD0DF4'}
                    badgeTextStyle={{
                      color: '#fff',
                      fontWeight: '700'
                    }}
                 badgeDotColors={'#FA3EBA'}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    multiple={true}
                    min={1}
                    max={3}
                    showTickIcon={true}
                    showArrowIcon={true}
                  />
                  <View>

                  </View>
                </View> :
                <Dropdown

                  style={styles.dropdown}
                  data={index == 1 ? data : data2}
                  labelField="label"
                  valueField="value"
                  selectedTextStyle={{
                    color: '#000',
                    fontWeight: '600'
                  }}
                  placeholder="Select an option"
                  placeholderStyle={{
                    color: '#BD0DF4',
                    fontWeight: '600'
                  }}
                  itemTextStyle={{
                    color: '#BD0DF4',
                    fontWeight: '600'
                  }}
                  value={index == 0 ? height1 : height2}
                  onChange={item => {
                    if (index === 0) setHeight1(item.value);
                    else if (index === 1) setHeight2(item.value)
                  }}
                />
              }
            </View>
          ))}



      {!open &&<TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity> }

        </View>
        {isKeyboardOpen && <View style={{ height: hp(20) }} />}
      </ScrollView>
    </LinearGradient>
  );
}
const hobbies = [
  { id: '1', value: 'Reading', label: 'Reading' },
  { id: '2', value: 'Traveling', label: 'Traveling' },
  { id: '3', value: 'Cooking', label: 'Cooking' },
  { id: '4', value: 'Hiking', label: 'Hiking' },
  { id: '5', value: 'Photography', label: 'Photography' },
  { id: '6', value: 'Playing Sports', label: 'Playing Sports' },
  { id: '7', value: 'Watching Movies', label: 'Watching Movies' },
  { id: '8', value: 'Gardening', label: 'Gardening' },
  { id: '9', value: 'Painting', label: 'Painting' },
  { id: '10', value: 'Yoga', label: 'Yoga' },
  { id: '11', value: 'Dancing', label: 'Dancing' },
  { id: '12', value: 'Writing', label: 'Writing' },
  { id: '13', value: 'Playing Musical Instruments', label: 'Playing Musical Instruments' },
  { id: '14', value: 'Gaming', label: 'Gaming' },
  { id: '15', value: 'Swimming', label: 'Swimming' },
  { id: '16', value: 'Fishing', label: 'Fishing' },
  { id: '17', value: 'Crafting', label: 'Crafting' },
  { id: '18', value: 'Biking', label: 'Biking' },
  { id: '19', value: 'Running', label: 'Running' },
  { id: '20', value: 'Bird Watching', label: 'Bird Watching' },
  { id: '21', value: 'Surfing', label: 'Surfing' },
  { id: '22', value: 'Volunteering', label: 'Volunteering' },
  { id: '23', value: 'Knitting', label: 'Knitting' },
  { id: '24', value: 'Rock Climbing', label: 'Rock Climbing' },
  { id: '25', value: 'Meditating', label: 'Meditating' },
  { id: '26', value: 'Collecting (stamps, coins, etc.)', label: 'Collecting (stamps, coins, etc.)' },
  { id: '27', value: 'Attending Concerts', label: 'Attending Concerts' },
  { id: '28', value: 'Wine Tasting', label: 'Wine Tasting' },
  { id: '29', value: 'Learning Languages', label: 'Learning Languages' },
  { id: '30', value: 'Astronomy', label: 'Astronomy' },
];

const styles = StyleSheet.create({
  button: {
    width: wp(80),
    height: hp(7),
    backgroundColor: '#BD0DF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: hp(2),
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
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
    marginTop: 0,
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
    borderRadius: 20,

    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },

  inputContainer: {
    backgroundColor: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
    height: 50,

    borderRadius: 30,
    width: wp(85),

    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    fontFamily: 'Lexend',
    color: '#000'
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
    fontFamily: 'Lexend'
  },
});
