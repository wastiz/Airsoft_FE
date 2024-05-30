export function Checkbox ({ label, name, type, description, register, required, errors }) {
    return (
        <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
                <input
                    id={name}
                    name={name}
                    type={type}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    {...register(name, {
                        required: required
                    })}
                />
            </div>
            <div className="text-sm leading-6">
                <label htmlFor={name} className="font-medium text-white">
                    {label}
                </label>
                <p className="text-white">{description}</p>
            </div>
            {errors[name] && (<div><p className='text-white'>{errors[name].message}</p></div>)}
        </div>
    )
}