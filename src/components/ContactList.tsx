import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Edit, Trash2, Plus } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import { Contact } from '../types/Contact';
import { Modal } from './Modal';

export function ContactList() {
  const { state, deleteContact } = useContacts();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const handleDeleteClick = (contact: Contact) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete.id);
        setDeleteModalOpen(false);
        setContactToDelete(null);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setContactToDelete(null);
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando contactos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lista de Contactos</h1>
          <p className="text-gray-600 text-lg">Gestiona todos tus contactos en un solo lugar</p>
        </div>

        {/* Add Contact Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/add-contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Agregar Contacto
          </Link>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {state.error}
          </div>
        )}

        {/* Contacts Grid */}
        {state.contacts.length === 0 ? (
          <div className="text-center py-12">
            <User size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay contactos</h3>
            <p className="text-gray-600 mb-6">Comienza agregando tu primer contacto</p>
            <Link
              to="/add-contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Agregar Primer Contacto
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {state.contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-contact/${contact.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar contacto"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(contact)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar contacto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 truncate">
                  {contact.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={16} className="flex-shrink-0" />
                    <span className="truncate">{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={16} className="flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="truncate">{contact.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar Contacto"
        message={`¿Estás seguro de que deseas eliminar a ${contactToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}