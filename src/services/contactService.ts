const BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'mi-agenda'; // You can change this to any name you want

export class ContactService {
  // Create agenda if it doesn't exist
  static async createAgenda(): Promise<void> {
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log('Agenda might already exist or error creating:', error);
    }
  }

  // Get all contacts
  static async getContacts(): Promise<any[]> {
    try {
      await this.createAgenda(); // Ensure agenda exists
      const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      return data.contacts || [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  // Create a new contact
  static async createContact(contactData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  }): Promise<any> {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create contact');
    }
    
    return response.json();
  }

  // Update a contact
  static async updateContact(id: number, contactData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  }): Promise<any> {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
    return response.json();
  }

  // Delete a contact
  static async deleteContact(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  }
}