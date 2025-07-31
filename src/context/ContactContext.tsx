import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Contact, ContactFormData } from '../types/Contact';
import { ContactService } from '../services/contactService';

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

type ContactAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONTACTS'; payload: Contact[] }
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: Contact }
  | { type: 'DELETE_CONTACT'; payload: number }
  | { type: 'SET_ERROR'; payload: string | null };

interface ContactContextType {
  state: ContactState;
  loadContacts: () => Promise<void>;
  createContact: (contactData: ContactFormData) => Promise<void>;
  updateContact: (id: number, contactData: ContactFormData) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload, loading: false, error: null };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const loadContacts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const contacts = await ContactService.getContacts();
      dispatch({ type: 'SET_CONTACTS', payload: contacts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los contactos' });
    }
  };

  const createContact = async (contactData: ContactFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newContact = await ContactService.createContact(contactData);
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al crear el contacto' });
      throw error;
    }
  };

  const updateContact = async (id: number, contactData: ContactFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedContact = await ContactService.updateContact(id, contactData);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar el contacto' });
      throw error;
    }
  };

  const deleteContact = async (id: number) => {
    try {
      await ContactService.deleteContact(id);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al eliminar el contacto' });
      throw error;
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const contextValue: ContactContextType = {
    state,
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
}