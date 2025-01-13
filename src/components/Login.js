import React, { useEffect, useRef, useState } from 'react'
import CheckValidate from './CheckValidate'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged,updateProfile } from "firebase/auth";
import { createUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errormessage, seterrormessage] = useState(null)
    const email = useRef(null)
    const displayName = useRef(null)
    const password = useRef(null)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(createUser({ uid: uid, email: email, displayName: displayName }));
          navigate('/browse');
        } else {
          dispatch(removeUser());
          navigate('/login');
        }
      });
      return () => unsubscribe();
    }, [dispatch, navigate]);

    const [issignin,setissignin] = useState(true)

    const handleClick = () => {
        setissignin(!issignin)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const message = CheckValidate(email.current.value,password.current.value)
        seterrormessage(message)
        if(message) return 
        
        if(issignin){
            createUserWithEmailAndPassword(
                auth, 
                email.current.value,
                password.current.value,
                //displayName.current.value
            ).then((userCredential) => {
               const user = userCredential.user;
               updateProfile(user, {
                displayName: displayName.current.value , photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                // ... 
                const {uid,displayName,email}= auth.currentUser;
                dispatch(createUser({uid: uid, displayName: displayName, email: email}))
              }).catch((error) => {
                // An error occurred
                // ...
              });
               navigate("/browse")
             }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrormessage(errorCode +"-"+errorMessage)
  });
        }
        else {
            signInWithEmailAndPassword(
                auth, 
                email.current?.value,
                password.current?.value)
  .then((userCredential) => {
    const user = userCredential.user;
    const {uid,displayName,email}= user;
    dispatch(createUser({uid: uid, displayName: displayName, email: email}))
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrormessage(errorCode +"-"+errorMessage)
  });
        }
    }
  return (
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col justify-center  border-2 border-orange-400 xl:px-14 lg:px-12 md:px-10 sm:px-8 px-2 space-y-1 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-1/2 h-1/2 text-left bg-blue-400 opacity-80 xl:text-2xl lg:text-xl md:text-lg sm:text-xs text-[8px] py-4'>
        <h1 className='xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-sm font-semibold pb-3 text-white'>
            {issignin === false?
               "Sign In" : "Sign Up"}
        </h1>
            {issignin &&
            (<input 
                 type='text' 
                 placeholder='Name' 
                 ref={displayName}
                 className='xl:p-4 lg:p-3 md:p-2 sm:p-2 p-1 font-light border-2 border-gray-400 rounded-md bg-black  text-gray-500'/>) }
        <input 
        type='email' 
        placeholder='Email or mobile number'
        ref={email}
        className='xl:p-4 lg:p-3 md:p-2 sm:p-2 p-1 font-light border-2 border-gray-400 rounded-md bg-black  text-gray-500 ' />
        
        <input 
        type='password' 
        placeholder='Password'
        ref={password}
        className='xl:p-4 lg:p-3 md:p-2 sm:p-2 p-1 font-light border-2 border-gray-400 rounded-md bg-black  text-gray-500'/>
        <p className='text-orangebg-orange-600 font-medium text-md'>{errormessage}</p>
        <button 
        className='bg-orange-600  text-white xl:p-4 lg:p-3 md:p-2 sm:p-2 p-1 w-auto rounded-md'>
            {issignin === false ? "Sign In" : "Sign Up" } 
        </button>
        
        <h1 className='text-gray-500'>
            {issignin === false ? 
            (<p>New to Netflix? <span onClick={handleClick} className='text-white hover:cursor-pointer'>Sign up now.</span></p>) 
            : (<p>Already a member? <span onClick={handleClick} className='text-white hover:cursor-pointer'>Sign in.</span></p>)} </h1>
    </form>
  )
}

export default Login