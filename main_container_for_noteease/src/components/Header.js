import React from 'react';
import { useNotes } from '../context/NoteContext';

// PUBLIC_INTERFACE
/**
 * Header component for the NoteEase application
 * @returns {JSX.Element} The Header component
 */
const Header = () => {
  const { selectedCategory, getFilteredNotes } = useNotes();
  const filteredNotes = getFilteredNotes();
  
  return (
    <header className="main-header">
      <div className="header-content">
        <h1>{selectedCategory}</h1>
        <p>
          {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
        </p>
      </div>
    </header>
  );
};

export default Header;
