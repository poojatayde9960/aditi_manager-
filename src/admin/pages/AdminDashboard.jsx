import React from "react";
import { Users, ShoppingBag, DollarSign, Activity } from "lucide-react";
import DashboardStatsCard from "../components/DashboardStatsCard";
import SalesPerformanceChart from "../components/SalesPerformanceChart";
import SellsByPerfume from "../components/SellsByPerfume";
import LiveAudience from "../components/LiveAudience";
import TopSellingAndOrders from "../components/TopSellingAndOrders"; // Keeping this for now, will refactor next if needed
import { Icon } from "@iconify/react";
import { useGetCardstatusQuery, useGetUserConversionRateQuery } from "../../Redux/Apis/dashboardApi";
const AdminDashboard = () => {

  const { data, isLoading } = useGetCardstatusQuery();
  const { data: conversionRateData, isLoading: isConversionRateLoading } = useGetUserConversionRateQuery();
  // Precise data to match the screenshot curve
  const revenueData = [
    { uv: 12 }, { uv: 13 }, { uv: 14 }, { uv: 15 }, { uv: 18 }, { uv: 19 }, { uv: 20 }, { uv: 22 }, { uv: 26 }, { uv: 34 }, { uv: 38 }, { uv: 40 }
  ];

  /* 
     User requested "Add the graph exactly like it is in the screenshot, and apply it to all 4 cards."
     So we apply 'revenueData' to all cards to ensure identical visual appearance.
  */

  const stats = [
    {
      title: "Total Revenue",
      value: isLoading ? "Loading..." : `$${data?.data?.totalRevenue ?? 0}`,
      percent: "+12.5%",
      icon: "mdi:dollar",
      chartColor: "#00D4FF",
      chartData: revenueData
    },
    {
      title: "Orders",
      value: isLoading ? "Loading..." : data?.data?.totalOrders ?? 0,
      percent: "+12.5%",
      icon: "solar:bag-2-broken",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Total Users",
      value: isLoading ? "Loading..." : data?.data?.totalUsers ?? 0,
      percent: "+12.5%",
      icon: "mage:users",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
    {
      title: "Conversion Rate",
      value: isConversionRateLoading
        ? "Loading..."
        : conversionRateData?.conversionRate ?? "0%",
      percent: "+12.5%",
      icon: "famicons:analytics",
      chartColor: "#00d5ff",
      chartData: revenueData
    },
  ];


  return (
    <div className="min-h-screen lg:ml-23 overflow-hidden  text-white  pb-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-manrope text-2xl ">Dashboard</h1>
        <p className="font-poppins text-gray-400 text-sm">Overview of performance and activity</p>


      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {isLoading
          ? [...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="border border-blue-300 shadow rounded-3xl p-6 max-w-sm w-full mx-auto animate-pulse flex flex-col justify-between min-h-[220px] bg-[#FFFFFF0A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 ml-4 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="h-24 w-full bg-slate-700 rounded mt-4"></div>
            </div>
          ))
          : stats.map((item, index) => (
            <DashboardStatsCard
              key={index}
              filterId={`line-shadow-${index}`}
              {...item}
            />
          ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        <div className="lg:col-span-7 xl:col-span-6">
          <SalesPerformanceChart />
        </div>

        <div className="lg:col-span-3 xl:col-span-3">
          <SellsByPerfume />
        </div>

        <div className="lg:col-span-3 xl:col-span-3">
          <LiveAudience />
        </div>

      </div>



      {/* Bottom Lists Row */}
      <div className="">
        <TopSellingAndOrders />
      </div>

    </div>
  );
};

export default AdminDashboard;
