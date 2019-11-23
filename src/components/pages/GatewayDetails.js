/**
 * Required modules.
 */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getGateway, updateGateway, removeGateway } from "../../actions/actions";
import { FormGroup, Button, Row, Col } from "reactstrap";
import * as routes from "../../utils/routes";
import GatewayForm from "../base/GatewayForm";
import useAlert from "../hooks/useAlert";
import DevicesTable from "../base/DevicesTable";
import _ from "lodash";

/**
 * This page show all availables devices for a
 * gateway. It shows also the form for updating
 * the gateway information.
 */
const GatewayDetails = () => {
    // Required hooks.
    const [gateway, setGateway] = useState();
    const [fetchingGateway, setFetchingGateway] = useState(true);
    const [loading, isLoading] = useState();
    const [alert, showAlert] = useAlert();

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    // This effect dispatch action in order to
    // get infromation of specified gateway.
    useEffect(() => {
        dispatch(getGateway(params.serial)).then((e) => {
            if (!e.status)
                showAlert(e);
            else
                setGateway(e.data);

            setFetchingGateway(false);
            isLoading(false);
        });
    }, [dispatch, setGateway, setFetchingGateway, params.serial]);

    return (
        <article>
            {alert}
            <h2>Details of Gateway {params.serial}</h2>
            <Row className="align-items-start">
                {!fetchingGateway && gateway &&
                    (
                        <Col lg={4} className="pt-3 mb-4 border order-lg-1">
                            {/* Renders the gateway form for updating it values. */}
                            <GatewayForm
                                _serial={gateway.serial}
                                _name={gateway.name}
                                _ipv4={gateway.ipv4}
                            >
                                {(serial, name, ipv4, submit, reset) => (
                                    <FormGroup>
                                        <Button
                                            color="primary"
                                            onClick={(e) => {
                                                submit(e, () => {
                                                    isLoading(true);

                                                    dispatch(
                                                        updateGateway(params.serial, serial, name, ipv4)
                                                    ).then((res) => {
                                                        showAlert(
                                                            res,
                                                            "Gateway information updated successfully."
                                                        );

                                                        if (params.serial !== serial)
                                                            history.push(_.replace(
                                                                routes.GATEWAYS_DETAILS,
                                                                ":serial",
                                                                serial
                                                            ));

                                                        isLoading(false);
                                                    });
                                                });
                                            }}
                                            disabled={loading}
                                        >
                                            <span role="img" aria-label="">✏</span>
                                            &nbsp;Update
                                        </Button>
                                    </FormGroup>
                                )}
                            </GatewayForm>
                        </Col>
                    )
                }
                <Col>
                    {/* Renders the device's table */}
                    <DevicesTable
                        gateway={params.serial}
                        alert={(res, successMessage, errorMessage) => {
                            showAlert(
                                res,
                                successMessage,
                                errorMessage
                            );
                        }}
                    />
                </Col>
            </Row>
        </article>
    );
};

/**
 * Exporting component
 */
export default GatewayDetails;
