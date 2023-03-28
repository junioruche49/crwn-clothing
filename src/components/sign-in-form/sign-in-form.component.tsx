import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { USER_TYPES } from "../../store/user/user.types";
import { signInUserProfieWithEmailPassword } from "../../utils/firebase.utils";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-styles.scss";

const formInput = {
  email: "",
  password: "",
};

const SignIn: FC = () => {
  const [formInputs, setFormInputs] = useState(formInput);
  const { email, password } = formInputs;
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetFormFields = () => {
    setFormInputs(formInput);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (error) {
        switch ((error as Error & { code: string }).code) {
          case "auth/user-not-found":
            alert("email not found");
            break;
          case "auth/wrong-password":
            alert("incorrect password");
            break;
          default:
            console.log(error);
        }
      }
    }
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={handleChange}
          value={email}
          name="email"
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          name="password"
        />
        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASS.base} type="submit">
            SIGN IN
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASS.google}
            type="button"
            onClick={signInWithGoogle}
          >
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
