import React from 'react';
import { NoteProvider } from '../context/NoteContext';
import Sidebar from './Sidebar';
import Header from './Header';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

// PUBLIC_INTERFACE
/**
 * MainContainer component that serves as the main wrapper for the NoteEase application
 * @returns {JSX.Element} The MainContainer component
 */
const MainContainer = () => {
  return (
    <NoteProvider>
      <div className="noteease-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <NoteList />
        </main>
        <NoteForm />
      </div>
    </NoteProvider>
  );
};

export default MainContainer;
