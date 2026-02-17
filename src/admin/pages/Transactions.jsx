import { Icon } from "@iconify/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";

const Transactions = () => {
  const data = [
    {
      id: "#TSN-12345",
      name: "Sarah Chen",
      phone: "+91 2020 202 202",
      method: "Visa******8989",
      amount: "$328,500",
      status: "Completed",
      statusColor: "bg-[#22FF0030] text-[#22FF00]",
      date: "20/12/2025",
      time: "10:00 AM",
    },
    {
      id: "#TSN-12345",
      name: "Sarah Chen",
      phone: "+91 2020 202 202",
      method: "Visa******8989",
      amount: "$328,500",
      status: "Failed",
      statusColor: "bg-[#AE000030] text-[#AE0000]",
      date: "20/12/2025",
      time: "10:00 AM",
    },
  ];

  return (
    <div className="bg-[#020523] text-[#BEBEBE] min-h-screen">
      {/* TITLE */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-manrope">Transactions</h1>
          <p className="text-gray-400 mt-1 font-manrope">Financial Transaction History</p>
        </div>

        <button className="flex items-center   gap-2 bg-[#FFFFFF1C]  border-white/10 h-10 w-28  rounded-lg hover:bg-[#141a3a] transition">
          <span className="flex gap-2  ml-3"><Icon icon="solar:export-broken" width="20" height="20" className="text-[#BEBEBE]" />
            Export</span>
        </button>
      </div>

      {/* TOP CARD */}
      <div className="mt-8 w-[330px] bg-[#0B1135] rounded-2xl border border-white/40  p-4 shadow-lg">
        <div className="flex justify-between items-start">
          {/* Icon */}
          <div className="w-14 h-14 bg-[#FFFFFF1C] rounded-xl flex items-center justify-center">
            <Icon
              icon="famicons:analytics"
              width="32"
              height="32"
              className="text-[#00D4FF]"
            />
          </div>


          {/* Percent */}
          <span className="bg-[#22FF0030] text-[#22FF00] px-2 py-1 rounded-xl text-sm font-semibold">
            +12.5 %
          </span>
        </div>

        <p className="mt-6 text-gray-400 text-sm">Total Revenue</p>
        <h2 className="text-3xl font-bold mt-2">$328,500</h2>
      </div>

      {/* SEARCH + FILTER + EXPORT */}
      <div className="items-center mt-10 p-4 border border-[#00D4FF0F] bg-[#0B1135] rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-3 bg-[#0B1135] border border-[#00D4FF0F] px-4 py-3 rounded-xl w-full sm:max-w-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-gray-300"
            />
          </div>

          {/* STATUS FILTER */}
          <button className="flex items-center gap-2 bg-[#0B1135] border border-white/40 px-5 py-3 rounded-xl w-full sm:w-auto text-gray-300 hover:bg-white/10 transition justify-center">
            <FiFilter className="text-xl" />
            All Status
            <span className="text-lg">▾</span>
          </button>
        </div>
      </div>


      {/* TABLE */}
      <div className="mt-8 bg-[#0B1135]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[11px] uppercase tracking-[0.1em] border-b border-white/10 bg-white/[0.01]">
                <th className="py-5 px-6 font-semibold">Transaction ID</th>
                <th className="py-5 px-6 font-semibold">Customer</th>
                <th className="py-5 px-6 font-semibold">Payment Method</th>
                <th className="py-5 px-6 font-semibold">Amount</th>
                <th className="py-5 px-6 font-semibold text-center">Status</th>
                <th className="py-5 px-6 font-semibold text-right">Date/Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group text-sm">
                  <td className="py-5 px-6">
                    <span className="text-gray-400 font-mono text-xs font-medium">{item.id}</span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#141A3A] rounded-full flex items-center justify-center text-cyan-400 font-bold border border-cyan-400/20 shadow-lg group-hover:border-cyan-400/40 transition-all text-sm">
                        {item.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{item.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2 text-gray-400 font-medium text-xs">
                      {item.method}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="font-bold text-white">{item.amount}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <p className="font-medium text-gray-300">{item.date}</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-0.5">{item.time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
















