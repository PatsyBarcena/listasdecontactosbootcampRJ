import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import { ContactList } from './components/ContactList';
import { AddContact } from './components/AddContact';

function App() {
  return (
    <ContactProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/edit-contact/:id" element={<AddContact />} />
          </Routes>
        </div>
      </Router>
    </ContactProvider>
  );
}

export default App;