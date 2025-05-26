import React from 'react';
import { formatDate } from '../utils/noteUtils';
import { useNotes } from '../context/NoteContext';

// PUBLIC_INTERFACE
/**
 * NoteCard component for displaying an individual note
 * @param {Object} props - The component props
 * @param {Object} props.note - The note object to display
 * @returns {JSX.Element} The NoteCard component
 */
const NoteCard = ({ note }) => {
  const { setActiveNote, deleteNote, setIsFormOpen } = useNotes();

  // Handle edit click
  const handleEdit = () => {
    setActiveNote(note);
    setIsFormOpen(true);
  };

  // Handle delete click with confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  // Truncate content if it's too long
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        <div className="note-card-category">{note.category}</div>
      </div>
      
      <div className="note-card-content">
        {truncateContent(note.content)}
      </div>
      
      <div className="note-card-footer">
        <div className="note-card-date">
          {formatDate(note.updated)}
        </div>
        
        <div className="note-card-actions">
          <button 
            className="note-btn edit-btn" 
            onClick={handleEdit} 
            aria-label="Edit note"
          >
            <i className="note-icon">✏️</i>
          </button>
          
          <button 
            className="note-btn delete-btn" 
            onClick={handleDelete} 
            aria-label="Delete note"
          >
            <i className="note-icon">🗑️</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
