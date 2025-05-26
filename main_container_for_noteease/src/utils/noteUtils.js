/**
 * Utility functions for the NoteEase application
 */

// PUBLIC_INTERFACE
/**
 * Generate a unique ID for notes
 * @returns {string} A random string ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// PUBLIC_INTERFACE
/**
 * Format date to readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// PUBLIC_INTERFACE
/**
 * Get notes from local storage
 * @returns {Array} Array of note objects
 */
export const getNotes = () => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

// PUBLIC_INTERFACE
/**
 * Save notes to local storage
 * @param {Array} notes - Array of note objects to save
 */
export const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// PUBLIC_INTERFACE
/**
 * Get all unique categories from notes
 * @param {Array} notes - Array of note objects
 * @returns {Array} Array of unique categories
 */
export const getCategories = (notes) => {
  const categorySet = new Set();
  
  notes.forEach(note => {
    if (note.category && note.category.trim() !== '') {
      categorySet.add(note.category);
    }
  });
  
  return Array.from(categorySet);
};

// Default note colors
export const NOTE_COLORS = [
  '#E87A41', // Kavia Orange
  '#8E44AD', // Purple
  '#2ECC71', // Green
  '#3498DB', // Blue
  '#F1C40F', // Yellow
  '#E74C3C', // Red
  '#1ABC9C', // Turquoise
];

// Get a random note color
export const getRandomColor = () => {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
};
