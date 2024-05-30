export function Input ({ label, name, type, register, required, errors }) {
    return (
        <div className="sm:col-span-3">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-white">
                {label}
            </label>
            <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        className="input w-full text-white"
                        placeholder="Type here..."
                        {...register(name, {
                            required: required
                        })}
                    />
                </div>
            </div>
            {errors[name] && (<div><p className=''>{errors[name].message}</p></div>)}
        </div>
    )
}