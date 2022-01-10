import React from 'react'
import { useForm } from 'react-hook-form'
import { 
    RegisterContainer,
    RegisterFormContainer,
    RegisterHeader,
    RegisterForm,
    RegisterFormLabel,
    RegisterFormInput,
    RegisterFormError,
    RegisterFormButtons
} from './RegisterStyles'

interface RegisterFormData {
    username: string,
    email: string,
    password: string,
    passwordValidade: string
}

export function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
    const password = watch("password")

    function onSubmit(data: RegisterFormData) {
        console.log(data);
    }

    return (
    <RegisterContainer>
        <RegisterFormContainer>
            <RegisterHeader>Cadastro:</RegisterHeader>
            <RegisterForm onSubmit={handleSubmit(onSubmit)}>
                <RegisterFormLabel>Entre seu nome:</RegisterFormLabel>
                <RegisterFormInput {...register("username", { required: true })} placeholder='Nome'/>
                {errors.username && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
                <RegisterFormLabel>Entre seu email:</RegisterFormLabel>
                <RegisterFormInput {...register("email", { required: true })} placeholder='Email'/>
                {errors.email && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
                <RegisterFormLabel>Entre uma senha:</RegisterFormLabel>
                <RegisterFormInput {...register("password", { required: true })} placeholder='Senha'/>
                {errors.password && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
                <RegisterFormLabel>Confirme sua senha:</RegisterFormLabel>
                <RegisterFormInput 
                    {...register("passwordValidade", { 
                    required: true,
                    validate: (validatePass) => validatePass === password })
                    }
                    placeholder='Senha'
                />
                {
                    (errors.passwordValidade && errors.passwordValidade?.type === "required") && 
                        <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>
                }
                {
                    (errors.passwordValidade && errors.passwordValidade?.type !== "required") && 
                        <RegisterFormError>As senhas entradas não coincidem.</RegisterFormError>
                }
                <RegisterFormButtons>
                    <button type="reset">Redefinir</button>
                    <button>Registrar</button>
                </RegisterFormButtons>
            </RegisterForm>
        </RegisterFormContainer>
    </RegisterContainer>
    )
}
