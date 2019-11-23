/**
 * Required modules.
 */
import React, { useState } from "react";
import FormValidator from "../../utils/FormValidator";
import FormGroup from "./FormGroup";

/**
 * Creates a validator object for
 * managing all validations in the form.
 * This class receives the criterials for
 * validations.
 */
const validator = new FormValidator([
    {
        field: "serial",
        method: "isEmpty",
        validWhen: false,
        message: "Gateway serial is required."
    },
    {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "Gateway name is required."
    },
    {
        field: "ipv4",
        method: "isIP",
        args: [4],
        validWhen: true,
        message: "Invalid IPv4 format."
    }
]);

/**
 * This component renders input controls
 * for managing gateways, but all operations
 * with those datas are managed via render
 * props for other components.
 */
const GatewayForm = ({ children, _serial, _name, _ipv4, title }) => {
    // Attributes of a gateway and required hooks.
    const [serial, setSerial] = useState(_serial || "");
    const [name, setName] = useState(_name || "");
    const [ipv4, setIpv4] = useState(_ipv4 || "");

    const [submited, isSubmited] = useState();

    const validate = () =>
        validator.validate({
            serial,
            name,
            ipv4
        });

    // Validator variable.
    const _validate = submited
        ? validate()
        : validator.valid();

    // Vía render props all components will
    // be able to proceed to processing own
    // actions with this function.
    const submit = (e, action) => {
        e.preventDefault();

        isSubmited(true);

        if (validate().isValid)
            action();
    };

    // Vía render props all componetns will
    // be able to reset all fields in this form.
    const reset = () => {
        isSubmited();

        setSerial("");
        setName("");
        setIpv4("");
    }

    return (
        <form>
            {title && <h2>{title}</h2>}
            <FormGroup
                name="serial"
                label="Serial"
                value={serial}
                onChange={(e) => { setSerial(e.target.value) }}
                validator={_validate}
            />
            <FormGroup
                name="name"
                label="Name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                validator={_validate}
            />
            <FormGroup
                name="ipv4"
                label="Internet Protocol v4"
                value={ipv4}
                onChange={(e) => { setIpv4(e.target.value) }}
                validator={_validate}
            />
            {/* Exposing all fields and main actions. */}
            {children(serial, name, ipv4, submit, reset)}
        </form>
    );
};

/**
 * Exporting component
 */
export default GatewayForm;
