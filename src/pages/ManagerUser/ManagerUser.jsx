import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import api from "../../services/api";
import Switch from '@mui/material/Switch';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SnackBarContext from "../../contexts/managerService";
import { maskCell, maskCNPJ } from "../../Validation&Formatation/formatation";


function ManagerUser(props) {

    document.title = "Gerenciar Usuário";

    const { openSnackBarFun } = useContext(SnackBarContext);

    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, [])


    async function getUsers() {
        try {
            const response = await api.get('/adm/users/get/all');
            console.log(response.data);
            setUsers(response.data);

        } catch(e) {
            console.log(e);
        }
    }

    async function changeActive(id, active) {
        try {
            await api.post(`/adm/users/active/${id}`);
            openSnackBarFun(false, `O usuário está ${ active ? "inativo" : "ativo" }!`);
            getUsers();
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Gerenciar Usuário")} breadcrumbItem={props.t("Gerenciar Usuário")} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Pacote</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Contato</TableCell>
                                <TableCell align="center">CNPJ</TableCell>
                                <TableCell align="center">Armazenamento usado</TableCell>
                                <TableCell align="center">Armazenamento total</TableCell>
                                <TableCell align="center">Ativo</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {users.map((user, index) => (
                                <TableRow
                                    key={user.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">
                                    {user.packageName}
                                    <BookmarkIcon
                                        color="success"
                                        className="text-orange-600"
                                        sx={{
                                            fontSize: 20,
                                            ml: 1,
                                            color:
                                                user.packageName ===
                                                "bronze"
                                                    ? "#945c25"
                                                    : user.packageName ===
                                                        "gold"
                                                    ? "#ffd700"
                                                    : "#6f7270",
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{maskCell(user.contact)}</TableCell>
                                <TableCell align="center">{maskCNPJ(user.cnpj)}</TableCell>
                                <TableCell align="center">{user.storageUsed}</TableCell>
                                <TableCell align="center">{user.totalStorage}</TableCell>
                                <TableCell align="center">
                                    <Switch
                                        checked={user.active}
                                        onClick={() => changeActive(user.id, user.active)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>

        </>
    )
}

ManagerUser.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(ManagerUser);
