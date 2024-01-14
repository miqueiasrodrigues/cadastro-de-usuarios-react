import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import Input from "../input/Input";
import axios from "axios";
import "./register_form.css";
import Card from "../card/Card";

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [passwordHash, setPasswordHash] = React.useState("");
  const [passwordHashConfirm, setPasswordHashConfirm] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("Escolha uma Foto");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedExtensions = ["jpeg", "jpg", "png"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        setImageUrl(file.name);
      } else {
        setErrorMessage(
          "Extensão de arquivo não permitida. Por favor, selecione um arquivo JPEG, JPG ou PNG."
        );
        event.target.value = "";
        setSelectedFile(null);
        setImageUrl("Escolha uma Foto");
      }
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setCpf("");
    setPasswordHash("");
    setPasswordHashConfirm("");
    setGender("");
    setImageUrl("Escolha uma Foto");
    setSelectedFile(null);
  };

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [errorMessage, successMessage]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (passwordHash !== passwordHashConfirm) {
      setErrorMessage("As senhas não coincidem");
      return;
    }
    const cleanedCpf = cpf.replace(/\D/g, "");
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("cpf", cleanedCpf);
      formData.append("passwordHash", passwordHash);
      formData.append("gender", gender);

      if (selectedFile) {
        formData.append("imageUrl", selectedFile);
      }
      const response = await axios
        .post("http://localhost:3333/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setSuccessMessage(true);
          setErrorMessage("Usuário cadastrado com sucesso!");
          handleClear();
        });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        console.error(`Erro de status ${status}:`, data);
        setErrorMessage(`${data.message || "Erro desconhecido"}`);
      } else {
        console.error("Erro desconhecido:", error);
        setErrorMessage("Erro desconhecido ao fazer registro.");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper-register">
        <form onSubmit={handleRegistration}>
          <h1 style={{ fontSize: "2.1em", color: "#f2f2f2" }}>Registrar-se</h1>
          <div className="col">
            <Input
              value={firstName}
              type={"text"}
              readOnly={false}
              isRequired={true}
              placeholder="Nome..."
              valueChange={setFirstName}
            />
            <div style={{ width: "20px" }}></div>
            <Input
              value={lastName}
              type={"text"}
              readOnly={false}
              isRequired={true}
              placeholder="Sobrenome..."
              valueChange={setLastName}
            />
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <Input
                value={cpf}
                type={"text"}
                readOnly={false}
                isRequired={true}
                placeholder="CPF..."
                maxlength={14}
                valueChange={setCpf}
              />
            </div>
            <div style={{ width: "20px" }}></div>
            <div className="row">
              <label className="file" htmlFor="imagen">
                {imageUrl}
              </label>
              <input
                className="file"
                type="file"
                name="imagen"
                id="imagen"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <label>Data de Nascimento:</label>
              <Input
                value={dateOfBirth}
                type={"date"}
                readOnly={false}
                isRequired={true}
                valueChange={setDateOfBirth}
              />
            </div>
            <div style={{ width: "20px" }}></div>
            <div className="row">
              <label htmlFor="dropbox">Gênero:</label>
              <select
                id="dropbox"
                name="dropbox"
                onChange={handleGenderChange}
                value={gender}
              >
                <option value="" disabled>
                  Selecione o Gênero
                </option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="N">Não informar</option>
              </select>
            </div>
          </div>
          <div className="col">
            <Input
              value={passwordHash}
              type={"password"}
              readOnly={false}
              isRequired={true}
              placeholder="Senha..."
              valueChange={setPasswordHash}
            />
            <div style={{ width: "20px" }}></div>
            <Input
              value={passwordHashConfirm}
              type={"password"}
              readOnly={false}
              isRequired={true}
              placeholder="Confirmar Senha..."
              valueChange={setPasswordHashConfirm}
            />
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button type="submit">Registrar</Button>
            <div style={{ height: "20px" }}></div>
            <p>
              Volta para <Link to="/login">fazer login!</Link>
            </p>
          </div>
        </form>
      </div>
      {errorMessage ? (
        <div className="messages">
          <Card
            color={
              successMessage ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)"
            }
          >
            {errorMessage}
          </Card>
        </div>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
