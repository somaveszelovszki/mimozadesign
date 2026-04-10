import { Mail, MapPinIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react'

import { COMPANY_INFO } from '@/consts'

export const contactInfo = [
  {
    title: 'Konzultáció',
    icon: MessageCircleIcon,
    description: 'Az első egyeztetés ingyenes'
  },
  {
    title: 'Helyszín',
    icon: MapPinIcon,
    description: 'Tata és környéke\nKiszállással országosan'
  },
  {
    title: 'Email',
    icon: Mail,
    description: COMPANY_INFO.contactPoint.email,
    link: `mailto:${COMPANY_INFO.contactPoint.email}`
  },
  {
    title: 'Telefon',
    icon: PhoneIcon,
    description: COMPANY_INFO.contactPoint.telephone,
    link: `tel:${COMPANY_INFO.contactPoint.telephone.replace(/\s/g, '')}`
  }
]
