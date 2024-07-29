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
import ScreenNameEnum from '../../routes/screenName.enum';

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={[styles.saveButtonText,{fontSize:12, fontFamily:'Lexend'}]}>Edit Profile</Text>
          </TouchableOpacity>}
       
          </View>
          <LinearGradient
            colors={['#BD0DF4', '#FA3EBA']}
            style={styles.gradient}
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Image source={image.left} style={styles.backButtonImage} />
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
            navigation.navigate(ScreenNameEnum.BIOGRAPHY)
            }}
            style={{position:'absolute',right:10,top:10}}
          >
            <Image source={image.setting} style={{height:30,width:30}} />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>User Name</Text>
            {isEdit ?   <View style={styles.inputWrapper}>
    <TextInput
 editable={isEdit}
        placeholder='enter User name'
        placeholderTextColor={'#000'}
        value={userName}
        onChangeText={setUserName}
        style={styles.textInput}
      />
    </View>: <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{userName}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Gender</Text>
            {isEdit ?     <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                placeholder='enter gender'
                placeholderTextColor={'#000'}
                value={gender}
                onChangeText={setGender}
                style={styles.textInput}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{gender}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>DOB</Text>
            {isEdit ?       <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                placeholder='enter dob'
                placeholderTextColor={'#000'}
                value={dob}
                onChangeText={setDob}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{dob}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Address</Text>
            {isEdit ?   <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                placeholder='enter address'
                placeholderTextColor={'#000'}
                value={address}
                onChangeText={setAddress}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{address}</Text>
    }
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>City</Text>
            {isEdit ?     <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                placeholder='enter city'
                placeholderTextColor={'#000'}
                value={city}
                onChangeText={setCity}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{city}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Age</Text>
            {isEdit ?        <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                placeholder='enter age'
                placeholderTextColor={'#000'}
                value={age}
                onChangeText={setAge}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{age}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Country Code</Text>
            {isEdit ?       <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                placeholder='enter country code'
                placeholderTextColor={'#000'}
                value={countryCode}
                onChangeText={setCountryCode}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{countryCode}</Text>
    }
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Mobile</Text>
            {isEdit ?       <View style={styles.inputWrapper}>
              <TextInput
                  editable={isEdit}
                  style={styles.textInput}
                  placeholderTextColor={'#000'}
                placeholder='enter mobile'
                value={mobile}
                onChangeText={setMobile}
              />
            </View>:<Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#000',fontWeight:'400'}}>{mobile}</Text>
    }
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

        <View  style={{height:hp(10)}} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput:{
color:'#000',fontWeight:'500',fontSize:14  },
  title: {
    fontSize: 18,
  
    color: '#4D005A',
    marginBottom: 5,

    marginTop: 10,
    fontFamily:'Recoleta-SemiBold'
    
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
    width: 140,
    height: 140,
    borderRadius:70,
    padding: 5,
    backgroundColor: colors.backgroundColorLight,
    
  },
  profileImageStyle: {
    width: 130,
    height: 130,
    borderRadius:65,
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  profileName: {
    marginLeft: wp(2),
    fontSize: 18,
    fontWeight: '600',
    color: '#33196B',
    marginTop: 20,
    fontFamily:'Lexend'
  },
  gradient: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.backgroundColor,
    top: 0,
    zIndex: -1,
    height: hp(16),
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

  },
  inputContainer: {
    marginBottom: 10,
    marginHorizontal:20
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
