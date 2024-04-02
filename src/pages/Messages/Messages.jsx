import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

function Messages(props) {

    document.title = "Mensagens de Contato";

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("Mensagens de")} breadcrumbItem={props.t("Contato")} />
                    <div className="">
                        <div className="flex flex-col h-[45rem] overflow-y-auto">
                            <div className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4">
                                <div>
                                    <p className="font-bold">Data:</p>
                                    <p className="ml-4">ouro</p>
                                </div>
                                <div>
                                    <p className="font-bold">Nome:</p>
                                    <p className="ml-4">Junior gomes quaresma</p>
                                </div>
                                <div>
                                    <p className="font-bold">Pacote:</p>
                                    <p className="ml-4">ouro</p>
                                </div>
                                <div>
                                    <p className="font-bold">Email:</p>
                                    <p className="ml-4">alam.155@gamil.com</p>
                                </div>
                                <div>
                                    <p className="font-bold">Mensagem:</p>
                                    <p className="ml-4">
                                        O primeiro-ministro Benjamin Netanyahu será submetido a uma cirurgia de hérnia neste domingo (31), descoberta durante um exame de rotina, anunciou um comunicado de seu gabinete. Segundo informações da Reuters, ele ficará completamente sedado.
                                        “Durante este período, o vice-primeiro-ministro e ministro da Justiça, Yariv Levin, servirá como primeiro-ministro interino”, afirmou o comunicado.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4">
                                <div>
                                    <p className="font-bold">Nome:</p>
                                    <p className="ml-4">Junior gomes quaresma</p>
                                </div>
                                <div>
                                    <p className="font-bold">Email:</p>
                                    <p className="ml-4">alam.155@gamil.com</p>
                                </div>
                                <div>
                                    <p className="font-bold">Mensagem:</p>
                                    <p className="ml-4">
                                        O primeiro-ministro Benjamin Netanyahu será submetido a uma cirurgia de hérnia neste domingo
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4 mb-34">
                                <div>
                                    <p className="font-bold">Nome:</p>
                                    <p className="ml-4">Junior gomes quaresma</p>
                                </div>
                                <div>
                                    <p className="font-bold">Email:</p>
                                    <p className="ml-4">alam.155@gamil.com</p>
                                </div>
                                <div>
                                    <p className="font-bold">Mensagem:</p>
                                    <p className="ml-4">
                                        O primeiro-ministro Benjamin Netanyahu será submetido a uma cirurgia de hérnia neste domingo (31), descoberta durante um exame de rotina, anunciou um comunicado de seu gabinete. Segundo informações da Reuters, ele ficará completamente sedado.
                                        “Durante este período, o vice-primeiro-ministro e ministro da Justiça, Yariv Levin, servirá como primeiro-ministro interino”, afirmou o comunicado.
                                        O afastamento do primeiro-ministro para a cirurgia acontece em meio a pressão internacional protestos internos contra a guerra em Israel.
                                        No sábado (30) manifestantes foram às ruas nas cidades de Tel Aviv, Jerusalém, Cesareia, Raanana e Herzliya, exigindo a libertação de reféns na faixa de Gaza e a destituição de Netanyahu. Na rua Kaplan, em Jerusalém, manifestantes pediram eleições gerais.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4 mb-34">
                                <div>
                                    <p className="font-bold">Nome:</p>
                                    <p className="ml-4">Junior gomes quaresma</p>
                                </div>
                                <div>
                                    <p className="font-bold">Email:</p>
                                    <p className="ml-4">alam.155@gamil.com</p>
                                </div>
                                <div>
                                    <p className="font-bold">Mensagem:</p>
                                    <p className="ml-4">
                                        O primeiro-ministro Benjamin Netanyahu será submetido a uma cirurgia de hérnia neste domingo (31), descoberta durante um exame de rotina, anunciou um comunicado de seu gabinete. Segundo informações da Reuters, ele ficará completamente sedado.
                                        “Durante este período, o vice-primeiro-ministro e ministro da Justiça, Yariv Levin, servirá como primeiro-ministro interino”, afirmou o comunicado.
                                        O afastamento do primeiro-ministro para a cirurgia acontece em meio a pressão internacional protestos internos contra a guerra em Israel.
                                        No sábado (30) manifestantes foram às ruas nas cidades de Tel Aviv, Jerusalém, Cesareia, Raanana e Herzliya, exigindo a libertação de reféns na faixa de Gaza e a destituição de Netanyahu. Na rua Kaplan, em Jerusalém, manifestantes pediram eleições gerais.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col border-[1px] border-gray-400 rounded-lg p-4 mt-4 mb-34">
                                <div>
                                    <p className="font-bold">Nome:</p>
                                    <p className="ml-4">Junior gomes quaresma</p>
                                </div>
                                <div>
                                    <p className="font-bold">Email:</p>
                                    <p className="ml-4">alam.155@gamil.com</p>
                                </div>
                                <div>
                                    <p className="font-bold">Mensagem:</p>
                                    <p className="ml-4">
                                        O primeiro-ministro Benjamin Netanyahu será submetido a uma cirurgia de hérnia neste domingo (31), descoberta durante um exame de rotina, anunciou um comunicado de seu gabinete. Segundo informações da Reuters, ele ficará completamente sedado.
                                        “Durante este período, o vice-primeiro-ministro e ministro da Justiça, Yariv Levin, servirá como primeiro-ministro interino”, afirmou o comunicado.
                                        O afastamento do primeiro-ministro para a cirurgia acontece em meio a pressão internacional protestos internos contra a guerra em Israel.
                                        No sábado (30) manifestantes foram às ruas nas cidades de Tel Aviv, Jerusalém, Cesareia, Raanana e Herzliya, exigindo a libertação de reféns na faixa de Gaza e a destituição de Netanyahu. Na rua Kaplan, em Jerusalém, manifestantes pediram eleições gerais.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-10">
                            paginação
                        </div>
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
