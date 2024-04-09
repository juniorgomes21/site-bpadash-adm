import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import api from "../../services/api";
import { formatDateAndHours, maskCell } from "../../Validation&Formatation/formatation";
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from "@mui/material/Tooltip";
import SnackBarContext from "../../contexts/managerService";
import AlertCustom from "../../GlobalComponents/AlertCustom";
import CircularProgress from "@mui/material/CircularProgress";


function Messages(props) {

    document.title = "Mensagens de Contato";

    const { openSnackBarFun } = useContext(SnackBarContext);

    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, [])
    
    async function getMessages() {
        setLoading(true);
        try {
            const response = await api.get("/adm/messages");
            setMessages(response.data);

        } catch (e) {
            console.log(e);
            openSnackBarFun();
        }
        setLoading(false);
    }

    async function conclude(id) {
        try {
            await api.post(`/adm/messages/conclude/${id}`);
            getMessages();
            openSnackBarFun(false, "Mensagem concluída!");

        } catch (e) {
            console.log(e);
            openSnackBarFun();
        }
    }

    async function deleteMessage(id) {
        try {
            await api.post(`/adm/messages/delete/${id}`);
            getMessages();
            openSnackBarFun(false, "Mensagem apagada!");
        } catch (e) {
            openSnackBarFun();
        }
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Mensagens de")} breadcrumbItem={props.t("Contato")} />
                    <div className="">
                        {
                            loading ?
                                <div className="flex justify-center w-full">
                                    <CircularProgress />
                                </div>
                            :
                                messages.length == 0 ?   
                                    <div>
                                        <AlertCustom
                                            msg="Nenhuma mensagem encontrada"
                                            type="info"
                                        />
                                    </div>
                                :
                                    <div className="flex flex-col h-[45rem] overflow-y-auto">
                                        {
                                            messages.map((message, index) => (
                                                <div key={index} className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4">
                                                    <div className="flex justify-end w-full">
                                                        <Tooltip title="Concluir Contato" placement="top">
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                onClick={() => conclude(message.id)}
                                                            >
                                                                <CheckIcon />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Excluir contato" placement="top">
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                className="!ml-2"
                                                                onClick={() => deleteMessage(message.id)}
                                                            >
                                                                <DeleteForeverIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Data:</p>
                                                        <p className="ml-4">{formatDateAndHours(message.date)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Nome:</p>
                                                        <p className="ml-4">{message.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Pacote:</p>
                                                        <p className="flex ml-4">
                                                            {message.packageName}
                                                            <BookmarkIcon
                                                                color="success"
                                                                className="text-orange-600"
                                                                sx={{
                                                                    fontSize: 20,
                                                                    ml: 1,
                                                                    color:
                                                                        message.packageName ===
                                                                        "Bronze"
                                                                            ? "#945c25"
                                                                            : message.packageName ===
                                                                                "Ouro"
                                                                            ? "#ffd700"
                                                                            : "#6f7270",
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Email:</p>
                                                        <p className="ml-4">{message.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">WhatsApp:</p>
                                                        <p className="ml-4">{message.cell != "" ? maskCell(message.cell) : "Sem número"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Mensagem:</p>
                                                        <p className="ml-4">
                                                            {message.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

Messages.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Messages);
