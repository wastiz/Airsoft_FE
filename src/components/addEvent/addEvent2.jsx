import placeholder from '../../img/placeholder.png'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState } from 'react';
import {useForm} from "react-hook-form";


function AddEvent2() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
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

    //Обработка полей с разными аттрибутами

    const [inputs, setInputs] = useState([]);
    console.log(inputs)

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
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                                Event Title*
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Type here..."
                                        {...register("title", {
                                            required: "Title is required!"
                                        })}
                                    />
                                </div>
                            </div>
                            {errors.title && (<div><p className='text-white'>{errors.title.message}</p></div>)}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                                Event description*
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("description", {
                                        required: "Description is required!"
                                    })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-white">Write a description about your event.</p>
                            {errors.description && (<div>{errors.description.message}</div>)}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="rules" className="block text-sm font-medium leading-6 text-white">
                                Event rules*
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="rules"
                                    name="rules"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("eventRules", {
                                        required: "Event rules are required!"
                                    })}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-white">Write event's rules</p>
                            {errors.eventRules && (<div>{errors.eventRules.message}</div>)}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="plot" className="block text-sm font-medium leading-6 text-white">
                                Game plot
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="plot"
                                    name="plot"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("plot")}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-white">You can write plot of your game</p>
                        </div>

                        <div className="col-span-full">
                            <h2 className="text-base font-semibold leading-7 text-white">General Inforamtion</h2>

                            <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-12">
                                <div className="sm:col-span-3">
                                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-white">
                                        Event date*:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("date", {
                                                required: "Date is required!"
                                            })}
                                        />
                                    </div>
                                    {errors.date && (<div>{errors.date.message}</div>)}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
                                        Price(put zero if event is free to attend)*:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("price", {
                                                required: "Price is required!"
                                            })}
                                        />
                                    </div>
                                    {errors.price && (<div>{errors.price.message}</div>)}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="location"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Location*:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("location", {
                                                required: "Location is required!"
                                            })}
                                        />
                                    </div>
                                    {errors.location && (<div>{errors.location.message}</div>)}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="ageRestriction"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Age Restriction(put zero if there is no age restriction)*:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="ageRestriction"
                                            id="ageRestriction"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("ageRestriction", {
                                                required: "Age restriction is required!"
                                            })}
                                        />
                                    </div>
                                    {errors.ageRestriction && (<div>{errors.ageRestriction.message}</div>)}
                                </div>

                                <div className='text-white col-span-full'>Times:</div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="meetingTime"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Meeting time:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="meetingTime"
                                            id="meetingTime"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("meetingTime")}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="briefTime"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Briefing time:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="briefTime"
                                            id="briefTime"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("briefTime")}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="startTime"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Start time*:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="startTime"
                                            id="startTime"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("startTime", {
                                                required: "Location is required!"
                                            })}
                                        />
                                    </div>
                                    {errors.startTime && (<div>{errors.startTime.message}</div>)}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="endTime" className="block text-sm font-medium leading-6 text-white">
                                        End time:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="endTime"
                                            id="endTime"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('endTime')}
                                        />
                                    </div>
                                </div>

                                <div className='text-white col-span-full'>Services:</div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="foodService"
                                            name="foodService"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('foodService')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="foodService" className="font-medium text-white">
                                            Food
                                        </label>
                                        <p className="text-white">There will be food on the game </p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="hpaService"
                                            name="hpaService"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('hpaService')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="hpaService" className="font-medium text-white">
                                            HPA Service
                                        </label>
                                        <p className="text-white">There will be HPA air charger on the game</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="toiletService"
                                            name="toiletService"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('toiletService')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="toiletService" className="font-medium text-white">
                                            Toilet Service
                                        </label>
                                        <p className="text-white">There will be toilet on the game</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="shopService"
                                            name="shopService"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('shopService')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="shopService" className="font-medium text-white">
                                            Shop Service
                                        </label>
                                        <p className="text-white">There will be airsoft shop on the game</p>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="otherService"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Other Service (type other services if you have):
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="otherService"
                                            id="otherService"
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("otherService")}
                                        />
                                    </div>
                                </div>

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
                                    <img src={coverEventImageSrc ? coverEventImageSrc : placeholder} alt="cover" className='w-12 h-12'/>
                                    <div className="mt-4 flex text-sm leading-6 text-white">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChangeFile}/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/*Other photos, videos*/}

                        <div className="col-span-full">
                            <label htmlFor="other-photos" className="block text-sm font-medium leading-6 text-white">
                                Other photos (for example photos from polygon)
                            </label>
                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <img src={placeholder} alt="" className='w-12 h-12'/>
                                    <div className="mt-4 flex text-sm leading-6 text-white">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">Registration fields</h2>
                    <p className="mt-1 text-sm leading-6 text-white">
                        Set fields that will be displayed, when user registering
                    </p>

                    <div className="space-y-10">
                        <fieldset>
                            <div className="mt-6 space-y-6">

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regFirstName"
                                            name="regFirstName"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regFirstName')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regFirstName" className="font-medium text-white">
                                            First name
                                        </label>
                                        <p className="text-white">Player's first name</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regLastName"
                                            name="regLastName"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regLastName')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regLastName" className="font-medium text-white">
                                            Last name
                                        </label>
                                        <p className="text-white">Player's last name</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regNickname"
                                            name="regNickname"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regNickname')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regNickname" className="font-medium text-white">
                                            Nickname
                                        </label>
                                        <p className="text-white">Player's nickname (can be used from profile)</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regEmail"
                                            name="regEmail"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regEmail')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regEmail" className="font-medium text-white">
                                            Email
                                        </label>
                                        <p className="text-white">Player's email</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regPhone"
                                            name="regPhone"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regPhone')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regPhone" className="font-medium text-white">
                                            Phone
                                        </label>
                                        <p className="text-white">Player's phone</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regAge"
                                            name="regAge"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regAge')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regAge" className="font-medium text-white">
                                            Age
                                        </label>
                                        <p className="text-white">Player's age</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="regArbitrary"
                                            name="regArbitrary"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            {...register('regArbitrary')}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="regArbitrary" className="font-medium text-white">
                                            Arbitrary
                                        </label>
                                        <p className="text-white">You can add more inputs for additional info</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className='display-col flex-gap'>
                                        {watch("regArbitrary") ? (
                                            <div className='display-row flex gap-x-3'>
                                                <button className="btn btn-primary" onClick={handleAddTextarea}>Add
                                                    Textarea
                                                </button>
                                                <button className="btn btn-primary" onClick={handleAddSelect}>Add
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
            {errors.root && (<div>{errors.root.message}</div>)}
        </form>
    )
}

export default AddEvent2;