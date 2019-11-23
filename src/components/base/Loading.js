/**
 * Required modules.
 */
import React from "react";
import { Spinner } from "reactstrap";

/**
 * This component renders a loading message
 * with a spinner ainimation.
 */
const Loading = () => {
    return (
        <div className="d-flex align-items-center">
            <Spinner type="grow" color="primary" />
            &nbsp;Loading...
        </div>
    );
};

/**
 * Required modules.
 */
export default Loading;
