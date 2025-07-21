export const mockReturns = [
  {
    id: '1',
    userId: 'user1',
    product: {
      name: 'Mixer Grinder',
      brand: 'Conken',
      category: 'Appliances',
      purchaseDate: '2024-01-15'
    },
    reason: 'Defective/Broken',
    condition: 'broken',
    imageUrls: [
      'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    suggestion: 'recycle',
    status: 'resolved',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    userId: 'user1',
    product: {
      name: 'Mixer Grinder',
      brand: 'KitchenAid',
      category: 'Appliances',
      purchaseDate: '2024-02-01'
    },
    reason: 'Poor Quality',
    condition: 'broken',
    imageUrls: [
      'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    suggestion: 'recycle',
    status: 'assigned',
    createdAt: '2024-02-05T14:30:00Z'
  },
  {
    id: '3',
    userId: 'user1',
    product: {
      name: 'Coffee Maker',
      brand: 'Breville',
      category: 'Appliances',
      purchaseDate: '2024-01-10'
    },
    reason: 'No Longer Needed',
    condition: 'new',
    imageUrls: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    suggestion: 'reuse',
    status: 'inspected',
    createdAt: '2024-01-25T09:15:00Z'
  },
  {
    id: '4',
    userId: 'user1',
    product: {
      name: 'Bluetooth Speaker',
      brand: 'JBL',
      category: 'Electronics',
      purchaseDate: '2024-02-10'
    },
    reason: 'Defective/Broken',
    condition: 'damaged',
    imageUrls: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    suggestion: 'repair',
    status: 'pending',
    createdAt: '2024-02-15T16:45:00Z'
  }
];