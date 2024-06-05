import {Form} from 'react-bootstrap'
import {Controller} from "react-hook-form";

export function Select({ label, name, options, register, required, errors, control }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            {...register(name, {
                required: required
            })}
            render={({ field }) => (
                <Form.Group>
                    <Form.Label htmlFor={name}>{label}</Form.Label>
                    <Form.Select {...field}>
                        <option>Select here...</option>
                        {options.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Form.Select>
                    {errors[name] && (<p className="text-warning">{errors[name].message}</p>)}
                </Form.Group>
            )}
        />
    );
}
