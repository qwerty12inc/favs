import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux';
import { setAuthentication, resetAuthentication } from '../store/features/isAuthSlice';

export default function useAuth()  {
    const [user, setUser] = useState<User>(null)
    const dispatch = useDispatch();

    useEffect(()=> {
        const unsub = onAuthStateChanged(auth, user => {
            console.log('got user: ', user)
            if (user) {
                setUser(user)
                dispatch(setAuthentication(user.toJSON() as User))
            } else {
                setUser(null)
                console.info('else auth', auth);
                console.info('else user', user)
                dispatch(resetAuthentication())
            }
        });
        return unsub;
    },[])

  return {user}
}
