export function Textarea ({ label, name, description, register, required, errors }) {
    return (
        <div className="col-span-full">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-white">
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    id={name}
                    name={name}
                    rows={3}
                    placeholder='Type here..'
                    className="textarea w-full textarea-bordered text-white"
                    {...register(name, {
                        required: required
                    })}
                />
            </div>
            <p className="mt-3 text-sm leading-6 text-white">{description}</p>
            {errors[name] && (<div><p className='text-white'>{errors[name].message}</p></div>)}
        </div>
    )
}