


import React, { useState } from 'react';
import img from '../../../public/bg1.png';
import { MapPin, Calendar, CheckCircle, Clock, Truck, X } from 'lucide-react';
import { IoGift } from 'react-icons/io5';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Icon } from "@iconify/react";
import { useGetOrderDetailByIdQuery } from '../../Redux/Apis/updateStatusApi';
import { useParams } from 'react-router-dom';
import { useGiftGetByIdQuery } from '../../Redux/Apis/giftApi';

export default function CustomerDetails() {
  const { orderId } = useParams();
  const [activeTab, setActiveTab] = useState('Ongoing Orders');
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const { data: giftData, isLoading: isGiftLoading } = useGiftGetByIdQuery();

  const { data, isLoading, isError } = useGetOrderDetailByIdQuery(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen ml-24 mt-8 max-w-6xl text-white">
        {/* Back button skeleton */}
        <div className="h-4 w-32 bg-slate-700 rounded mb-6 animate-pulse"></div>

        {/* Header skeleton */}
        <div className="mb-6 space-y-3 animate-pulse">
          <div className="h-6 w-56 bg-slate-700 rounded"></div>
          <div className="h-3 w-72 bg-slate-700 rounded"></div>
        </div>

        {/* User Card skeleton */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700"></div>
            <div className="space-y-2">
              <div className="h-4 w-40 bg-slate-700 rounded"></div>
              <div className="h-3 w-28 bg-slate-700 rounded"></div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="h-8 w-32 bg-slate-700 rounded"></div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-3 mb-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-32 bg-slate-700 rounded-full"></div>
          ))}
        </div>

        {/* Orders list skeleton */}
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#0B1135] border border-white/10 rounded-2xl p-5 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-slate-700 rounded"></div>
                  <div className="h-3 w-24 bg-slate-700 rounded"></div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="h-6 w-24 bg-slate-700 rounded"></div>
                <div className="h-6 w-16 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.order) return <p className="text-red-500 mt-8 text-center">Error loading order</p>;

  const order = data.order;
  const user = data.user || {};
  const address = order.addressId || {};
  const products = order.products || [];
  const totalAmount = order.totalAmount || 0;
  const orderStatus = order.Status || 'Unknown';

  // Simple helper to decide if a step is completed
  const isCompleted = (step) => {
    const statusLower = orderStatus.toLowerCase();
    if (step === 'placed') return true;
    if (step === 'payment') return order.paymentStatus !== 'pending';
    if (step === 'processing') return ['processing', 'shipped', 'delivered'].some(s => statusLower.includes(s));
    if (step === 'shipped') return ['shipped', 'delivered'].some(s => statusLower.includes(s));
    if (step === 'delivered') return statusLower.includes('delivered');
    return false;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pending';
    return new Date(dateStr).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      {/* <pre className='ml-20'>{JSON.stringify(order, null, 2)}</pre> */}
      <div className="min-h-screen md:ml-23 bg-[#020523] text-white p-5">
        <div className="max-w-10xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Customer Details</h1>
            <p className="text-slate-400 text-sm">Manage Your Customer Base</p>
          </div>

          {/* Customer Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center text-xl font-bold">
                  {address.fullName?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{address.fullName || user.name || 'Customer'}</h2>
                  <p className="text-slate-400 text-sm flex items-center gap-1">
                    {user.email || 'No email available'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span>{address.country || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4" />
                  <span>Joined On {formatDate(order.createdAt).split(',')[0]}</span>
                </div>
              </div>
            </div>

            {/* Total Spent */}
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="text-3xl font-bold text-[#22FF00]">
                €${totalAmount.toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Total Spent</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['Ongoing Orders', 'Completed Orders', 'Addresses', 'Gifts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-3xl font-medium whitespace-nowrap transition-all ${activeTab === tab
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Order Card (shown in Ongoing & Completed tabs for now) */}
          {(activeTab === 'Ongoing Orders' || activeTab === 'Completed Orders') && (
            <div className="bg-[#00D4FF0F] backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <HiOutlineShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Order #{order._id?.slice(-8) || 'N/A'}</h3>
                    <p className="text-slate-400 text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#00D4FF38] text-[#00D4FF] px-4 py-1.5 rounded-lg text-sm font-medium">
                    {orderStatus}
                  </span>
                  <span className="text-2xl font-bold text-[#22FF00]">
                    €${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6 bg-[#020523] rounded-xl p-6">
                <h4 className="text-slate-400 text-sm mb-4 font-medium">Order Items</h4>

                {products.length > 0 ? (
                  products.map((item, index) => (
                    <div key={item._id || index}>
                      <div className="flex items-center justify-between rounded-xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#FFFFFF12] rounded-lg flex items-center justify-center">
                            <img
                              src={item.productId?.bottleImg || img}
                              className="h-10 w-8 object-contain"
                              alt={item.productId?.name}
                            />
                          </div>
                          <div>
                            <h5 className="font-medium">{item.productId?.name || 'Product'}</h5>
                            <p className="text-slate-400 text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-[#22FF00] font-semibold">
                          €${Number(item.productId?.price || 0).toLocaleString()}
                        </div>
                      </div>
                      {index < products.length - 1 && <hr className="my-2 border-slate-700" />}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-4">No items found</p>
                )}
              </div>

              {/* Order Timeline - KEPT and made semi-dynamic */}
              <div className="bg-[#0B1135] p-5 rounded-2xl border border-white/10">
                <h3 className="text-sm text-gray-400 mb-3">Order Timeline</h3>

                {[
                  "Order Placed",
                  "Payment Confirmed",
                  "Processing",
                  "Shipped",
                  "Delivered",
                ].map((step, index) => {
                  const currentStatus = (order?.status || order?.Status || 'Pending')?.toLowerCase();
                  const paymentStatus = (order?.paymentStatus || "").toLowerCase();
                  let isActive = false;

                  if (index === 0) isActive = true;
                  else if (index === 1) isActive = paymentStatus === "completed";
                  else if (index === 2) isActive = ["processing", "shipped", "delivered", "completed"].includes(currentStatus);
                  else if (index === 3) isActive = ["shipped", "delivered", "completed"].includes(currentStatus);
                  else if (index === 4) isActive = ["delivered", "completed"].includes(currentStatus);

                  return (
                    <div
                      key={index}
                      className="relative pb-8 flex items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#FFFFFF2E] flex items-center justify-center">
                        <Icon
                          icon="solar:check-circle-broken"
                          width="28"
                          height="28"
                          className={isActive ? "text-[#00D4FF]" : "text-gray-500"}
                        />
                      </div>

                      {index < 4 && (
                        <div className="absolute left-[29px] top-[60%] w-[1px] h-10 bg-[#FFFFFF4A]" />
                      )}

                      <div>
                        <p className="font-medium">{step}</p>
                        <p className="text-gray-400 text-xs">
                          {(() => {
                            const history = order?.statusHistory || [];

                            if (index === 0) {
                              const pending = history.find(s => s.status === "Pending");
                              return pending?.timestamp
                                ? new Date(pending.timestamp).toLocaleString("en-IN")
                                : "N/A";
                            }

                            if (index === 2) {
                              const processing = history.find(s => s.status === "Processing");
                              return processing?.timestamp
                                ? new Date(processing.timestamp).toLocaleString("en-IN")
                                : "N/A";
                            }

                            if (index === 3) {
                              const shipped = history.find(s => s.status === "Shipped");
                              return shipped?.timestamp
                                ? new Date(shipped.timestamp).toLocaleString("en-IN")
                                : "N/A";
                            }

                            if (index === 4) {
                              const completed = history.find(s => s.status === "Completed");
                              return completed?.timestamp
                                ? new Date(completed.timestamp).toLocaleString("en-IN")
                                : "N/A";
                            }

                            return "N/A"; // Payment Confirmed static
                          })()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shipping Address */}
              <div className="mb-6 bg-[#020523] rounded-xl p-6">
                <h4 className="text-slate-400 text-sm mb-3 font-medium">Shipping Address</h4>
                <p className="text-slate-200">
                  {address.fullName && `${address.fullName}, `}
                  {address.street}, {address.nearArea ? `${address.nearArea}, ` : ''}
                  {address.city}, {address.state}, {address.country} - {address.pincode}
                  <br />
                  Phone: {address.phone || 'N/A'}
                </p>
              </div>

              {/* Order Summary - simplified */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Total Amount</span>
                  <span className="text-[#22FF00] font-bold">€${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'Addresses' && (
            <div className="bg-[#00D4FF0F] backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-slate-300 mb-4">Addresses</h3>
              <div className="bg-[#020523] rounded-xl p-6">
                <p className="text-slate-200">
                  {address.fullName} ({address.addressType || 'Home'})<br />
                  {address.street}, {address.nearArea ? address.nearArea + ', ' : ''}
                  {address.city}, {address.state}, {address.country} - {address.pincode}<br />
                  Phone: {address.phone || 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Gifts Tab */}
          {activeTab === 'Gifts' && (
            <div className="bg-[#00D4FF0F] rounded-2xl p-6 border border-slate-700/50">
              {isGiftLoading ? (
                <p className="text-slate-400 text-center">Loading gift...</p>
              ) : giftData ? (
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{giftData.GiftName}</h3>
                  <p className="text-slate-400">Value: €{giftData.Giftvalue}</p>
                </div>
              ) : (
                <p className="text-slate-400 text-center">No gift found</p>
              )}
            </div>
          )}


          {/* Gift Modal */}
          {isGiftOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-[#050b2e] to-[#020617] p-6 shadow-2xl relative">
                <button
                  onClick={() => setIsGiftOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>

                <h2 className="text-xl font-semibold">Send Gift</h2>
                <hr className="my-5 border-white/10" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D207FF] to-[#00D4FF] flex items-center justify-center">
                    <IoGift size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Gift Details</h3>
                    <p className="text-sm text-gray-400">Send a special gift to your valued customer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Gift Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="eg. Premium Perfume Collection"
                      className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Gift Value (€) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue="150.00"
                      className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Reason For Gift <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      placeholder="eg. Thank you for being a loyal customer"
                      className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsGiftOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                    Send Gift
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}