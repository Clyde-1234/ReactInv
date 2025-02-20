import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';

interface Member {
  id: string;
  name: string;
}

export default function CreateStorageHouse({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [item, setItem] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch members from Supabase
    const fetchMembers = async () => {
      const { data, error } = await supabase
      .from('users')
      .select('id, name');
      if (error) {
        console.error('Error fetching members:', error.message);
      } else {
        setMembers(data || []);
      }
    };
    fetchMembers();
  }, []);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., store data)
    console.log('Form submitted', { item, logo, selectedMember });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0  bg-slate-800 flex justify-center items-center"
    >
      <div className=" bg-slate-400 p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold">Create Item</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="my-4">
            <label className="block text-sm font-medium">Item</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-medium">Logo</label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-medium">Add Member</label>
            <select
              onChange={(e) => setSelectedMember(members.find(member => member.id === e.target.value) || null)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

