import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import api from "../../services/api";
import SnackBarContext from "../../contexts/managerService";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

function ValidateEmailUser(props) {

    document.title = "Validar Email do usuário";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { openSnackBarFun } = useContext(SnackBarContext);

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function apiChangePassword(data) {
        setLoading(true);
        try {
            await api.post(`/adm/users/test/email`, data);
            setCode(data.code);
            openSnackBarFun(false, "Senha Alterada");
            reset();
        } catch (e) {
            console.log(e);
            switch (e.response.data) {
                case "INCORRECT PASSWORD":
                    setErrorMsg("Senha Incorreta");
                    break;
                case "FORBIDDEN":
                    openSnackBarFun(true, "Você não tem autorização para continuar com essa ação");
                    break;
                case "NOT FOUND SESSION":
                    openSnackBarFun(true, "Sessão de usuário não encontrada");
                    break;
            }
        }
        setLoading(false);
    }

    function generatorPassword() {
        var lengthPassword = 5;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var password = '';
    
        for (var i = 0; i < lengthPassword; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        navigator.clipboard.writeText(password);

        openSnackBarFun(false, "Senha gerada!");
    }


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Validar Email do usuário")} breadcrumbItem={props.t("Validar Email do usuário")} />
                    {
                        code != "" ?
                            <div className="flex justify-center">
                                <div className="flex justify-center w-8/12">
                                    <div className="flex flex-col items-center">
                                        <p className="text-5xl font-bold">
                                            - {code} -
                                        </p>
                                        <div className="mt-10
                                        ">
                                            <Button
                                                variant="contained"
                                                onClick={() => setCode("")}
                                            >
                                                Concluir
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            
                            <>
                                { errorMsg != "" &&
                                    <div className="flex justify-center w-full text-red-500 text-base">
                                        <p>{errorMsg}</p>
                                    </div>
                                }
                                
                                <form onSubmit={handleSubmit(apiChangePassword)}>
                                    <div className="flex flex-col justify-center w-full items-center">
                                        <TextField
                                            id="email-input"
                                            label="Email do Usuário"
                                            variant="outlined"
                                            type="email"
                                            error={errors.email && true}
                                            inputProps={{ maxLength: 50 }}

                                            {...register("email",
                                                {
                                                    required: "A senha é obrigatória",
                                                    minLength: {
                                                        value: 11,
                                                        message: "A senha deve conter pelo menos 8 caracteres"
                                                    },
                                                    maxLength: {
                                                        value: 50,
                                                        message: "A senha deve conter no máximo 50 caracteres"
                                                    }
                                                }
                                            )}
                                            helperText={errors.email && errors.email.message}
                                            className="w-1/2 mt-3"
                                        />
                                        <TextField
                                            id="code-input"
                                            label="Código"
                                            variant="outlined"
                                            type="text"
                                            inputProps={{ maxLength: 5 }}
                                            error={errors.code && true}
                                            {...register("code",
                                                {
                                                    required: "O código deve conter 5 caracteres",
                                                    minLength: {
                                                        value: 5,
                                                        message: "A senha deve conter pelo menos 8 caracteres"
                                                    },
                                                    maxLength: {
                                                        value: 5,
                                                        message: "A senha deve conter no máximo 50 caracteres"
                                                    }
                                                }
                                            )}
                                            helperText={errors.code && errors.code.message}
                                            className="w-1/2 mt-3"
                                        />
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            loading={loading}
                                            className="w-1/4 mt-5"
                                        >
                                            Enviar Código
                                        </LoadingButton>
                                        {
                                            !loading &&
                                                <Button
                                                    variant="contained"
                                                    onClick={generatorPassword}
                                                    className="w-1/4 mt-2"
                                                >
                                                    GERAR CÓDIGO
                                                </Button>
                                        }
                                    </div>
                                </form>
                            </>
                    }
                </Container>
            </div>

        </>
    )
}

ValidateEmailUser.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(ValidateEmailUser);
