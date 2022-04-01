import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss';

const useValidation = (value, validations) => {
     const [isEmpty, setEmpty] = useState(true);
     const [minLengthError, setMinLengthError] = useState(false);
     const [maxLengthError, setMaxLengthError] = useState(false);
     const [emailError, SetemailError] = useState(false);
     const [inValid, setInValid] = useState(false);
     useEffect(() => {
          for (const validation in validations) {
               switch(validation) {
                    case 'minLength':
                        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                         break;
                    case 'isEmpty':
                         value ? setEmpty(false) : setEmpty(true)
                         break;
                    case 'maxLength': 
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                         break;
                    case 'isEmail':
                         const re =
                         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                         re.test(String(value).toLowerCase()) ? SetemailError(false) : SetemailError(true)
                         break;
               }
          } 
     }, [value]);

     useEffect(() => {
          if(isEmpty || maxLengthError || minLengthError || emailError){
               setInValid(false)
          }else{
               setInValid(true)
          }
     }, [isEmpty, maxLengthError, minLengthError, emailError])

     return {
          isEmpty, 
          minLengthError,
          maxLengthError,
          emailError,
          inValid
     };
};
const useInput = (initialValue, validations) => {
     const [value, setValue] = useState(initialValue);
     const [isDirty, setDirty] = useState(false);
     const valid = useValidation(value, validations);
     const onChange = (e) => {
          setValue(e.target.value)
     };
     const onBlur = (e) => {
          setDirty(true)
     };
     return{
          value,
          isDirty,
          onChange, 
          onBlur,
          ...valid,
     }
};
export default function Form(){
     const email = useInput( '', {isEmpty: true,  minLength: 3, isEmail: true})
     const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 13})
     return (
          <div className={styles.box}>
             <form>
               <h1>Регистрация</h1>

                    <div className={styles.content_input}>
                    {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым!</div>}
                    {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Некоректная длина!</div>}
                    {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Некоректная почта</div>}
                         <input name='email' onBlur={ e => email.onBlur(e)} onChange={e => email.onChange(e)} value={email.value} type="email" placeholder='Введите почту'/>
                    </div>
                    <div className={styles.content_input}>
                    {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым!</div>}
                    {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Некоректная длина!</div>}
                    {(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Cлишком длинный пароль!</div>}
                         <input name='password' onBlur={ e => password.onBlur(e)} onChange={e => password.onChange(e)} value={password.value} type="password" placeholder='Введите пароль'/>
                    </div>
                    <button disabled={!email.inValid || !password.inValid} type='submit'>Registration</button>
             </form>
          </div>
     );
};
