import {Form} from 'react-bootstrap';

export function Input ({ label, name, type, register, required, errors }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                id={name}
                placeholder="Type here..."
                {...register(name, {
                    required: required
                })}
            />
            {errors[name] && (<p className="text-warning">{errors[name].message}</p>)}
        </Form.Group>
    )
}