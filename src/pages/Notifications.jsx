const Notifications = () => {
    const notifications = [
        { id: 1, title: "New Arrival", message: "Inception has been added to Originals.", time: "2 hours ago", read: false },
        { id: 2, title: "Subscription", message: "Your Premium plan is active until Dec 2025.", time: "1 day ago", read: true },
        { id: 3, title: "System", message: "Maintenance scheduled, but we are good for now!", time: "3 days ago", read: true },
    ];

    return (
        <div className="px-8 pb-10 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                Notifications
            </h1>
            <div className="space-y-4">
                {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 rounded-2xl border border-white/5 flex gap-4 ${notif.read ? 'bg-white/5' : 'bg-white/10 border-blue-500/30'}`}>
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${notif.read ? 'bg-transparent' : 'bg-blue-500'}`}></div>
                        <div>
                            <h3 className="font-bold text-white text-sm mb-1">{notif.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">{notif.message}</p>
                            <span className="text-xs text-gray-600 block">{notif.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
