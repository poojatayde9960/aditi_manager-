import React, { useState } from 'react';
import giftsimg from '../../../public/mdi_gift.png';
import { Search, Plus, Pencil, Trash2, LayoutGrid, List, Image as ImageIcon, X } from 'lucide-react';

const Gifts = () => {
  const [activeModal, setActiveModal] = useState(null);
  // View mode state: 'grid' or 'list'
  const [viewMode, setViewMode] = useState('grid');

  const gifts = [
    { id: '#PRD-12345', name: 'Perfume Box', price: '$520', stock: '120', sales: '90' },
    { id: '#PRD-12346', name: 'Perfume Box', price: '$520', stock: '120', sales: '90' },
  ];

  return (
    <div className="min-h-screen md:ml-23 bg-[#05091d] text-white p-4 md:p-5 font-sans">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Gifts</h1>
          <p className="text-gray-400 text-sm">Manage Your Gift Collection</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveModal('gift')}
            className="bg-[#00c2ff] hover:bg-[#00a8dd] text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2 transition-all"
          >
            <Plus size={18} /> Add Gift
          </button>
        </div>
      </div>

      {/* --- SEARCH & TOGGLE BAR --- */}
      <div className="flex items-center justify-between bg-[#0a102b] p-3 rounded-xl border border-gray-800 mb-8">
        <div className="relative w-full bg-[#020523] rounded-xl  max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search Product"
            className="w-full py-3 border-none focus:ring-0 text-sm pl-10 text-gray-300"
          />
        </div>
        <div className="flex gap-2 bg-[#1a2245] p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#00c2ff]/20 text-[#00c2ff]' : 'text-gray-500'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#00c2ff]/20 text-[#00c2ff]' : 'text-gray-500'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* --- CONDITIONAL VIEW --- */}
      {viewMode === 'grid' ? (
        /* GRID VIEW (As per your existing UI) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-[#0a102b] border border-gray-800 rounded-3xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="rounded-2xl flex items-center justify-center shadow-lg">
                  <img src={giftsimg} className='h-10' alt="" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{gift.name}</h3>
                  <p className="text-gray-400 mt-1">{gift.price}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2.5 bg-[#1a2245] border border-gray-700 rounded-xl text-gray-400 hover:text-white"><Pencil size={18} /></button>
                <button className="p-2.5 bg-[#1a2245] border border-gray-700 rounded-xl text-red-500 hover:bg-red-500/10"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW (Table UI as per image_41f9fb.png) */
        <div className="overflow-x-auto bg-[#0a102b] border border-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 font-medium">Product ID</th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Sales</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {gifts.map((gift) => (
                <tr key={gift.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-gray-300 font-mono">{gift.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1a2245] rounded-lg flex items-center justify-center">
                        <img src={giftsimg} className="h-6" alt="" />
                      </div>
                      <span>{gift.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{gift.price}</td>
                  <td className="p-4 text-[#22FF00]">{gift.stock}</td>
                  <td className="p-4 text-gray-300">{gift.sales}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-[#1a2245] rounded-lg text-[#00c2ff] hover:bg-[#252d58]">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 bg-[#1a2245] rounded-lg text-red-500 hover:bg-red-500/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- ADD NEW GIFT POPUP --- */}
      {activeModal === 'gift' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a102b] w-full max-w-md rounded-[40px] border border-gray-800 p-10 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-8 text-gray-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-semibold mb-8">Add New Gift</h2>
            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Gift Name</label>
                <input type="text" placeholder="e.g Mahakali essence" className="w-full bg-[#05091d] border border-gray-800 rounded-xl p-4 focus:outline-none focus:border-[#00c2ff]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Gift Value</label>
                <input type="text" placeholder="120" className="w-full bg-[#05091d] border border-gray-800 rounded-xl p-4 focus:outline-none focus:border-[#00c2ff]" />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-[#00c2ff] text-white font-bold py-3 px-12 rounded-xl flex items-center gap-2 shadow-lg shadow-[#00c2ff]/20">
                + Add Gift
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gifts;