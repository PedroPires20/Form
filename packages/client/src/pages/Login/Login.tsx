import React from "react"
import { 
    LoginContainer,
    LoginFormContainer,
    LoginHeaderL,
    LoginHeaderSm,
    LoginForm,
    LoginLinks,
    LoginFormError
} from "./LoginStyles"
import { useForm } from "react-hook-form"

interface LoginFormData {
    email: string
    password: string
}

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    function onSubmit(formData: LoginFormData) {
        console.log(formData);
    }

    return (
    <LoginContainer>
        <LoginFormContainer>
            <LoginHeaderL>Form</LoginHeaderL>
            <LoginHeaderSm>Faça seu login</LoginHeaderSm>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Entre seu email:</label>
                <input 
                type="mail" 
                placeholder="Email"
                {...register("email", { 
                    required: "Por favor, entre o seu endereço de email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Por favor, entre um endereço de email válido"
                    } 
                })}
                />
                {errors.email && <LoginFormError>{errors.email.message}</LoginFormError>}
                <label htmlFor="password">Entre sua senha:</label>
                <input
                type="password"
                placeholder="Senha"
                {...register("password", { required: "É necessário entrar sua senha" })}
                />
                {errors.password && <LoginFormError>{errors.password.message}</LoginFormError>}
                <button>Entrar</button>
            </LoginForm>
            <LoginLinks>
                    <a href="/forgot">Esqueceu sua senha?</a>
                    <a href="/register">Ainda não tem conta? Clique aqui para se cadastrar</a>
            </LoginLinks>
        </LoginFormContainer>
    </LoginContainer>
    )
}
