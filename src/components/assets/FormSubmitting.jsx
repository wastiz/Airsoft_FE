import {Alert, Spinner} from "react-bootstrap";
import React from "react";

export function FormSubmitting({isSubmitting, errors, isSubmitSuccessful, successText}) {
    return (
        <div className={'form-submitting'}>
            {isSubmitting && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {errors.root && (
                <Alert key={'danger'} variant={'danger'}>
                    {errors.root.message}
                </Alert>
            )}
            {isSubmitSuccessful && (
                <Alert key={'success'} variant={'success'}>
                    {successText}
                </Alert>
            )}
        </div>
    )
}

// Just copy-paste in react hook form
// <FormSubmitting
//     isSubmitting={isSubmitting}
//     errors={errors}
//     isSubmitSuccessful={isSubmitSuccessful}
//     successText={'Team created successfully'}
// />