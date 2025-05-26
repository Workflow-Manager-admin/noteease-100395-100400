import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NoteContext';
import { NOTE_COLORS, getCategories } from '../utils/noteUtils';

// PUBLIC_INTERFACE
/**
 * NoteForm component for adding and editing notes
 * @returns {JSX.Element} The NoteForm component
 */
const NoteForm = () => {
  const { 
    notes, 
    activeNote, 
    setActiveNote, 
    addNote, 
    updateNote, 
    isFormOpen, 
    setIsFormOpen 
  } = useNotes();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    color: NOTE_COLORS[0]
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Load categories from existing notes
  useEffect(() => {
    setCategories(getCategories(notes));
  }, [notes]);

  // Pre-fill form when editing an existing note
  useEffect(() => {
    if (activeNote) {
      setFormData({
        title: activeNote.title,
        content: activeNote.content,
        category: activeNote.category,
        color: activeNote.color
      });
    } else {
      resetForm();
    }
  }, [activeNote]);

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      color: NOTE_COLORS[0]
    });
    setNewCategory('');
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
    setShowColorPicker(false);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setFormData(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.title.trim() === '') {
      alert('Note title cannot be empty');
      return;
    }
    
    if (activeNote) {
      updateNote(activeNote.id, formData);
    } else {
      addNote(formData);
    }
    
    closeForm();
  };

  // Close the form and reset state
  const closeForm = () => {
    setIsFormOpen(false);
    setActiveNote(null);
    resetForm();
  };

  if (!isFormOpen) return null;

  return (
    <div className="note-form-overlay">
      <div className="note-form-container">
        <div className="note-form-header">
          <h2>{activeNote ? 'Edit Note' : 'Create Note'}</h2>
          <button 
            className="note-btn close-btn" 
            onClick={closeForm}
            aria-label="Close form"
          >
            <i className="note-icon">✕</i>
          </button>
        </div>
        
        <form className="note-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="content"
              placeholder="Note Content..."
              value={formData.content}
              onChange={handleChange}
              className="form-control"
              rows={5}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group category-group">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Category</option>
                <option value="Uncategorized">Uncategorized</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="add-category">
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-control"
                />
                <button 
                  type="button" 
                  onClick={handleAddCategory}
                  className="btn"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <div className="color-picker-container">
                <div 
                  className="selected-color" 
                  style={{ backgroundColor: formData.color }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                
                {showColorPicker && (
                  <div className="color-picker">
                    {NOTE_COLORS.map(color => (
                      <div
                        key={color}
                        className="color-option"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn cancel-btn" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="btn save-btn">
              {activeNote ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
