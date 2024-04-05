import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import {
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/bitmap.png";
import AlertCustom from "../../GlobalComponents/AlertCustom";
import AuthContext from "../../contexts/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";


function Login(props) {
    document.title = "Login | bpadash ADM";

    const { loadingLogin, errorLogin, msgError, handleLogin } = useContext(AuthContext);

    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Por favor informe seu Email")
                .min(10, "O email deve ter no mínimo 10 caracteres")
                .max(50, "O email deve ter no máximo 50 caracteres"),
            password: Yup.string()
                .required("Por favor informe sua senha")
                .min(8, "Sua senha deve ter no mínimo 8 caracteres")
                .max(50, "Sua senha deve ter no máximo 50 caracteres"),
        }),
        onSubmit: (values) => {
            handleLogin(values.email, values.password);
        },
    });
    

    return (
        <>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">
                                                    olá Administrador!
                                                </h5>
                                                <p>
                                                    Faça login para ter acesso a plataforma.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img
                                                src={profile}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <Link
                                            to="/"
                                            className="auth-logo-light"
                                        >
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        className="rounded-circle"
                                                        width="50"
                                                    />
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            {errorLogin && (
                                                <div className="my-3">
                                                    <AlertCustom
                                                        msg={msgError}
                                                        type="error"
                                                    />
                                                </div>
                                            )}

                                            <div className="mb-3">
                                                <Label className="form-label">
                                                    Email
                                                </Label>
                                                <Input
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Seu email"
                                                    type="email"
                                                    onChange={
                                                        validation.handleChange
                                                    }
                                                    onBlur={
                                                        validation.handleBlur
                                                    }
                                                    value={
                                                        validation.values
                                                            .email || ""
                                                    }
                                                    invalid={
                                                        validation.touched
                                                            .email &&
                                                        validation.errors.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.email &&
                                                    validation.errors.email && (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .email
                                                            }
                                                        </FormFeedback>
                                                    )}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">
                                                    Senha
                                                </Label>
                                                <div className="input-group auth-pass-inputgroup">
                                                    <Input
                                                        name="password"
                                                        value={
                                                            validation.values
                                                                .password || ""
                                                        }
                                                        type={
                                                            passwordShow
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Sua senha"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .password &&
                                                            validation.errors
                                                                .password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            setPasswordShow(
                                                                !passwordShow
                                                            )
                                                        }
                                                        className="btn btn-light "
                                                        type="button"
                                                        id="password-addon"
                                                    >
                                                        <i className="mdi mdi-eye-outline"></i>
                                                    </button>
                                                    {validation.touched
                                                        .password &&
                                                        validation.errors
                                                            .password && (
                                                            <FormFeedback type="invalid">
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            </FormFeedback>
                                                        )}
                                                </div>
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <LoadingButton
                                                    variant="contained"
                                                    loading={
                                                        loadingLogin
                                                    }
                                                    type="submit"
                                                >
                                                    Entrar
                                                </LoadingButton>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
};
