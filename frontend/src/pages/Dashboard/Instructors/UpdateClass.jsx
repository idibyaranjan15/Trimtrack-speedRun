import React, { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
const KEY = import.meta.env.VITE_IMG_TOKEN;

const UpdateClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const data = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [image, setImage] = useState(null);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);

        newData.instructorName = currentUser.name;
        newData.instructorEmail = currentUser.email;
        newData.status = 'pending';
        newData.submitted = new Date();
        newData.totalEnrolled = 0;

        toast.promise(
            axiosSecure.put(`/update-class/${data._id}`, newData)
                .then(res => {
                    console.log(res.data);
                }),
            {
                pending: 'Submitting your service...',
                success: 'Submitted successfully!',
                error: 'Failed to submit your service',
            }
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="">
            <div className="my-10">
                <h1 className='text-center text-3xl font-bold'>Add Your service</h1>
            </div>


            <form onSubmit={handleFormSubmit} className=" mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-2 w-full gap-3">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Service name
                        </label>
                        <input
                            className=" w-full px-4 py-2  border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                            type="text"
                            required
                            defaultValue={data.name}
                            placeholder='Your Class Name'
                            name='name'
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="font-bold">Thumbnail Photo</label>
                        <input
                            type="file"
                            required
                            title='You can not update Image'
                            disabled
                            onChange={handleImageChange}
                            name="image"
                            className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 " />
                    </div>
                </div>
                <div className="">
                    <h1 className='text-[12px] my-2 ml-2 text-secondary'>You can not change your name or email</h1>
                    <div className="grid gap-3 grid-cols-2">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
                                Salon name
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="text"
                                value={currentUser?.name}
                                readOnly
                                disabled
                                placeholder='Instructor Name'
                                name='instructorName'
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
                                Salon email
                            </label>
                            <input
                                title='You can not update your email'
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                readOnly
                                name='instructorEmail'
                            />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="availableSeats">
                            Available seats
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            defaultValue={data.availableSeats}
                            placeholder='How many seats are available?'
                            name='availableSeats'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            defaultValue={data.price}
                            placeholder='How much does it cost?'
                            name='price'
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Youtube Link
                    </label>
                    <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are support</p>
                    <input
                        required
                        defaultValue={data.videoLink}
                        className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="text"
                        placeholder='Your course intro video link'
                        name='videoLink'
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Description About your service
                    </label>
                    <textarea defaultValue={data.description} placeholder='Description about your course' name="description" className='resize-none border w-full p-2 rounded-lg  border-secondary outline-none' rows="4"></textarea>
                </div>
                <div className="text-center w-full">
                    <p className='text-red-600  mb-2'>After submit , Your service need to approval by admin</p>
                    <button
                        className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateClass;