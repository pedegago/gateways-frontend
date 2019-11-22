import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const _FormGroup = ({
    name,
    label,
    value,
    onChange,
    validator
}) => {
    return (
        <FormGroup>
            <Label for={name}>
                {label}
            </Label>
            <Input
                id={name}
                value={value}
                onChange={onChange}
                invalid={validator[name].isInvalid}
            />
            <FormFeedback>
                {validator[name].message}
            </FormFeedback>
        </FormGroup>
    );
};

export default _FormGroup;
