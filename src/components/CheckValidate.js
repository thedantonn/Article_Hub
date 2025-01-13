const CheckValidate = (email,password,name) => {
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
   // const isNameValid = /([a-zA-Z0-9_\s]+)/.test(name);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid) return "email is not valid"
    
    if (!isPasswordValid) return "password is not valid"
  
    return null
}

export default CheckValidate