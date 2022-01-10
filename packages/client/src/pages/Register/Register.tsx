import React from 'react'
import { useForm } from 'react-hook-form'
import { 
    RegisterContainer,
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
        <RegisterHeader>Cadastro:</RegisterHeader>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
            <RegisterFormLabel>Entre seu nome:</RegisterFormLabel>
            <RegisterFormInput {...register("username", { required: true })}/>
            {errors.username && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
            <RegisterFormLabel>Entre seu email:</RegisterFormLabel>
            <RegisterFormInput {...register("email", { required: true })}/>
            {errors.email && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
            <RegisterFormLabel>Entre uma senha:</RegisterFormLabel>
            <RegisterFormInput {...register("password", { required: true })}/>
            {errors.password && <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>}
            <RegisterFormLabel>Confirme sua senha:</RegisterFormLabel>
            <RegisterFormInput {...register("passwordValidade", { 
                required: true,
                validate: (validatePass) => validatePass === password })}
            />
            {
             errors.passwordValidade?.type === "required"? 
                <RegisterFormError>É necessário preencher esse campo.</RegisterFormError>:
                <RegisterFormError>As senhas entradas não coincidem.</RegisterFormError>
            }
            <RegisterFormButtons>
                <button type="reset">Redefinir</button>
                <button>Registrar</button>
            </RegisterFormButtons>
        </RegisterForm>
    </RegisterContainer>
    )
}
