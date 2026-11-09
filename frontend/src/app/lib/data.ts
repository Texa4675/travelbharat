
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
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    capital: 'Mumbai',
    description: 'A powerhouse of commerce and culture, home to Bollywood and stunning cave architecture.',
    imageUrl: 'https://picsum.photos/seed/maharashtra-state/800/600',
    imageHint: 'Gateway of India'
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    description: 'The cradle of Dravidian culture, known for its magnificent temples and classical arts.',
    imageUrl: 'https://picsum.photos/seed/tamilnadu-state/800/600',
    imageHint: 'Meenakshi Temple'
  },
  {
    id: 'punjab',
    name: 'Punjab',
    capital: 'Chandigarh',
    description: 'The granary of India, famous for its soulful music, vibrant festivals, and the Golden Temple.',
    imageUrl: 'https://picsum.photos/seed/punjab-state/800/600',
    imageHint: 'Golden Temple'
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    capital: 'Kolkata',
    description: 'The cultural soul of India, where literature, art, and the majestic Sunderbans thrive.',
    imageUrl: 'https://picsum.photos/seed/westbengal-state/800/600',
    imageHint: 'Victoria Memorial'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    description: 'A land of legends, famous for the white desert of Kutch, Asiatic lions, and vibrant commerce.',
    imageUrl: 'https://picsum.photos/seed/gujarat-state/800/600',
    imageHint: 'Rann of Kutch'
  },
  {
    id: 'odisha',
    name: 'Odisha',
    capital: 'Bhubaneswar',
    description: 'The soul of India\'s ancient architectural brilliance, known for the Konark Sun Temple and Puri Jagannath.',
    imageUrl: 'https://picsum.photos/seed/odisha-state/800/600',
    imageHint: 'Konark Temple'
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
  },
  {
    id: '4',
    name: 'Ajanta Caves',
    stateId: 'maharashtra',
    cityName: 'Aurangabad',
    category: 'Heritage',
    description: 'The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state.',
    historicalSignificance: 'A UNESCO World Heritage site, these caves contain paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.',
    bestTime: 'June to March',
    locationLink: 'https://goo.gl/maps/ajanta',
    images: ['https://picsum.photos/seed/ajanta1/800/600', 'https://picsum.photos/seed/ajanta2/800/600'],
    imageHints: ['Ajanta Caves painting', 'Ancient Buddhist caves'],
    nearbyAttractions: ['Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort'],
    uniqueInsights: ['The caves were accidentally rediscovered by a British officer during a hunting trip in 1819.']
  },
  {
    id: '5',
    name: 'Meenakshi Amman Temple',
    stateId: 'tamil-nadu',
    cityName: 'Madurai',
    category: 'Religious',
    description: 'Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu.',
    historicalSignificance: 'Dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwarar, a form of Shiva. It has been a major pilgrimage center for over 2,000 years.',
    bestTime: 'October to March',
    locationLink: 'https://goo.gl/maps/madurai',
    images: ['https://picsum.photos/seed/meenakshi1/800/600', 'https://picsum.photos/seed/meenakshi2/800/600'],
    imageHints: ['Meenakshi Temple gopuram', 'Madurai temple architecture'],
    nearbyAttractions: ['Thirumalai Nayakkar Mahal', 'Gandhi Memorial Museum'],
    uniqueInsights: ['The temple complex has 14 gopurams (gateway towers), ranging from 45–50m in height.']
  },
  {
    id: '6',
    name: 'Golden Temple',
    stateId: 'punjab',
    cityName: 'Amritsar',
    category: 'Religious',
    description: 'The Golden Temple, also known as Harmandir Sahib, is the preeminent spiritual site of Sikhism.',
    historicalSignificance: 'Founded by Guru Ram Das in 1577, the temple’s architecture is a blend of Hindu and Islamic styles, symbolizing equality and brotherhood.',
    bestTime: 'October to March',
    locationLink: 'https://goo.gl/maps/goldentemple',
    images: ['https://picsum.photos/seed/goldentemple1/800/600', 'https://picsum.photos/seed/goldentemple2/800/600'],
    imageHints: ['Golden Temple Amritsar', 'Sikh spiritual site'],
    nearbyAttractions: ['Jallianwala Bagh', 'Wagah Border', 'Partition Museum'],
    uniqueInsights: ['The temple serves free meals (Langar) to over 100,000 people every single day.']
  },
  {
    id: '7',
    name: 'Victoria Memorial',
    stateId: 'west-bengal',
    cityName: 'Kolkata',
    category: 'Heritage',
    description: 'The Victoria Memorial is a large marble building in Kolkata, West Bengal, India, which was built between 1906 and 1921.',
    historicalSignificance: 'Dedicated to the memory of Queen Victoria, it is now a museum and tourist destination under the auspices of the Ministry of Culture.',
    bestTime: 'October to February',
    locationLink: 'https://goo.gl/maps/victoriamemorial',
    images: ['https://picsum.photos/seed/victoria1/800/600', 'https://picsum.photos/seed/victoria2/800/600'],
    imageHints: ['Victoria Memorial Kolkata', 'Colonial architecture India'],
    nearbyAttractions: ['Howrah Bridge', 'Dakshineswar Kali Temple', 'Indian Museum'],
    uniqueInsights: ['The memorial is built of white Makrana marble, the same stone used in the Taj Mahal.']
  },
  {
    id: '8',
    name: 'Konark Sun Temple',
    stateId: 'odisha',
    cityName: 'Konark',
    category: 'Heritage',
    description: 'Konark Sun Temple is a 13th-century CE Sun Temple at Konark about 35 kilometers northeast from Puri on the coastline of Odisha.',
    historicalSignificance: 'Built by King Narasimhadeva I of the Eastern Ganga Dynasty, it is designed in the shape of a colossal chariot with seven horses and twelve pairs of wheels.',
    bestTime: 'September to March',
    locationLink: 'https://goo.gl/maps/konark',
    images: ['https://picsum.photos/seed/konark1/800/600', 'https://picsum.photos/seed/konark2/800/600'],
    imageHints: ['Konark Sun Temple wheel', 'Ancient Odisha architecture'],
    nearbyAttractions: ['Puri Beach', 'Jagannath Temple', 'Chilika Lake'],
    uniqueInsights: ['The 24 wheels are not just decorative; they are sun dials that can be used to tell time accurately.']
  }
];
