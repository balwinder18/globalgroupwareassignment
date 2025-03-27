import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users?page=${currentPage}`);

            setUsers(response.data.data);
           
            setTotalPages(response.data.total_pages);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch users. Please try again.');
            console.error(err);
        } 
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${editingUser.id}`, editingUser);

            setUsers(users.map(user =>
                user.id === editingUser.id ? { ...user, ...editingUser } : user
            ));

            setMessage({
                type: 'success',
                text: 'User updated successfully!'
            });

            setEditingUser(null);
            setIsLoading(false);
        } catch (err) {
            setMessage({
                type: 'error',
                text: 'Failed to update user. Please try again.'
            });
            console.error(err);
        } 
    };

    const handleDelete = async (userId) => {
        if (alert('Are you sure you want to delete this user?')) return;

        setIsLoading(true);

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`);

            setUsers(users.filter(user => user.id !== userId));

            setMessage({
                type: 'success',
                text: 'User deleted successfully!'
            });
            setIsLoading(false);
        } catch (err) {
            setMessage({
                type: 'error',
                text: 'Failed to delete user. Please try again.'
            });
            console.error(err);
        } 
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="container mx-auto">

                {message && (
                    <div className={`
            fixed top-4 right-4 z-50 px-6 py-4 rounded-lg 
            ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
          `}>
                        {message.text}
                        <button
                            onClick={() => setMessage(null)}
                            className="ml-4 hover:bg-opacity-75 rounded-full"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                    User Directory
                </h1>

                {isLoading && !editingUser ? (
                    <div className="flex justify-center items-center min-h-[500px]">
                        <div className="animate-spin w-10 h-10 border-4 border-t-4 border-blue-500 rounded-full"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => (
                                editingUser && editingUser.id === user.id ? (
                                    <div key={user.id} className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">
                                        <form onSubmit={handleUpdateUser} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 mb-2">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={editingUser.first_name}
                                                        onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 mb-2">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={editingUser.last_name}
                                                        onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={editingUser.email}
                                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                    required
                                                />
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    type="submit"
                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingUser(null)}
                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div key={user.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
                                        <div className="p-6 text-center">
                                            <img
                                                src={user.avatar}
                                                alt={`${user.first_name} ${user.last_name}`}
                                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
                                            />
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {user.first_name} {user.last_name}
                                            </h2>
                                            <p className="text-gray-500 mt-2">{user.email}</p>
                                            <div className="flex justify-center space-x-2 mt-4">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="flex justify-center mt-10 space-x-4">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg transition-all ${currentPage === index + 1
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>


            {error &&
                <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                    <div className="text-red-500 text-xl">{error}</div>
                </div>
            }




        </div>
    );
};

export default UserList;