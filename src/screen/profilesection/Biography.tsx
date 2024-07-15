import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../configs/utils/colors';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { get_profile, update_profile } from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';

export default function Biography() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Profile_data = useSelector(state => state.auth.user_profile);
  const isLoading = useSelector(state => state.auth.isLoading);
  const user = useSelector(state => state.auth.User);
const [isEdit,setisEdit] = useState(false)
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [profile, setprofile] = useState('');

  useEffect(() => {
    get_user_profile();
  }, [user]);

  useEffect(()=>{


    setUserName(Profile_data?.user_name)
    setGender(Profile_data?.gender)
    setDob(Profile_data?.dob)
    setAddress(Profile_data?.address)
    setCity(Profile_data?.city)
    setAge(Profile_data?.age)
    setCountryCode(Profile_data?.country_code)
    setMobile(Profile_data?.mobile)
  },[Profile_data])


  console.log(Profile_data);
  
  const get_user_profile = () => {
    const params = {
      user_id: user?.id
    };
    dispatch(get_profile(params));
  };
  const updateProfile = (updatedSettings) => {
    
    const updatedProfile = {
user_id:user?.id,
user_name:userName,
country_code:countryCode,
mobile:mobile,
gender:gender,
dob:dob,
// image:profile,
address:address,
age:age,
city:city,
// lat:Location.lat,
// long:Location.lon,
    };
    dispatch(update_profile(updatedProfile)).then(res=>{
      if (user?.id) {
        dispatch(get_profile({ user_id: user.id }));
      }
  })
  }
  return (
    <View style={{ backgroundColor: colors.backgroundColorLight, flex: 1 }}>
      {isLoading ? <Loading /> : null}
      <View style={{height:Platform.OS == 'ios'?30:0}} />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.profileImage}>
              <Image source={image.bg} style={styles.profileImageStyle} />
            </View>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>Belle Benson</Text>
              </View>
              {!isEdit && <TouchableOpacity 
              onPress={()=>{
                setisEdit(true)
              }}
              style={[styles.saveButton,{width:'30%',height:30,marginVertical:2}]}>
            <Text style={[styles.saveButtonText,{fontSize:12}]}>Edit Profile</Text>
          </TouchableOpacity>}
       
          </View>
          <LinearGradient
            colors={['#BD0DF4', '#FA3EBA']}
            style={styles.gradient}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Image source={image.left} style={styles.backButtonImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>User Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
         editable={isEdit}
                placeholder='User name'
                value={userName}
                onChangeText={setUserName}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Gender</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='gender'
                value={gender}
                onChangeText={setGender}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>DOB</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='dob'
                value={dob}
                onChangeText={setDob}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='address'
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>City</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='city'
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Age</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='age'
                value={age}
                onChangeText={setAge}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Country Code</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='country code'
                value={countryCode}
                onChangeText={setCountryCode}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Mobile</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='mobile'
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
          </View>
         {isEdit && <TouchableOpacity 
         onPress={()=>{
          updateProfile()
         }}
         style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>}
          <View style={styles.bottomSpace} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
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
  headerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 5,
    backgroundColor: colors.backgroundColorLight
  },
  profileImageStyle: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  profileName: {
    marginLeft: wp(2),
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33196B',
    marginTop: 20,
  },
  gradient: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.backgroundColor,
    top: 0,
    zIndex: -1,
    height: hp(18),
    width: '50%',
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
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 50,
    justifyContent:'center'
  },
  saveButton: {
    backgroundColor: colors.btnColor,
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
  bottomSpace: {
    height: 40,
  },
});
