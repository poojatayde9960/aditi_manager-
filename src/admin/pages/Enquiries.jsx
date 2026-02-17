import React from "react";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { useEnquiryDeleteMutation, useEnquiryStatusMutation, useGetEnquiryQuery, useManagerContactResolveMutation } from "../../Redux/Apis/enquiryApi";

const EnquiriesSkeleton = () => {
  return (
    <div className="bg-[#020523] min-h-screen text-white p-4 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-white/10 rounded-lg mb-2"></div>
        <div className="h-4 w-72 bg-white/5 rounded-lg"></div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="bg-[#0B1135]/50 border border-white/10 p-4 rounded-3xl mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
          <div className="h-14 bg-white/5 rounded-2xl flex-1 max-w-2xl"></div>
          <div className="h-14 bg-white/5 rounded-2xl w-full lg:w-48"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#0B1135]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 space-y-6">
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 pb-4 border-b border-white/10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded w-20 mx-auto"></div>
            ))}
          </div>

          {/* Table Rows Skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 items-center py-4 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-white/10 rounded w-24"></div>
                  <div className="h-3 bg-white/5 rounded w-32"></div>
                </div>
              </div>
              <div className="h-4 bg-white/5 rounded w-28 mx-auto"></div>
              <div className="h-4 bg-white/5 rounded w-48 mx-auto"></div>
              <div className="h-6 bg-white/10 rounded-xl w-20 mx-auto"></div>
              <div className="space-y-2 text-right">
                <div className="h-4 bg-white/10 rounded w-20 ml-auto"></div>
                <div className="h-3 bg-white/5 rounded w-16 ml-auto"></div>
              </div>
              <div className="h-10 bg-white/10 rounded-2xl w-24 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Enquiries = () => {
  const { data, isLoading, isError, refetch } = useGetEnquiryQuery();
  const [deleteEnquiry] = useEnquiryDeleteMutation()
  const [managerContactResolve] = useManagerContactResolveMutation();
  const [updateStatus, { isLoading: updating }] = useEnquiryStatusMutation();
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [statusLoadingId, setStatusLoadingId] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = React.useState(null);
  const [attachments, setAttachments] = React.useState([]);
  const [cc, setCc] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const fileInputRef = React.useRef(null);

  const enquiries = data?.data?.map((item) => {
    const dateObj = new Date(item.createdAt);
    return {
      id: item._id,
      name: item.name,
      email: item.email,
      phone: item.contact,
      message: item.message,
      status: item.status?.trim() || "Pending",
      date: dateObj.toLocaleDateString("en-GB"),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
    };
  }) || [];

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "All Status" || e.status === statusFilter;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const uniqueEmails = [...new Set(enquiries.map(e => e.email))];

  const handleResolveClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setSubject(`Resolving Enquiry: `);
    setEmailMessage(``);
    setIsModalOpen(true);
  };

  const handleResolveSubmit = async () => {
    try {
      setStatusLoadingId(selectedEnquiry.id);

      const body = {
        to: selectedEnquiry.email,
        cc: cc,
        subject: subject,
        message: emailMessage
      };

      await managerContactResolve({ id: selectedEnquiry.id, body }).unwrap();
      setIsModalOpen(false);
      setEmailMessage(""); // Reset message
      refetch();
    } catch (err) {
      console.error("Failed to resolve enquiry:", err);
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <EnquiriesSkeleton />;
  }

  return (
    <div className="bg-[#020523] text-white min-h-screen font-manrope">
      {/* TITLE SECTION */}
      <div className="mb-8">
        <h1 className="page-header-title">Enquiries</h1>
        <p className="text-gray-400 mt-1">Customer Inquiries and Support Requests</p>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="bg-[#0B1135]/50 border border-white/10 p-4 rounded-3xl mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
          <div className="relative flex-1 max-w-2xl">
            <Icon icon="mynaui:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" width={22} />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0B1135] border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-3 bg-[#0B1135] border border-white/10 px-6 h-14 rounded-2xl text-sm text-gray-300 hover:bg-[#141b4d] hover:border-white/20 transition-all min-w-[180px] justify-between shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-2">
                <Icon icon="mi:filter" className="text-gray-400" />
                <span className="font-medium">{statusFilter}</span>
              </div>
              <Icon icon="lucide:chevron-down" className={`transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} />
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0B1135] border border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden">
                {["All Status", "Pending", "Contacted"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm hover:bg-cyan-500/10 transition-colors ${statusFilter === status ? 'text-cyan-400' : 'text-gray-300'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#0B1135]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[15px]   border-b border-white/10 bg-white/[0.01]">
                <th className="py-5 px-6 font-thin font-manrope">Customer</th>
                <th className="py-5 px-6 font-thin font-manrope">Contact</th>
                <th className="py-5 px-6 font-thinfont-manrope">Message</th>
                <th className="py-5 px-6 font-thin font-manrope text-center">Status</th>
                <th className="py-5 px-6 font-thin font-manrope">Date</th>
                <th className="py-5 px-6 font-thin font-manrope text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#141A3A] rounded-full flex items-center justify-center text-cyan-400 font-bold border border-cyan-400/20 shadow-lg group-hover:border-cyan-400/40 transition-all text-sm">
                        {e.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className=" font-manrope text-sm group-hover:text-cyan-400 transition-colors">{e.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{e.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-6 text-sm text-gray-300 font-manrope">{e.phone}</td>

                  <td className="py-5 px-6 text-sm text-gray-400 lg:max-w-[320px]">
                    <p className="leading-relaxed line-clamp-2 hover:line-clamp-none transition-all cursor-default">{e.message}</p>
                  </td>

                  <td className="py-5 px-6 text-center">
                    <span
                      className={`inline-flex px-4 py-1.5 rounded-xl capitalize ${e.status === "Contacted"
                        ? "bg-[#22FF0030] text-[#22FF00]"
                        : "bg-[#D9FF0030] text-[#D9FF00] "
                        }`}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        fontSize: "11.6px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      {e.status}
                    </span>
                  </td>

                  <td className="py-5 px-6 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-200">{e.date}</p>
                    <p className="text-[13px] text-gray-200 font-medium mt-0.5 uppercase">{e.time}</p>
                  </td>

                  <td className="py-5 px-6 text-right">
                    {e.status === "Pending" ? (
                      <button
                        onClick={() => handleResolveClick(e)}
                        disabled={updating && statusLoadingId === e.id}
                        className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-[#020523] px-6 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                      >
                        {updating && statusLoadingId === e.id ? "Processing..." : "Resolve"}
                      </button>
                    ) : (
                      <span className="text-gray-600 font-bold pr-8">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnquiries.length === 0 && (
          <div className="py-20 text-center">
            <Icon icon="ph:chats-circle-light" className="mx-auto text-gray-600 mb-4" width={48} />
            <p className="text-gray-400">No enquiries found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#F8F9FA] border-b border-gray-200">
                <h3 className="text-gray-800 font-semibold text-lg">New message</h3>
                <div className="flex items-center gap-4 text-gray-500">
                  <Icon icon="lucide:maximize-2" className="cursor-pointer hover:text-gray-800 transition-colors" width={18} />
                  <Icon
                    icon="lucide:x"
                    className="cursor-pointer hover:text-gray-800 transition-colors"
                    width={22}
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>
              </div>

              {/* Email Form */}
              <div className="p-8 space-y-6">
                {/* To Row */}
                <div className="flex items-center gap-6 group">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest w-6">To</span>
                  <div className="flex-1 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2.5 bg-[#E1F0FF] text-[#0066CC] px-4 py-2 rounded-xl text-sm font-semibold border border-[#BBDDFA] shadow-sm">
                      <div className="w-5 h-5 bg-[#0066CC]/10 rounded flex items-center justify-center overflow-hidden">
                        <Icon icon="ph:user-fill" width={14} className="text-[#0066CC]" />
                      </div>
                      {selectedEnquiry?.email || "customer@email.com"}
                    </div>
                  </div>
                </div>

                {/* Cc Row */}
                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest w-6">Cc</span>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <div className="flex-1 inline-flex items-center gap-2.5 bg-[#F5E6FF] text-[#9933CC] px-4 py-2 rounded-xl text-sm font-semibold border border-[#EBD4FA] shadow-sm">
                      <div className="w-5 h-5 bg-[#9933CC]/10 rounded flex items-center justify-center overflow-hidden">
                        <Icon icon="ph:user-circle-plus-fill" width={14} className="text-[#9933CC]" />
                      </div>
                      <input
                        type="text"
                        list="recent-emails"
                        value={cc}
                        onChange={(e) => setCc(e.target.value)}
                        placeholder="Add recipient..."
                        className="bg-transparent border-none outline-none w-full placeholder:text-[#9933CC]/40"
                      />
                      <datalist id="recent-emails">
                        {uniqueEmails.map(email => (
                          <option key={email} value={email} />
                        ))}
                      </datalist>
                    </div>
                    <span className="text-gray-400 font-bold text-xs cursor-pointer hover:text-gray-800 uppercase tracking-wider transition-colors">Bcc</span>
                  </div>
                </div>

                <hr className="border-gray-100 my-4" />

                {/* Subject */}
                <div className="py-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-2xl font-bold text-gray-800 placeholder:text-gray-200"
                    placeholder="Subject"
                  />
                </div>

                {/* Message Area */}
                <div className="min-h-[280px]">
                  <textarea
                    className="w-full h-full min-h-[280px] bg-transparent border-none outline-none resize-none text-gray-600 leading-relaxed placeholder:text-gray-200"
                    placeholder="Type your message here..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                  ></textarea>
                </div>

                {/* Attachments Row */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 bg-gray-100/80 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Icon icon="lucide:paperclip" width={18} />
                    Attach a file
                  </button>

                  {attachments.map((file, index) => (
                    <div key={index} className="inline-flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl text-sm text-gray-700 bg-white">
                      <span className="max-w-[150px] truncate">{file.name}</span>
                      <Icon
                        icon="lucide:x"
                        width={16}
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                        onClick={() => removeAttachment(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer (Toolbar) */}
              <div className="bg-[#F8F9FA] p-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Formatting Icons */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1 border-r border-gray-300 pr-4">
                      <Icon icon="lucide:align-left" className="cursor-pointer hover:text-gray-800" width={18} />
                    </div>
                    <div className="flex items-center gap-5 border-r border-gray-300 pr-5">
                      <Icon icon="lucide:bold" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:italic" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:underline" className="cursor-pointer hover:text-gray-800" width={18} />
                    </div>
                    <div className="flex items-center gap-4 border-r border-gray-300 pr-4">
                      <Icon icon="lucide:undo-2" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:redo-2" className="cursor-pointer hover:text-gray-800" width={18} />
                    </div>
                    <div className="flex items-center gap-4">
                      <Icon icon="lucide:list" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:list-ordered" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:link" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:smile" className="cursor-pointer hover:text-gray-800" width={18} />
                      <Icon icon="lucide:image" className="cursor-pointer hover:text-gray-800" width={18} />
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleResolveSubmit}
                    disabled={updating}
                    className="bg-[#2196F3] hover:bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    Send email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Enquiries;
