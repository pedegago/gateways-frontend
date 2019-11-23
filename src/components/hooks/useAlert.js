/**
 * Required modules.
 */
import React, { useState } from "react";
import { Alert } from "reactstrap";
import _ from "lodash";

/**
 * This hook allows to show messages to the user.
 */
const useAlert = () => {
    // Required hooks.
    const [open, isOpen] = useState(false);
    const [type, setType] = useState();
    const [message, setMessage] = useState();

    // This function will be called in order to
    // execute actions when is necessary to show
    // informations depending of a response object
    // and it status.
    const showAlert = (response, successMessage, errorMessage = null) => {
        const r = response.response;

        if (response.status) {
            setType("success");
            setMessage(`✅ ${successMessage}`);
        } else if (r) {
            let message = r.data
                ? r.data.message
                : response.message

            if (r.data && r.data.fields) {
                message += " ";
                message += _.join(
                    _.map(r.data.fields, (f) => f),
                    "."
                );
            }

            setType("warning");
            setMessage(`⚠ ${errorMessage || message}`);
        } else {
            setType("danger");
            setMessage(`⛔ ${errorMessage || response.message}`);
        }

        isOpen(true);
    };

    return [
        <Alert
            isOpen={open}
            color={type}
            toggle={() => {
                isOpen(false);
            }}
        >
            {message}
        </Alert>,
        showAlert
    ];
};

/**
 * Exporting component
 */
export default useAlert;
