import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const useUserPresence = () => {
  const user = useSelector(state => state.auth.User);

  useEffect(() => {
    if (!user || !user.id) return; // Ensure user and user.id are defined

    const fetchMatches = async () => {
      try {
        const currentUserId = user.id;
        const userDoc = await firestore().collection('matches').doc(currentUserId).get();

        if (userDoc.exists) {
          const userContacts = userDoc.data().contacts || [];

          const matchesData = await Promise.all(userContacts.map(async (contact) => {
            const statusDoc = await firestore().doc(`users/${contact.id}`).get();
            const status = statusDoc.exists ? statusDoc.data().status : { state: 'offline' };
            
            return {
              id: contact.id,
              image: contact.userImage,
              name: contact.userName,
              message: contact.message || '',
              time: contact.time || '',
              unread: contact.unread || 0,
              status: status.state,
            };
          }));
console.log('matchesData',matchesData);

          setMatches(matchesData);
          setFilteredMatches(matchesData);
        } else {
          console.log('No matches found for the current user.');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [user]);
};

export default useUserPresence;
