import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import Header from '../../configs/Header';
import { image } from '../../configs/utils/images';
import { useDispatch, useSelector } from 'react-redux';
import { matchPersons } from '../../redux/feature/featuresSlice';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ScreenNameEnum from '../../routes/screenName.enum';

const FindMatches = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const animation = new Animated.Value(0);

  const findMatches = useSelector(state => state.feature.matchPersons);
  const user = useSelector(state => state.auth.User);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    let intervalId;

    if (modalVisible) {
      intervalId = setInterval(() => {
        const params = { user_id: user?.id };
        dispatch(matchPersons(params));
      }, 10000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, { toValue: 1, duration: 1000, useNativeDriver: true }),
          Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      clearInterval(intervalId);
      animation.stopAnimation();
      animation.setValue(0);
    }

    return () => clearInterval(intervalId);
  }, [modalVisible, user?.id]);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const saveUserToFirestore = async (user, matchedUser) => {
    if (!user || !user.id) {
      console.error('User is undefined or invalid');
      return;
    }
    if (!matchedUser || !matchedUser.id) {
      console.error('MatchedUser is undefined or invalid');
      return;
    }

    try {
      const userDoc = await firestore().collection('matches').doc(user.id).get();
      if (userDoc.exists) {
        const userContacts = userDoc.data().contacts || [];
        if (!userContacts.some(contact => contact.id === matchedUser.id)) {
          userContacts.push({
            id: matchedUser.id || '',
            userName: matchedUser.user_name || 'Unknown',
            userImage: matchedUser.image || '',
          });
          await firestore().collection('matches').doc(user.id).update({ contacts: userContacts });
        }
      } else {
        await firestore().collection('matches').doc(user.id).set({
          contacts: [{
            id: matchedUser.id || '',
            userName: matchedUser.user_name || 'Unknown',
            userImage: matchedUser.image || '',
          }],
        });
      }
      console.log('User saved to Firestore successfully');
      navigation.navigate(ScreenNameEnum.Message);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving user to Firestore: ', error);
    }
  };

  const animatedStyle = { opacity: animation };

  return (
    <View style={styles.container}>
      <Header title='Find Matches' />
      <View style={styles.center}>
        <TouchableOpacity onPress={handleIconPress}>
          <Image source={image.appLogo} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Animated.View style={[styles.animationContainer, animatedStyle]}>
              <TouchableOpacity onPress={() => findMatches && saveUserToFirestore(user, findMatches)}>
                <Image source={findMatches ? { uri: findMatches?.image } : image.radar} style={styles.image} />
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Image source={image.Close} style={styles.closeButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  animationContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'green',
    marginTop: 40,
  },
  closeButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#ff4f8b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonIcon: {
    height: 20,
    width: 20,
  },
});

export default FindMatches;
