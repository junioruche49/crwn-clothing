import React, { ButtonHTMLAttributes, FC, HtmlHTMLAttributes } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export enum BUTTON_TYPE_CLASS {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_CLASS.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
  }[buttonType]);

type ButtonType = {
  buttonType?: BUTTON_TYPE_CLASS;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonType> = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
