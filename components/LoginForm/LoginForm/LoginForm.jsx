import React from 'react';
import Input from '../../Input/Input';
import Button from '../Button/Button';

function LoginForm() {
    return (
        <form>
            <Input
                name="username"
                type="text"
                placeholder="Enter your username"
                label="Username"
            />
            <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
            />
            <Button name="Login" type="submit" />
        </form>
    );
}

export default LoginForm;
