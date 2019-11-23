/**
 * Required modules.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGateways } from "../../actions/actions";
import FormValidator from "../../utils/FormValidator";
import { FormGroup, Label, Input, CustomInput, FormFeedback } from "reactstrap";
import CustomFormGroup from "./FormGroup";
import useAlert from "../hooks/useAlert";
import _ from "lodash";
import Loading from "./Loading";

/**
 * Creates a validator object for
 * managing all validations in the form.
 * This class receives the criterials for
 * validations.
 */
const validator = new FormValidator([
    {
        field: "vendor",
        method: "isEmpty",
        validWhen: false,
        message: "Device vendor is required."
    },
    {
        field: "gateway",
        method: "isEmpty",
        validWhen: false,
        message: "Provide gateway which the device belongs to."
    }
]);

/**
 * This component renders input controls
 * for managing devices, but all operations
 * with those datas are managed via render
 * props for other components.
 */
const DeviceForm = ({ children, title }) => {
    // Attributes of a device.
    const [online, isOnline] = useState(true);
    const [vendor, setVendor] = useState("");
    const [gateway, setGateway] = useState("");

    // Required hooks.
    const [submited, isSubmited] = useState();
    const [loading, isLoading] = useState(true);
    const [alert, showAlert] = useAlert();

    const dispatch = useDispatch();
    const gateways = useSelector((state) => state.gateways);

    // Fetching all gateways in first render,
    // and storing it into global store.
    useEffect(() => {
        dispatch(getAllGateways()).then((e) => {
            // Show an alert with errors.
            if (!e.status)
                showAlert(
                    e,
                    "",
                    "An error occurred. Please, try reloading entire page."
                );

            isLoading(false);
        });
    }, [dispatch]);

    const validate = () =>
        validator.validate({
            vendor,
            gateway
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

        isOnline(false);
        setVendor("");
        setGateway("");
    }

    return (
        <form>
            {alert}
            <h2>{title}</h2>
            <FormGroup>
                <CustomInput
                    id="online"
                    type="switch"
                    inline
                    label="Is Online"
                    defaultChecked={online}
                    onChange={(e) => { isOnline(e.target.checked) }}
                />
            </FormGroup>
            <CustomFormGroup
                name="vendor"
                label="Vendor"
                value={vendor}
                onChange={(e) => { setVendor(e.target.value) }}
                validator={_validate}
            />
            <FormGroup>
                <Label for="gateway">
                    Gateway
                </Label>
                {loading
                    ? <Loading />
                    : (
                        <>
                            <Input
                                id="gateway"
                                type="select"
                                value={gateway}
                                onChange={(e) => { setGateway(e.target.value) }}
                                invalid={_validate.gateway.isInvalid}
                            >
                                <option value="">Select a gateway...</option>
                                {_.map(gateways, (g) =>
                                    <option key={g.serial} value={g.serial}>
                                        {g.serial}: {g.name}
                                    </option>
                                )}
                            </Input>
                            <FormFeedback>
                                {_validate.gateway.message}
                            </FormFeedback>
                        </>
                    )
                }
            </FormGroup>
            {/* Exposing all fields and main actions. */}
            {children(gateway, online, vendor, submit, reset)}
        </form>
    );
};

/**
 * Exporting component
 */
export default DeviceForm;
