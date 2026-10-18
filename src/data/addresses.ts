import type { Address } from '@/types'

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    name: 'Aarav Sharma',
    line1: '42, Lake View Residency, Green Park Road',
    line2: 'Near City Mall',
    city: 'Mumbai',
    pincode: '400001',
    phone: '9876543210',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office',
    name: 'Aarav Sharma',
    line1: 'Level 4, Tech Tower, Andheri East',
    city: 'Mumbai',
    pincode: '400069',
    phone: '9876543210',
    isDefault: false,
  },
]