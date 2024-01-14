import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../button/Button";
import Input from "../input/Input";
import "./login_form.css";

const LoginForm: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3333/session",
        {
          cpf: cpf,
          passwordHash: passwordHash,
        }
      );
      console.log("Login bem-sucedido:", response.data);
      
      setCpf("");
      setPasswordHash("");
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {

        console.error("Erro de login:", error.response.data);
        setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
      } else {

        console.error("Erro desconhecido:", error);
        setErrorMessage("Erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1 style={{ fontSize: "2.1em", color: "#f2f2f2" }}>Login</h1>
        <Input
          value={cpf}
          type={"text"}
          readOnly={false}
          isRequired={false}
          placeholder="CPF..."
          maxlength={14}
          valueChange={setCpf}
        />

        <Input
          value={passwordHash}
          type={"password"}
          readOnly={false}
          isRequired={false}
          placeholder="Password..."
          valueChange={setPasswordHash}
        />

        <Button type="submit">Login</Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="register-link">
          <p>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
