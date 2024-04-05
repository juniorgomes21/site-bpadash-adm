import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, CardBody, Card, Container, Label } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from "@mui/icons-material/Visibility";
import SnackBarContext from "../../contexts/managerService";
import api from "../../services/api";


function CreateUser(props) {

    document.title = "Criar usuário";
    
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors }
    } = useForm();

    const { openSnackBarFun } = useContext(SnackBarContext);

    const [showPassword, setShowPassword] = useState(false);
    const [value, setValueIn] = useState('1');


    async function create(data) {
        try {
            await api.post("/adm/configurations/create/user", data);
            openSnackBarFun(false, "Usuário criado com sucesso!");

        } catch(e) {
            console.log(e);

            switch (e.response.data) {
                case "INCORRECT PASSWORD":
                    openSnackBarFun(true, "Senha de administrador Incorreta");
                    break;
                case "USER ALREADY REGISTERED":
                    openSnackBarFun(true, "O CNPJ ou Email (usuário) já esta registrado");
                    break;
                case "CEP INVALID":
                    openSnackBarFun(true, "O CEP informado não é válido");
                    break;
                default:
                    openSnackBarFun();
            }
        }
    }

    
    function handleChange (event) {
        const value = Number(event.target.value);
        setValueIn(value);
        setValue("packageUser", value === 1 ? "bronze" : value === 2 ? "gold" : "platinum");
    }

    function generatorPassword() {
        var lengthPassword = 12;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
                    <Breadcrumbs title={props.t("Criar usuário")} breadcrumbItem={props.t("Criar usuário")} />
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <CardBody className="pt-0">
                                    <div className="p-2">
                                        <form  onSubmit={handleSubmit(create)}>
                                            <div className="mb-3">
                                                <Label className="form-label">Nome</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="Nome"
                                                    inputProps={{ maxLength: 50 }}
                                                    error={errors.name && true}
                                                    {...register("name",
                                                        {
                                                            required: "O nome é obrigatório",
                                                            minLength: {
                                                                value: 5,
                                                                message: "O nome deve conter pelo menos 5 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 50,
                                                                message: "O nome deve conter no máximo 50 caracteres"
                                                            }
                                                        }
                                                    )}
                                                    helperText={errors.name && errors.name.message}
                                                />
                                            </div>
                                            
                                            <div className="mb-3">
                                                <Label className="form-label">Email</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="exemplo@gmail.com"
                                                    error={errors.email && true}
                                                    inputProps={{ maxLength: 50 }}
                                                    {...register("email",
                                                        {
                                                            required: "O Email é obrigatório"
                                                        }
                                                    )}
                                                    helperText={errors.email && errors.email.message}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Celular</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="(91) 9 9999-9999"
                                                    error={errors.cell && true}
                                                    inputProps={{ maxLength: 16 }}
                                                    {...register("cell",
                                                        {
                                                            required: "O Celular é obrigatório"
                                                        }
                                                    )}
                                                    helperText={errors.cell && errors.cell.message}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">CEP</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="00000-000"
                                                    error={errors.cep && true}
                                                    inputProps={{ maxLength: 50 }}
                                                    {...register("cep",
                                                        {
                                                            required: "O CEP é obrigatório"
                                                        }
                                                    )}
                                                    helperText={errors.cep && errors.cep.message}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">CNPJ</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="XX.XXX.XXX/0001-XX"
                                                    error={errors.cnpj && true}
                                                    inputProps={{ maxLength: 14 }}
                                                    {...register("cnpj",
                                                        {
                                                            required: "O CNPJ é obrigatório",
                                                            minLength: {
                                                                value: 5,
                                                                message: "O CNPJ deve conter pelo menos 14 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 50,
                                                                message: "O CNPJ deve conter no máximo 14 caracteres"
                                                            }
                                                        }
                                                    )}
                                                    helperText={errors.cnpj && errors.cnpj.message}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Nome do usuário Root</Label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    placeholder="Nome do usuário Root"
                                                    error={errors.nameRoot && true}
                                                    inputProps={{ maxLength: 50 }}
                                                    {...register("nameRoot",
                                                        {
                                                            required: "O nome do usuário Root é obrigatório",
                                                            minLength: {
                                                                value: 5,
                                                                message: "O nome deve conter pelo menos 5 caracteres"
                                                            },
                                                            maxLength: {
                                                                value: 50,
                                                                message: "O nome deve conter no máximo 50 caracteres"
                                                            }
                                                        }
                                                    )}
                                                    helperText={errors.nameRoot && errors.nameRoot.message}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Pacote do usuário</Label>
                                                <FormControl
                                                        fullWidth
                                                        size="small"
                                                    >
                                                        <InputLabel id="demo-select-label"></InputLabel>
                                                        <Controller
                                                            name="packageUser"
                                                            control={control}
                                                            defaultValue="bronze"
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    id="demo-select"
                                                                    labelId="demo-select-label"
                                                                    label=""
                                                                    value={value}
                                                                    onChange={handleChange}
                                                                >
                                                                    <MenuItem value={1}>Bronze</MenuItem>
                                                                    <MenuItem value={2}>Ouro</MenuItem>
                                                                    <MenuItem value={3}>Platina</MenuItem>
                                                                </Select>
                                                            )}
                                                        />
                                                    </FormControl>
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <Label className="form-label">Senha do usuário</Label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-password"
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                    label="Password"
                                                    variant="outlined"
                                                    error={errors.password && true}
                                                    {...register("password",
                                                        {
                                                            required: "A senha é obrigatória",
                                                            validate: value => value.trim().length >= 8 || "A senha deve ter pelo menos 8 caracteres"
                                                        }
                                                    )}
                                                    helperText={ errors.password && errors.password.message}
                                                    className=""
                                                />
                                            </div>
    
                                            <div className="relative w-full mb-3">
                                                <Label className="form-label">Confirme a senha do usuário</Label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-password_confirmation"
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                    label="Confirm Password"
                                                    variant="outlined"
                                                    error={errors.password2 && true}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowPassword((show) => !show)}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    {...register("password2",
                                                        {
                                                            required: "A confirmação da senha é obrigatória",
                                                            minLength: {
                                                                value: 8,
                                                                message: "A senha deve ter pelo menos 8 caracteres"
                                                            },
                                                            validate: value => value == getValues("password") || "As senhas não são iguais",
                                                        }
                                                    )}
                                                    helperText={ errors.password2 && errors.password2.message}
                                                    className=""
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Sua senha</Label>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-password"
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                    label="Password"
                                                    variant="outlined"
                                                    error={errors.passwordAdm && true}
                                                    {...register("passwordAdm",
                                                        {
                                                            required: "A sua senha é obrigatória",
                                                            validate: value => value.trim().length >= 8 || "A senha deve ter pelo menos 8 caracteres"
                                                        }
                                                    )}
                                                    helperText={ errors.passwordAdm && errors.passwordAdm.message}
                                                    className=""
                                                />
                                            </div>

                                            <div className="flex justify-between mt-4">
                                                <Tooltip
                                                    title="Gerar uma senha de 8 dígitos aleatória para o usuário"
                                                    placement="top"
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        onClick={generatorPassword}
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
                                        </form>
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
