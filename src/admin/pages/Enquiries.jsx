import React from "react";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { useEnquiryDeleteMutation, useEnquiryStatusMutation, useGetEnquiryQuery, useManagerContactResolveMutation } from "../../Redux/Apis/enquiryApi";

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
    return (
      <div className="md:p-8 md:ml-23 bg-[#020523] min-h-screen text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="md:p-8 md:ml-23 bg-[#020523] text-white min-h-screen font-manrope">
      {/* Header Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:max-w-md">
          <Icon icon="mynaui:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width={20} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1135] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-[#0B1135] border border-white/10 px-5 py-3 rounded-xl text-sm text-gray-300 hover:bg-[#141b4d] transition-all min-w-[140px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Icon icon="mi:filter" className="text-gray-400" />
              <span>{statusFilter}</span>
            </div>
            <Icon icon="lucide:chevron-down" className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
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

      {/* Enquiries Table */}
      <div className="bg-[#0B1135]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="py-6 px-8 font-medium">Customer</th>
                <th className="py-6 px-8 font-medium">Contact</th>
                <th className="py-6 px-8 font-medium">Message</th>
                <th className="py-6 px-8 font-medium text-center">Status</th>
                <th className="py-6 px-8 font-medium">Date</th>
                <th className="py-6 px-8 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-[#141A3A] rounded-full flex items-center justify-center text-cyan-400 font-bold border border-cyan-400/20 shadow-lg group-hover:border-cyan-400/40 transition-all">
                        {e.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">{e.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{e.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-6 px-8 text-sm text-gray-300">{e.phone}</td>

                  <td className="py-6 px-8 text-sm text-gray-300 max-w-[300px]">
                    <p className="leading-relaxed">{e.message}</p>
                  </td>

                  <td className="py-6 px-8 text-center text-[0]">
                    <span
                      className={`inline-flex px-4 py-1.5 rounded-xl capitalize ${e.status === "Contacted"
                        ? "bg-[#22FF0030] text-[#22FF00]"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
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

                  <td className="py-6 px-8 whitespace-nowrap">
                    <p className="text-sm font-medium">{e.date}</p>
                    <p className="text-xs text-gray-400 mt-1">{e.time}</p>
                  </td>

                  <td className="py-6 px-8 text-right">
                    {e.status === "Pending" ? (
                      <button
                        onClick={() => handleResolveClick(e)}
                        disabled={updating && statusLoadingId === e.id}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                      >
                        {updating && statusLoadingId === e.id ? "Processing..." : "Resolved Query"}
                      </button>
                    ) : (
                      <span className="text-gray-500 text-lg pr-12">—</span>
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
      {isModalOpen && (
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
            <div className="p-6 space-y-4">
              {/* To Row */}
              <div className="flex items-center gap-4 group">
                <span className="text-gray-500 font-medium w-8">To</span>
                <div className="flex-1 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 bg-[#E1F0FF] text-[#0066CC] px-3 py-1.5 rounded-lg text-sm font-medium border border-[#BBDDFA]">
                    <div className="w-5 h-5 bg-[#A4C9FF] rounded flex items-center justify-center overflow-hidden">
                      <Icon icon="ph:user-fill" width={14} className="text-[#0066CC]" />
                    </div>
                    {selectedEnquiry?.email || "customer@email.com"}
                  </div>
                </div>
              </div>

              {/* Cc Row */}
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-medium w-8">Cc</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-[#F5E6FF] text-[#9933CC] px-3 py-1.5 rounded-lg text-sm font-medium border border-[#EBD4FA]">
                    <div className="w-5 h-5 bg-[#E6C9FF] rounded flex items-center justify-center overflow-hidden">
                      <Icon icon="ph:user-circle-plus-fill" width={14} className="text-[#9933CC]" />
                    </div>
                    <input
                      type="text"
                      list="recent-emails"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      placeholder="Add CC email"
                      className="bg-transparent border-none outline-none w-full"
                    />
                    <datalist id="recent-emails">
                      {uniqueEmails.map(email => (
                        <option key={email} value={email} />
                      ))}
                    </datalist>
                  </div>
                  <span className="text-gray-500 font-medium text-sm cursor-pointer hover:text-gray-800">Bcc</span>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Subject */}
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-none outline-none placeholder:text-gray-300"
                  placeholder="Subject"
                />
              </div>

              {/* Message Area */}
              <div className="min-h-[250px] text-gray-700 leading-relaxed">
                <textarea
                  className="w-full h-full min-h-[250px] bg-transparent border-none outline-none resize-none placeholder:text-gray-300"
                  placeholder="Write your message here..."
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
      )}
    </div>
  );
};

export default Enquiries;
