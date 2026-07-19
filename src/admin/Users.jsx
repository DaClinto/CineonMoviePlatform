const Users = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Premium', status: 'Active', date: '2023-12-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@test.com', plan: 'Free', status: 'Active', date: '2023-11-15' },
        { id: 3, name: 'Bob Wilson', email: 'bob@demo.com', plan: 'Free', status: 'Inactive', date: '2023-10-20' },
    ];

    return (
        <div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#222] text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-[#252525]">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-gray-400 text-xs">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.plan === 'Premium' ? 'bg-amber-500/10 text-amber-500' : 'bg-gray-700 text-gray-300'}`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">{user.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-white">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
