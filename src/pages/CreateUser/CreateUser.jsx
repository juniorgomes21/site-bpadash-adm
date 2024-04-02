import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { useFormik } from "formik";
import { registerUser, apiError } from "../../store/actions";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { LoadingButton } from "@mui/lab";

function CreateUser(props) {

    document.title = "Criar usuário";

    const dispatch = useDispatch();
    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        email: '',
        username: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        username: Yup.string().required("Please Enter Your Username"),
        password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (values) => {
        dispatch(registerUser(values));
      }
    });
  
    const { user, registrationError, loading } = useSelector(state => ({
      user: state.Account.user,
      registrationError: state.Account.registrationError,
      loading: state.Account.loading,
    }));
  
    useEffect(() => {
      dispatch(apiError(""));
    }, []);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Criar usuário")} breadcrumbItem={props.t("Criar usuário")} />
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <CardBody className="pt-0">
                                    <div className="p-2">
                                        <Form
                                        className="form-horizontal"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                        >
                                        {user && user ? (
                                            <Alert color="success">
                                            Register User Successfully
                                            </Alert>
                                        ) : null}

                                        {registrationError && registrationError ? (
                                            <Alert color="danger">{registrationError}</Alert>
                                        ) : null}

                                        <div className="mb-3">
                                            <Label className="form-label">Username</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">CNPJ</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">packageUser</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Nome de usuário Root</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Celular</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">CEP</Label>
                                            <Input
                                            name="username"
                                            type="text"
                                            placeholder="Enter username"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.username || ""}
                                            invalid={
                                                validation.touched.username && validation.errors.username ? true : false
                                            }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Email</Label>
                                            <Input
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            type="email"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.email || ""}
                                            invalid={
                                                validation.touched.email && validation.errors.email ? true : false
                                            }
                                            />
                                            {validation.touched.email && validation.errors.email ? (
                                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Password</Label>
                                            <div className="input-group auth-pass-inputgroup">
                                            <Input
                                                name="password"
                                                value={validation.values.password || ""}
                                                type={passwordShow ? "text" : "password"}
                                                placeholder="Enter Password"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                validation.touched.password && validation.errors.password ? true : false
                                                }
                                            />
                                            <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                                                <i className="mdi mdi-eye-outline"></i></button>
                                            </div>
                                            {validation.touched.password && validation.errors.password ? (
                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Password</Label>
                                            <div className="input-group auth-pass-inputgroup">
                                            <Input
                                                name="password"
                                                value={validation.values.password || ""}
                                                type={passwordShow ? "text" : "password"}
                                                placeholder="Enter Password"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                validation.touched.password && validation.errors.password ? true : false
                                                }
                                            />
                                            <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                                                <i className="mdi mdi-eye-outline"></i></button>
                                            </div>
                                            {validation.touched.password && validation.errors.password ? (
                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <Tooltip
                                                title="Gerar uma senha de 8 dígitos aleatória para o usuário"
                                                placement="top"
                                            >
                                                <Button
                                                    variant="outlined"
                                                >
                                                    Gerar Senha
                                                </Button>
                                            </Tooltip>
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                loading={false}
                                                color="success"
                                            >
                                                Registrar
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
    )
}

CreateUser.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(CreateUser);
