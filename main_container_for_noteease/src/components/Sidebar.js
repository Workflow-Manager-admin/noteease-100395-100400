import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';
import { getCategories } from '../utils/noteUtils';

// PUBLIC_INTERFACE
/**
 * Sidebar component for navigation and note organization
 * @returns {JSX.Element} The Sidebar component
 */
const Sidebar = () => {
  const { 
    notes, 
    selectedCategory, 
    setSelectedCategory, 
    setIsFormOpen 
  } = useNotes();
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const categories = getCategories(notes);
  
  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };
  
  // Create new note
  const handleNewNote = () => {
    setIsFormOpen(true);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <>
      <div className="sidebar-toggle" onClick={toggleMobileSidebar}>
        <i className="note-icon">{isMobileSidebarOpen ? '✕' : '☰'}</i>
      </div>
      
      <aside className={`sidebar ${isMobileSidebarOpen ? 'sidebar-mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>NoteEase</h2>
        </div>
        
        <div className="sidebar-actions">
          <button className="btn btn-large new-note-btn" onClick={handleNewNote}>
            New Note
          </button>
        </div>
        
        <nav className="sidebar-categories">
          <h3>Categories</h3>
          <ul>
            <li
              className={selectedCategory === 'All Notes' ? 'active' : ''}
              onClick={() => handleCategoryClick('All Notes')}
            >
              All Notes <span className="count">{notes.length}</span>
            </li>
            
            {categories.map(category => {
              const categoryCount = notes.filter(note => note.category === category).length;
              return (
                <li
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category} <span className="count">{categoryCount}</span>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <p>© {new Date().getFullYear()} NoteEase</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
