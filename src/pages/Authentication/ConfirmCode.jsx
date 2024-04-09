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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function ConfirmCode(props) {
    document.title = "Confirm Code | bpadash ADM";

    const { loadingLogin, errorCode, msgError, handleCode } = useContext(AuthContext);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .required("Por favor informe o código")
                .min(10, "O código deve conter 20 caracteres")
        }),
        onSubmit: (values) => {
            handleCode(values.code);
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
                                                    Olá Administrador!
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
                                            {errorCode && (
                                                <div className="my-3">
                                                    <AlertCustom
                                                        msg={msgError}
                                                        type="error"
                                                    />
                                                </div>
                                            )}

                                            <div className="mb-3">
                                                <Label className="form-label">
                                                    Código
                                                </Label>
                                                <TextField
                                                    name="code"
                                                    className="form-control"
                                                    placeholder="Código"
                                                    type="password"
                                                    inputProps={{ maxLength: 20 }}
                                                    onChange={validation.handleChange}
                                                    value={validation.values.code || ""}
                                                    error={validation.touched.code && validation.errors.code ? true : false }
                                                />
                                                {validation.touched.code &&
                                                    validation.errors.code && (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .code
                                                            }
                                                        </FormFeedback>
                                                    )}
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <LoadingButton
                                                    variant="contained"
                                                    color="success"
                                                    loading={
                                                        loadingLogin
                                                    }
                                                    type="submit"
                                                >
                                                    confirmar código
                                                </LoadingButton>
                                                <Link to="/login" className="mt-2">
                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        variant="contained"
                                                    >
                                                        voltar ao login
                                                    </Button>
                                                </Link>
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

export default withRouter(ConfirmCode);

ConfirmCode.propTypes = {
    history: PropTypes.object,
};
