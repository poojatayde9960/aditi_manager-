import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ArrowLeft, MapPin, Calendar, Home } from 'lucide-react';
import { useGetUserByIdQuery } from '../../Redux/Apis/OrdersApi';
import { useGiftGetByIdQuery } from '../../Redux/Apis/giftApi';

const GetUserOrdersDetail = ({ onBack }) => {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [activeTab, setActiveTab] = useState('Ongoing Orders');

    const { data, isLoading, isError } = useGetUserByIdQuery(userId);
    const { data: giftData, isLoading: isGiftLoading } = useGiftGetByIdQuery(userId);

    const user = data?.user || data || {};

    const ongoingOrders = user?.ongoingOrdersList || [];
    const completedOrders = user?.completedOrdersList || [];

    // Ensure addresses is an array
    const addresses = user?.addresses || [];

    const getInitials = (fullName) =>
        fullName?.split(' ').map(w => w[0]).join('').toUpperCase() || '?';

    const userOrders =
        activeTab === "Ongoing Orders"
            ? ongoingOrders
            : activeTab === "Completed Orders"
                ? completedOrders
                : [];
    /* ================= LOADING ================= */
    if (isLoading) {
        return (
            <div className="min-h-screen text-white mt-4 md:mt-8 md:ml-24 max-w-7xl px-4 md:px-0 animate-pulse">
                <div className="h-4 w-32 bg-slate-700 rounded mb-6" />
                <div className="h-6 w-56 bg-slate-700 rounded mb-2" />
                <div className="h-3 w-72 bg-slate-700 rounded mb-6" />
            </div>
        );
    }

    /* ================= ERROR ================= */
    if (isError) {
        return (
            <div className="text-white mt-4 md:mt-8 md:ml-24 max-w-7xl px-4 md:px-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Users
                </button>
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-10 text-center">
                    Error loading user data
                </div>
            </div>
        );
    }

    return (
        <div className="text-white mt-4 md:mt-8 md:ml-24  px-4 md:px-0">
            {/* Back */}
            <button
                onClick={() => navigate('/user-management')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"
            >
                <ArrowLeft size={20} />
                Back to Users
            </button>

            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Customer Details</h1>
            <p className="text-slate-400 text-sm mb-6">Manage Your Customer Base</p>

            {/* User Card */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 md:p-6 mb-6">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center text-lg font-bold">
                            {getInitials(user?.name)}
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold">{user?.name}</h2>
                            <p className="text-slate-400 text-xs md:text-sm">{user?.phone}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            {addresses?.[0]?.city || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Joined {user?.joinedDate || (user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A')}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <div className="text-2xl md:text-3xl font-bold text-[#22FF00]">
                        ${user?.totalSpent || 0}
                    </div>
                    <p className="text-slate-400 text-sm">Total Spent</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {['Ongoing Orders', 'Completed Orders', 'Addresses', 'Gifts'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium
                        ${activeTab === tab
                                ? 'bg-cyan-500 text-white'
                                : 'bg-slate-800/50 text-slate-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders */}
            {(activeTab === 'Ongoing Orders' || activeTab === 'Completed Orders') && (
                <div className="space-y-3">
                    {userOrders.length > 0 ? userOrders.map(order => (
                        <div
                            key={order._id}
                            onClick={() => navigate(`/customerdetail/${order._id}`)}
                            className="bg-[#0B1135] border border-white/10 rounded-2xl p-4 md:p-5 cursor-pointer"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center font-bold">
                                        {getInitials(user?.name)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">Order #{order._id?.slice(-6)}</p>
                                        <p className="text-xs text-slate-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between md:justify-end items-center gap-3">
                                    <span className="text-xs px-3 py-1 rounded bg-cyan-500/20 text-cyan-400">
                                        {order.status || order.Status}
                                    </span>
                                    <span className="text-[#22FF00] font-bold">
                                        ${order.totalAmount}
                                    </span>
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-slate-400">No orders found</p>
                    )}
                </div>
            )}

            {/* Addresses */}
            {activeTab === 'Addresses' && (
                <div className="space-y-3">
                    {user?.addresses?.length > 0 ? user.addresses.map(addr => (
                        <div key={addr._id} className="bg-[#0B1135] border border-white/10 rounded-2xl p-4">
                            <div className="flex gap-3">
                                <Home size={20} className="mt-1 shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold">{addr.fullName}</p>
                                    <p className="text-slate-400">{addr.street}, {addr.nearArea}</p>
                                    <p className="text-slate-400">{addr.city}, {addr.state} - {addr.pincode}</p>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-slate-400">No addresses</p>}
                </div>
            )}

            {/* Gifts */}
            {activeTab === 'Gifts' && (
                <div className="space-y-3">
                    {isGiftLoading ? (
                        <p className="text-center text-slate-400">Loading gifts...</p>
                    ) : giftData?.gifts?.length > 0 ? (
                        giftData.gifts.map(gift => (
                            <div key={gift._id} className="bg-[#0B1135] border border-white/10 rounded-2xl p-4">
                                <p className="font-semibold">{gift.GiftName}</p>
                                <p className="text-sm text-slate-400">₹{gift.Giftvalue}</p>
                                <p className="text-xs text-slate-500">{gift.Reasonforgift}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-400">No gifts</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetUserOrdersDetail;
