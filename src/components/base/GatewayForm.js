import React, { useState } from "react";
import FormValidator from "../../utils/FormValidator";
import FormGroup from "./FormGroup";

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

const GatewayForm = ({ children, _serial, _name, _ipv4, title }) => {
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

    const _validate = submited
        ? validate()
        : validator.valid();

    const submit = (e, action) => {
        e.preventDefault();

        isSubmited(true);

        if (validate().isValid)
            action();
    };

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
            {children(serial, name, ipv4, submit, reset)}
        </form>
    );
};

export default GatewayForm;
