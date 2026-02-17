import React, { useState } from 'react';
import flower from '../../../public/flower.jpg';
import { Search, Download, Plus, FileText, ArrowRight, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Icon } from "@iconify/react";

const Blog = () => {
    // Popup state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data for cards
    const blogs = [1, 2, 3, 4];

    return (
        <div className="min-h-screen bg-[#05091d] text-white font-sans relative">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Blogs</h1>
                    <p className="text-gray-400 text-sm">Manage Your Blogs Add & Delete Anytime</p>
                </div>
                {/* Modal Trigger */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#00c2ff] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all hover:opacity-90"
                >
                    <Plus size={18} /> Add Blog
                </button>
            </div>

            {/* Modal / Popup UI */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a102b] w-full max-w-2xl rounded-3xl border border-gray-800 overflow-hidden shadow-2xl relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6">Add New Blog</h2>
                            <hr className="border-gray-800 mb-8" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Headline */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">Headline</label>
                                    <input
                                        type="text"
                                        placeholder="e.g Mahakali essence"
                                        className="w-full bg-[#05091d] border border-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#00c2ff] text-sm"
                                    />
                                </div>
                                {/* Subheadline */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">Subheadline</label>
                                    <input
                                        type="text"
                                        placeholder="e.g the birth of mahakali essence"
                                        className="w-full bg-[#05091d] border border-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#00c2ff] text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Main Blog Image */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">
                                        Main Blog Image
                                    </label>

                                    <label className="relative flex items-center gap-3 w-full cursor-pointer
      border border-dashed border-gray-700 rounded-xl px-5 py-4
      bg-[#0b1020] hover:bg-[#0f1630] transition"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => console.log("Main Image:", e.target.files[0])}
                                        />

                                        {/* Icon */}
                                        <Icon icon="basil:image-solid"
                                            className="w-5 h-5 text-gray-400"

                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3 16l4-4a2 2 0 012.828 0L14 16m-2-2l1.172-1.172a2 2 0 012.828 0L21 16m-9-4v-6" />
                                        </Icon>

                                        <span className="text-sm text-gray-400">
                                            Upload
                                        </span>
                                    </label>
                                </div>

                                {/* Other Images */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">
                                        Other Images
                                    </label>

                                    <label className="relative flex items-center gap-3 w-full cursor-pointer
      border border-dashed border-gray-700 rounded-xl px-5 py-4
      bg-[#0b1020] hover:bg-[#0f1630] transition"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => console.log("Other Images:", e.target.files)}
                                        />

                                        {/* Icon */}
                                        <Icon icon="basil:image-solid"
                                            className="w-5 h-5 text-gray-400"

                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3 16l4-4a2 2 0 012.828 0L14 16m-2-2l1.172-1.172a2 2 0 012.828 0L21 16m-9-4v-6" />
                                        </Icon>

                                        <span className="text-sm text-gray-400">
                                            Upload
                                        </span>
                                    </label>
                                </div>
                            </div>


                            {/* Description */}
                            <div className="space-y-2 mb-8">
                                <label className="text-sm text-gray-300">Description</label>
                                <textarea
                                    rows="4"
                                    placeholder="Enter description of blog"
                                    className="w-full bg-[#05091d] border border-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#00c2ff] text-sm resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button className="bg-[#00c2ff] text-white font-bold py-3 px-10 rounded-xl flex items-center gap-2 shadow-lg shadow-[#00c2ff]/20">
                                    + Add Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Card */}
            <div className="bg-[#0a102b] w-full md:w-56 p-4 rounded-xl border border-gray-800 mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#1a2245] p-2 rounded-lg">
                        <FileText size={20} className="text-gray-300" />
                    </div>
                    <span className="text-[#22FF00] text-xs font-bold bg-[#22FF0030] px-2 py-1 rounded-lg">+12.5%</span>
                </div>
                <p className="text-gray-400 text-xs">Total Blogs</p>
                <h2 className="text-3xl font-bold mt-1">20</h2>
            </div>

            {/* Search and Export Bar */}
            <div className="flex flex-col bg-[#FFFFFF0A] p-3 rounded-2xl md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-[400px] max-w-full bg-[#0a102b] border border-gray-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00c2ff]"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#1a2245] border border-gray-700 px-4 py-2 rounded-lg text-gray-300 hover:bg-[#252d58] transition-all">
                    <Download size={18} /> Export
                </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {blogs.map((item) => (
                    <div key={item} className="bg-[#0a102b] border border-gray-800 rounded-2xl p-4 flex flex-col gap-4">
                        <div className="flex gap-2 h-48 md:h-64">
                            <div className="flex-[3] bg-gray-700 rounded-lg overflow-hidden">
                                <img src={flower} alt="Flower" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex-1 bg-gray-700 rounded-lg overflow-hidden">
                                        <img src={flower} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">Fragrance As A Ritual: When Scent Becomes Sacred</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                Fragrance Has Always Been More Than A Sensory Pleasure. Across Cultures And Centuries, Scent Has Been Used As Ritual A Bridge Between The Visible And The Unseen.
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <button className="flex items-center gap-2 text-sm font-medium hover:text-[#00c2ff] transition-colors group">
                                <span className="p-2 border border-gray-700 rounded-full group-hover:border-[#00c2ff]">
                                    <MdArrowForwardIos size={16} />
                                </span>
                                Read More
                            </button>

                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 underline underline-offset-4 px-4 py-2 rounded-lg text-sm ">
                                    <Pencil size={16} /> Edit
                                </button>
                                <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;