/**
 * Required modules.
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGateway } from "../../actions/actions";
import { FormGroup, Button } from "reactstrap";
import GatewayForm from "../base/GatewayForm";
import useAlert from "../hooks/useAlert";

/**
 * This page renders a form for adding gateways
 * to database.
 */
const GatewayCreate = () => {
    // Required hooks.
    const [loading, isLoading] = useState();
    const [alert, showAlert] = useAlert();

    const dispatch = useDispatch();

    return (
        <article>
            {alert}
            <GatewayForm title="Add Gateway">
                {(serial, name, ipv4, submit, reset) => (
                    <FormGroup>
                        <Button
                            color="primary"
                            onClick={(e) => {
                                submit(e, () => {
                                    isLoading(true);

                                    // Dispatching action for creating the new gateway.
                                    dispatch(
                                        createGateway(serial, name, ipv4)
                                    ).then((res) => {
                                        showAlert(
                                            res,
                                            "Gateway created successfully."
                                        );

                                        if (res.status)
                                            reset();

                                        isLoading(false);
                                    });
                                });
                            }}
                            disabled={loading}
                        >
                            <span role="img" aria-label="">✔</span>
                            &nbsp;Add
                        </Button>
                    </FormGroup>
                )}
            </GatewayForm>
        </article>
    );
};

/**
 * Exporting component
 */
export default GatewayCreate;
