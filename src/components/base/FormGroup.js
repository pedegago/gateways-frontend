/**
 * Required modules.
 */
import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";


/**
 * This component renders a FormGroup with
 * a basic input and label. Also include
 * validation options.
 */
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

/**
 * Exporting component
 */
export default _FormGroup;
