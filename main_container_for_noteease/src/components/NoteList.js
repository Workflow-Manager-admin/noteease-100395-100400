import React from 'react';
import { useNotes } from '../context/NoteContext';
import NoteCard from './NoteCard';

// PUBLIC_INTERFACE
/**
 * NoteList component for displaying the list of notes
 * @returns {JSX.Element} The NoteList component
 */
const NoteList = () => {
  const { getFilteredNotes, selectedCategory } = useNotes();
  const filteredNotes = getFilteredNotes();

  if (filteredNotes.length === 0) {
    return (
      <div className="notes-empty-state">
        <h2>
          {selectedCategory === 'All Notes'
            ? 'No notes yet'
            : `No notes in "${selectedCategory}" category`}
        </h2>
        <p>Click the "New Note" button to create your first note!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {filteredNotes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
