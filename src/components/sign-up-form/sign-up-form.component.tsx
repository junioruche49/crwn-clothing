import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useState, memo, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
// import { UserContext } from "../../coontexts/user.context";
import {
  createUserProfieWithEmailPassword,
  connectDBwithFirestore,
} from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const formInput = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = memo(() => {
  const [formInputs, setFormInputs] = useState(formInput);
  const { displayName, email, password, confirmPassword } = formInputs;
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
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
      //   console.log("response", response);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("email already in use");
      }
      console.log("error", error);
    }
  };

  //   console.log(formInputs);
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />
        <FormInput
          label="Email"
          type="text"
          onChange={handleChange}
          value={email}
          required
          name="email"
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          required
          value={password}
          name="password"
        />
        <FormInput
          label="Confirm Passsword"
          type="password"
          onChange={handleChange}
          required
          value={confirmPassword}
          name="confirmPassword"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
});

export default SignUp;
