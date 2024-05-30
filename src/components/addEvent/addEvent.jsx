import placeholder from '../../img/placeholder.png'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState } from 'react';
import {useForm} from "react-hook-form";
import {Input} from "./Input";
import {Textarea} from "./Textarea";
import {Checkbox} from "./Checkbox";


function AddEvent() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const newId = uuidv4()

            const originalDate = new Date(data.date);
            const day = originalDate.getDate().toString().padStart(2, '0');
            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
            const year = originalDate.getFullYear().toString().slice(-2);
            const formattedDate = `${day}.${month}.${year}`;

            const response = await axios.post('http://localhost:5000/api/events', {
                _id: newId,
                title: data.title,
                description: data.description,
                rules: data.rules,
                gamePlot: data.gamePlot,
                date: formattedDate,
                price: data.price,
                location: data.location,
                ageRestriction: data.ageRestriction,
                times: {
                    meeting: data.meetingTime,
                    briefing: data.briefTime,
                    start: data.startTime,
                    end: data.endTime,
                },
                services: {
                    foodService: data.foodService,
                    hpaService: data.hpaService,
                    toiletService: data.toiletService,
                    shopService: data.shopService,
                    otherService: data.otherService,
                },
                photos: {
                    coverPhoto: coverEventImageSrc,
                    otherPhoto: otherEventImagesSrc,
                },
                regForm: {
                    firstName: data.regFirstName,
                    lastName: data.regLastName,
                    nickname: data.regNickname,
                    email: data.regEmail,
                    phone: data.regPhone,
                    age: data.regAge,
                    arbitraryContent: inputValues
                },
                orgFirstName: data.orgFirstName,
                orgLastName: data.orgLastName,
                orgEmail: data.orgEmail,
            });

            console.log(response.statusText);
            navigate('/');
        } catch (error) {
            setError("root", {
                message: "Something happened handling your event"
            })
            console.error('Error submitting data to MongoDB:', error);
        }
    }

    //Обработка ковер картинки
    const [coverEventImageSrc, setCoverEventImageSrc] = useState('');

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            formData.append('coverImage', event.target.files[0]);

            const {data} = await axios.post('http://localhost:5000/api/events/uploadCoverImage', formData);
            setCoverEventImageSrc(data.url);
        } catch (e) {
            console.warn(e);
            alert('Error uploading image');
        }
    }

    //Обработка остальных картинок

    const [otherEventImagesSrc, setOtherEventImagesSrc] = useState([]);

    const handleChangeFiles = async (event) => {
        try {
            const formData = new FormData();
            const files = event.target.files;

            for (let i = 0; i < files.length; i++) {
                formData.append('otherImages', files[i]);
            }

            const { data } = await axios.post('http://localhost:5000/api/events/uploadOtherImage', formData);
            setOtherEventImagesSrc(data.urls);
        } catch (e) {
            console.warn(e);
            alert('Error uploading images');
        }
    }

    //Обработка полей с разными аттрибутами

    const [inputs, setInputs] = useState([]);

    const handleAddTextarea = () => {
        setInputs([...inputs, { type: 'textarea', id: `textarea${inputs.length}` }]);
    };

    const handleAddSelect = () => {
        setInputs([...inputs, { type: 'select', id: `select${inputs.length}`, options: ['option1'] }]);
    };

    const [inputValues, setInputValues] = useState();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleAddOption = (id) => {
        setInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === id ? { ...input, options: [...input.options, `option${input.options.length + 1}`] } : input
            )
        );
    };

    return (
        <form className="px-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">Hey!!!</h2>
                    <p className="mt-1 text-sm leading-6 text-white">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <Input label='Event title*' name='title' type='text' register={register} required='Event title is required!' errors={errors} />
                        <Textarea label='Event description*' name='description' description='Write description about your event' register={register} required='Event description is required!' errors={errors} />
                        <Textarea label='Event Rules*' name='eventRules' description='Write rules on your event' register={register} required='Event rules are required!' errors={errors} />
                        <Textarea label='Game plot' name='gamePlot' description='Write game plot on your game' register={register} required={false} errors={errors}/>


                        <div className="col-span-full">
                            <h2 className="text-base font-semibold leading-7 text-white">General Inforamtion</h2>
                            <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-12">

                                <Input label='Event Date*:' name='date' type='date' register={register} required='Event Date is required!' errors={errors} />
                                <Input label='Price(put zero if event is free to attend)*:' name='price' type='number' register={register} required='Price is required!' errors={errors} />
                                <Input label='Location*:' name='location' type='text' register={register} required='Location is required!' errors={errors} />
                                <Input label='Age Restriction(put zero if there is no age restriction)*:' name='ageRestriction' type='number' register={register} required='Age Restriction is required!' errors={errors} />

                                <div className='text-white col-span-full'>Times:</div>

                                <Input label='Meeting time:' name='meetingTime' type='time' register={register} required={false} errors={errors} />
                                <Input label='Briefing time:' name='briefTime' type='time' register={register} required={false} errors={errors} />
                                <Input label='Start time*:' name='startTime' type='time' register={register} required="Start Time is required!" errors={errors} />
                                <Input label='End time:' name='endTime' type='time' register={register} required={false} errors={errors} />

                                <div className='text-white col-span-full'>Services:</div>

                                <Checkbox label='Food on Game' name='foodService' type='checkbox' description='There will be food on the game' register={register} required={false} errors={errors} />
                                <Checkbox label='HPA air service' name='hpaService' type='checkbox' description='There will be HPA air on the game' register={register} required={false} errors={errors} />
                                <Checkbox label='Toilet' name='toiletService' type='checkbox' description='There will be toilet on the game' register={register} required={false} errors={errors} />
                                <Checkbox label='Airsoft Shop' name='shopService' type='checkbox' description='There will be some shop on the game' register={register} required={false} errors={errors} />
                                <Input label='Other service:' name='otherService' type='text' register={register} required={false} errors={errors}/>

                            </div>
                        </div>

                        {/*Cover photo*/}

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                                Cover photo
                            </label>
                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <img src={coverEventImageSrc ? coverEventImageSrc : placeholder} alt="cover"
                                         className='w-12 h-12'/>
                                    <div className="mt-4 flex text-sm leading-6 text-white">
                                        <label
                                            htmlFor="cover-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="cover-upload" name="cover-upload" type="file" className="sr-only"
                                                   onChange={handleChangeFile}/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/*Other photos, videos*/}

                        <div className="col-span-full">
                            <label htmlFor="other-photo" className="block text-sm font-medium leading-6 text-white">
                                Other photos
                            </label>
                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {otherEventImagesSrc.length > 0 ? (
                                            otherEventImagesSrc.map((src, index) => (
                                                <img key={index} src={src} alt={`uploaded ${index}`}
                                                     className='w-12 h-12'/>
                                            ))
                                        ) : (
                                            <img src={placeholder} alt="placeholder" className='w-12 h-12'/>
                                        )}
                                    </div>
                                    <div className="mt-4 flex text-sm leading-6 text-white">
                                        <label
                                            htmlFor="other-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload files</span>
                                            <input
                                                id="other-upload"
                                                name="other-upload"
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                onChange={handleChangeFiles}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB each</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">Registration fields</h2>
                    <p className="mt-1 text-sm leading-6 text-white">
                        Set fields that will be displayed, when user will register
                    </p>

                    <div className="space-y-10">
                        <fieldset>
                            <div className="mt-6 space-y-6">
                                <Checkbox label='First name' name='regFirstName' type='checkbox' description="Player's first name" register={register} required={false} errors={errors} />
                                <Checkbox label='Last name' name='regLastName' type='checkbox' description="Player's last name" register={register} required={false} errors={errors} />
                                <Checkbox label='Nickname' name='regNickname' type='checkbox' description="Player's nickname (can be used from his profile)" register={register} required={false} errors={errors} />
                                <Checkbox label='Email' name='regEmail' type='checkbox' description="Player's email" register={register} required={false} errors={errors} />
                                <Checkbox label='Phone' name='regPhone' type='checkbox' description="Player's phone number" register={register} required={false} errors={errors} />
                                <Checkbox label='Age' name='regAge' type='checkbox' description="Player's age" register={register} required={false} errors={errors} />
                                <Checkbox label='Arbitraty information' name='regArbitrary' type='checkbox' description="You can request optional info from player (for example team)" register={register} required={false} errors={errors} />

                                <div className="relative flex gap-x-3">
                                    <div className='display-col flex-gap'>
                                        {watch("regArbitrary") ? (
                                            <div className='display-row flex gap-x-3'>
                                                <button type='button' className="btn btn-primary" onClick={handleAddTextarea}>Add
                                                    Textarea
                                                </button>
                                                <button type='button' className="btn btn-primary" onClick={handleAddSelect}>Add
                                                    Select
                                                </button>
                                            </div>
                                        ) : null}
                                        {inputs.map((input) => {
                                            if (input.type === 'textarea') {
                                                return (
                                                    <div key={input.id} className='flex flex-col'>
                                                        <label className='text-white' htmlFor={input.id}>You have added textarea to registration form, type what player should write in this textarea</label>
                                                        <input
                                                            onChange={(e) => handleInputChange(e, input.id)}
                                                            id={input.id}
                                                            name={input.id}
                                                            className="common-input-class text-black"
                                                        />
                                                    </div>
                                                );
                                            } else if (input.type === 'select') {
                                                return (
                                                    <div key={input.id} className='flex flex-col flex-gap'>
                                                        <label className='text-white' htmlFor={input.id}>You have added select options to registration form, type options that player will have to choose (for example team)</label>
                                                        <input
                                                            type="text"
                                                            onChange={(e) => handleInputChange(e, input.id)}
                                                            id={input.id}
                                                            name={input.id}
                                                            className="common-input-class text-black"
                                                        />
                                                        {input.options.map((option, index) => (
                                                            <div key={`${input.id}-option-${index}`}>
                                                                <label className='text-white'>
                                                                    {option.charAt(0).toUpperCase() + option.slice(1)}:
                                                                    <input
                                                                        type="text"
                                                                        name={`${input.id}-option-${index}`}
                                                                        className="common-input-class text-black"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </label>
                                                            </div>
                                                        ))}
                                                        <button type="button" className='text-white' onClick={() => handleAddOption(input.id)}>Add Option</button>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>

                            </div>
                        </fieldset>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-white">Use a permanent address where you can receive
                        mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="orgFirstName" className="block text-sm font-medium leading-6 text-white">
                                First name*
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="orgFirstName"
                                    id="orgFirstName"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("orgFirstName", {
                                        required: "Organiser first name is required"
                                    })}
                                />
                            </div>
                            {errors.orgFirstName && (<div>errors.orgFirstName.message</div>)}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="orgLastName" className="block text-sm font-medium leading-6 text-white">
                                Last name*
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="orgLastName"
                                    id="orgLastName"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("orgLastName", {
                                        required: "Organiser last name is required"
                                    })}
                                />
                            </div>
                            {errors.orgLastName && (<div>errors.orgLastName.message</div>)}
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="orgEmail" className="block text-sm font-medium leading-6 text-white">
                                Email address*
                            </label>
                            <div className="mt-2">
                                <input
                                    id="orgEmail"
                                    name="orgEmail"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("orgEmail", {
                                        required: "Organiser's email is required"
                                    })}
                                />
                            </div>
                            {errors.orgEmail && (<div><p className='text-red-700'>errors.orgEmail.message</p></div>)}
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-white">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-white">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-white">
                                            Comments
                                        </label>
                                        <p className="text-white">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-white">
                                            Candidates
                                        </label>
                                        <p className="text-white">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-white">
                                            Offers
                                        </label>
                                        <p className="text-white">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-white">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-white">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-white">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
            {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : null}
            {errors.root && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{errors.root.message}</span>
                </div>
            )}
            {isSubmitSuccessful ?
                <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Your purchase has been confirmed!</span>
                </div>
            : null }
        </form>
    )
}

export default AddEvent;