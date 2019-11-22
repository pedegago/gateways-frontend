import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDevice } from "../../actions/actions";
import { FormGroup, Button } from "reactstrap";
import DeviceForm from "../base/DeviceForm";
import useAlert from "../hooks/useAlert";

const GatewayCreate = () => {
    const [loading, isLoading] = useState();
    const [alert, showAlert] = useAlert();

    const dispatch = useDispatch();

    return (
        <article>
            {alert}
            <DeviceForm title="Add Device">
                {(gateway, online, vendor, submit, reset) => (
                    <FormGroup>
                        <Button
                            color="primary"
                            onClick={(e) => {
                                submit(e, () => {
                                    isLoading(true);

                                    dispatch(
                                        createDevice(gateway, online, vendor)
                                    ).then((res) => {
                                        showAlert(
                                            res,
                                            "Device created successfully."
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
            </DeviceForm>
        </article>
    );
};

export default GatewayCreate;
