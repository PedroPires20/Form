import React from "react"
import { 
    LoginContainer,
    LoginFormContainer,
    LoginHeaderL,
    LoginHeaderSm,
    LoginForm,
    LoginLinks
} from "./LoginStyles"

export function Login() {
    return (
    <LoginContainer>
        <LoginFormContainer>
            <LoginHeaderL>Form</LoginHeaderL>
            <LoginHeaderSm>Faça seu login</LoginHeaderSm>
            <LoginForm>
                <label>Entre seu email:</label>
                <input/>
                <label>Entre sua senha:</label>
                <input/>
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
