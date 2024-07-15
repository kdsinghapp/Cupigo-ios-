import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add_rates, add_ratting } from '../../redux/feature/featuresSlice';
import { errorToast } from '../../configs/customToast';
import { image } from '../../configs/utils/images';

const AddRatingModal = ({ isVisible, onClose, onSubmit, data }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.auth.User);
  const dispatch = useDispatch();
  const handleRatingCompleted = newRating => {
    setRating(newRating);
  };
  console.log(data);


  const handleSubmit = async () => {
    console.log('call', data);
    try {
      const ratingData = { rating, };
      if (rating == '' && comment == '') return errorToast('Please add rating or review')
      const params = {
        user_id: user?.id,
        rating: ratingData.rating,
        review: comment,

      };

      console.log('params', params);

      await dispatch(add_ratting(params))
      onClose()
      onSubmit()
    }
    catch (err) {
      console.log(err);

    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image
              source={image.Close}
              style={styles.closeImage}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.title}>Add Your Rating</Text>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
              defaultRating={0}
              size={20}
              onFinishRating={handleRatingCompleted}
            />
            <TextInput
              style={styles.input}
              placeholder="Add a comment"
              multiline
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
  },
  closeButton: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#ff4f8b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  closeImage: {
    height: 24,
    width: 24,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: '#000',
    fontFamily: 'Federo-Regular',
    marginBottom: 10,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    width: 225,
    alignSelf: 'center',
    backgroundColor: '#1D0B38',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  submitButtonText: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#fff',
    fontFamily: 'Federo-Regular',
  },
});

export default AddRatingModal;
