import React, { createContext, useState, useEffect, useContext } from 'react';
import { getNotes, saveNotes, generateId, getRandomColor } from '../utils/noteUtils';

// Create Note Context
const NoteContext = createContext();

// PUBLIC_INTERFACE
/**
 * NoteProvider component for managing note state across the application
 * @param {Object} props - The component props
 * @returns {JSX.Element} The provider component
 */
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = getNotes();
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Add a new note
  const addNote = (noteData) => {
    const newNote = {
      id: generateId(),
      title: noteData.title || 'Untitled',
      content: noteData.content || '',
      color: noteData.color || getRandomColor(),
      category: noteData.category || 'Uncategorized',
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    return newNote;
  };

  // Update an existing note
  const updateNote = (id, updatedData) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { 
          ...note, 
          ...updatedData,
          updated: new Date().toISOString()
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    
    // Update activeNote if it was the one that got updated
    if (activeNote && activeNote.id === id) {
      const updatedActiveNote = updatedNotes.find(note => note.id === id);
      setActiveNote(updatedActiveNote);
    }
  };

  // Delete a note
  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
    
    // Clear activeNote if it was the one that got deleted
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
    }
  };

  // Get notes filtered by selected category
  const getFilteredNotes = () => {
    if (!selectedCategory || selectedCategory === 'All Notes') {
      return notes;
    }
    return notes.filter(note => note.category === selectedCategory);
  };

  // Context value
  const contextValue = {
    notes,
    activeNote,
    setActiveNote,
    selectedCategory,
    setSelectedCategory,
    isFormOpen,
    setIsFormOpen,
    addNote,
    updateNote,
    deleteNote,
    getFilteredNotes
  };

  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook for using the note context
 * @returns {Object} The note context
 */
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
