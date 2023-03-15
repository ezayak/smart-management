import './login-page.style.scss';
import { useState, FC } from 'react';
import { SimpleAlert } from '../../components/forms/simple-alert/simple-alert.component';
import { Spinner } from '../../components/forms/spinner/spinner.component';
import { TextInput } from '../../components/forms/text-input/text-input.component';
import firebase from '../../utils/firebase/firebase';
import {
  ERROR_MESSAGES,
  errorMessages,
} from '../../utils/common/error-message.utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import authService from '../../services/security/auth.service';
import { setUserData } from '../../store/user/user.action';

interface ConfirmationResult {
  confirm: (password: string) => Promise<string>;
}

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.ApplicationVerifier;
  }
}

const LoginPage: FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [codeIsRequired, setCodeIsRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();
  const dispatch = useDispatch<AppDispatch>();

  const onChangeHandler = (value: string, id: string) => {
    if (id === 'phone') {
      setPhone(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  //useEffect(() => {}, []);

  const login = () => {
    setLoading(true);
    //todo: add verification that user exists in the database
    //todo: add password
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'capthca-verifier',
        {
          size: 'invisible',
        }
      );
    }

    if (window.recaptchaVerifier) {
      firebase
        .auth()
        .signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then((res: any) => {
          setLoading(false);

          if (res) {
            setCodeIsRequired(true);
            setConfirmationResult(res);
          } else {
            setMessage(errorMessages(ERROR_MESSAGES.USER_DOES_NOT_EXISTS));
            setAlertClass('warning');
          }
        })
        .catch((err: any) => {
          setLoading(false);
          console.error(err);
          setMessage(err.message);
          setAlertClass('warning');
        });
    } else {
      setLoading(false);
    }
  };

  const confirm = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(password)
        .then((result) => {
          console.log('login result', result);
          authService.login().then((user) => {
            dispatch(setUserData(user));

            if (!user) {
              setMessage(errorMessages(ERROR_MESSAGES.USER_DOES_NOT_EXISTS));
              setCodeIsRequired(false);
            }
          });
        })
        .catch((err: any) => {
          setMessage(errorMessages(ERROR_MESSAGES.WRONG_VERIFICATION_CODE));
          setAlertClass('warning');
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-content page-content">
        <h1>Login</h1>
        <TextInput
          label="Phone"
          value={phone}
          id="phone"
          onChange={onChangeHandler}
        />

        {codeIsRequired && (
          <TextInput
            label="password"
            value={password}
            id="password"
            type="password"
            onChange={onChangeHandler}
          />
        )}
        {loading && <Spinner />}
        {!loading && !codeIsRequired && (
          <button className="btn" onClick={login}>
            Login
          </button>
        )}
        {!loading && codeIsRequired && (
          <button className="btn" onClick={confirm}>
            Confirm
          </button>
        )}
        <SimpleAlert
          visible={!!message}
          onClose={() => setMessage('')}
          alertClass={alertClass}
        >
          <div>{message}</div>
        </SimpleAlert>
      </div>
      <div id="capthca-verifier"></div>
    </div>
  );
};

export { LoginPage };
