
import { State, Destination } from './types';

export const STATES: State[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    capital: 'Jaipur',
    description: 'The Land of Kings, famous for its majestic forts, vibrant culture, and golden deserts.',
    imageUrl: 'https://picsum.photos/seed/rajasthan-main/800/600',
    imageHint: 'Rajasthan heritage fort'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    description: 'God\'s Own Country, known for its serene backwaters, lush greenery, and ayurveda.',
    imageUrl: 'https://picsum.photos/seed/kerala-main/800/600',
    imageHint: 'Kerala backwaters'
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    description: 'The heartland of India, home to the Taj Mahal and ancient spiritual centers.',
    imageUrl: 'https://picsum.photos/seed/up-main/800/600',
    imageHint: 'Varanasi ghats'
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    description: 'A Himalayan paradise offering breathtaking mountain views and adventure sports.',
    imageUrl: 'https://picsum.photos/seed/hp-main/800/600',
    imageHint: 'Himachal mountains'
  },
  {
    id: 'goa',
    name: 'Goa',
    capital: 'Panaji',
    description: 'India\'s beach capital, famous for its Portuguese heritage and nightlife.',
    imageUrl: 'https://picsum.photos/seed/goa-main/800/600',
    imageHint: 'Goa beach'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    capital: 'Bengaluru',
    description: 'A blend of ancient history and modern technology, from Hampi to Silicon Valley.',
    imageUrl: 'https://picsum.photos/seed/karnataka-main/800/600',
    imageHint: 'Hampi ruins'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Taj Mahal',
    stateId: 'uttar-pradesh',
    cityName: 'Agra',
    category: 'Heritage',
    description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
    historicalSignificance: 'A UNESCO World Heritage site and one of the Seven Wonders of the World, representing the pinnacle of Mughal architecture.',
    bestTime: 'October to March',
    locationLink: 'https://goo.gl/maps/tajmahal',
    images: ['https://picsum.photos/seed/taj1/800/600', 'https://picsum.photos/seed/taj2/800/600'],
    imageHints: ['Taj Mahal architecture', 'Taj Mahal garden'],
    nearbyAttractions: ['Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
    uniqueInsights: ['The Taj Mahal changes color throughout the day', 'Perfect symmetry is maintained except for the cenotaphs']
  },
  {
    id: '2',
    name: 'Munnar Tea Gardens',
    stateId: 'kerala',
    cityName: 'Munnar',
    category: 'Nature',
    description: 'Munnar is a town in the Western Ghats mountain range in India’s Kerala state. A hill station and former resort for the British Raj elite, it\'s surrounded by rolling hills dotted with tea plantations.',
    historicalSignificance: 'Established as a summer resort by the British, the area became famous for its commercial tea plantations in the late 19th century.',
    bestTime: 'September to March',
    locationLink: 'https://goo.gl/maps/munnar',
    images: ['https://picsum.photos/seed/munnar1/800/600', 'https://picsum.photos/seed/munnar2/800/600'],
    imageHints: ['Munnar tea gardens', 'Kerala hills'],
    nearbyAttractions: ['Eravikulam National Park', 'Anamudi Peak', 'Tea Museum']
  },
  {
    id: '3',
    name: 'Amer Fort',
    stateId: 'rajasthan',
    cityName: 'Jaipur',
    category: 'Heritage',
    description: 'Amer Fort is a fort located in Amer, Rajasthan, India. Amer is a town with an area of 4 square kilometers located 11 kilometers from Jaipur, the capital of Rajasthan. Located high on a hill, it is the principal tourist attraction in Jaipur.',
    historicalSignificance: 'Built by Raja Man Singh I in 1592, the fort is known for its artistic Hindu style elements.',
    bestTime: 'November to March',
    locationLink: 'https://goo.gl/maps/amerfort',
    images: ['https://picsum.photos/seed/amer1/800/600', 'https://picsum.photos/seed/amer2/800/600'],
    imageHints: ['Amer Fort Jaipur', 'Rajasthan fort heritage'],
    nearbyAttractions: ['Nahargarh Fort', 'Jaigarh Fort', 'City Palace']
  }
];
