import {Form} from "react-bootstrap";

export function Checkbox ({ label, name, type, description, register, required, errors }) {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    name={name}
                    type={type}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    {...register(name, {
                        required: required
                    })}
                    label={label}
                />
            </Form.Group>
            {errors[name] && (<div><p className='text-white'>{errors[name].message}</p></div>)}
            <p>{description}</p>
        </>
    )
}