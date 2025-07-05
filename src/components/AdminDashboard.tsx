import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { portfolioApi, PortfolioItem } from '@/services/api';

const AdminDashboard = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioApi.getAll();
      if (response.success && response.data) {
        setPortfolioItems(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSave = async (item: PortfolioItem) => {
    try {
      // In a real app, you'd call the API to update
      console.log('Saving item:', item);
      setShowForm(false);
      setEditingItem(null);
      await fetchPortfolio(); // Refresh the list
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // In a real app, you'd call the API to delete
        console.log('Deleting item:', id);
        await fetchPortfolio(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Admin</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        {/* Portfolio Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                {item.video ? (
                  <video
                    src={item.video}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {item.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit/Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                if (editingItem) {
                  handleSave(editingItem);
                }
              }}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, description: e.target.value} : null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 h-20"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={editingItem?.image || ''}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, image: e.target.value} : null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Video URL (optional)"
                    value={editingItem?.video || ''}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, video: e.target.value} : null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                  <select
                    value={editingItem?.category || ''}
                    onChange={(e) => setEditingItem(prev => prev ? {...prev, category: e.target.value} : null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="music">Music</option>
                    <option value="automotive">Automotive</option>
                    <option value="sports">Sports</option>
                    <option value="animation">Animation</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 