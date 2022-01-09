import React from 'react'
import { 
    RegisterContainer,
    RegisterHeader,
    RegisterForm,
    RegisterFormLabel,
    RegisterFormButton 
} from './RegisterStyles'

export function Register() {
    return (
    <RegisterContainer>
        <RegisterHeader>Cadastro:</RegisterHeader>
        <RegisterForm onSubmit={() => {}}>
            <RegisterFormLabel htmlFor='username'>Entre seu nome:</RegisterFormLabel>
            <input type="text" name="username"/>
            <RegisterFormLabel htmlFor='age'>Entre sua idade:</RegisterFormLabel>
            <input type="number" min={0} max={120}/>
            <RegisterFormButton>Redefinir</RegisterFormButton>
            <RegisterFormButton>Registrar</RegisterFormButton>
        </RegisterForm>
    </RegisterContainer>
    )
}
