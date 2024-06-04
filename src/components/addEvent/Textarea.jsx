import {Form} from 'react-bootstrap';

export function Textarea ({ label, name, description, register, required, errors }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                id={name}
                name={name}
                placeholder='Type here..'
                {...register(name, {
                    required: required
                })}
            />
            {errors[name] && (<p className="text-warning">{errors[name].message}</p>)}
            <p>{description}</p>
        </Form.Group>
    )
}