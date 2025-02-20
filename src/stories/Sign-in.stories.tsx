import { BrowserRouter } from "react-router-dom";
import { within, userEvent } from '@storybook/test';
import SignInUI from "../pages/Sign-in";
import '../index.css'
import '../pages/StyleModules/Sign-in.module.css'

export default {
    title: "SignIn",
    component: SignInUI
}

export const defaultUI = () => {
    return(
        <BrowserRouter>
            <SignInUI></SignInUI>
        </BrowserRouter>
    )
}

const Template = () => (
    <BrowserRouter>
      <SignInUI />
    </BrowserRouter>
  );
  
  export const fillForm = Template.bind({});
  
  // @ts-ignore
  fillForm.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    const emailInput = canvas.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'test@example.com');
  
    const passwordInput = canvas.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
  };

  export const NoInput = Template.bind({});
  
  // @ts-ignore
  NoInput.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    const emailInput = canvas.getByPlaceholderText('Email')
    await userEvent.type(emailInput, '   ');

    await userEvent.keyboard('{Enter}')
  
  };

