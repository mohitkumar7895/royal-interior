export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'https://royalproindustrial.in'
).replace(/\/$/, '');

export const SITE_CONFIG = {
  websiteName: 'Royalpro Industrial',
  name: 'Royalpro Industrial',
  fullName: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
  legalName: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
  shortName: 'Royalpro Industrial',
  title: 'Royalpro Industrial | Factory Tin Shed Work & Complete Interior Solution',
  description:
    'Royalpro Industrial - Specialists in Heavy Duty Industrial Factory Sheds, PEB Steel Structure Work, All Welding Work, Cold Storage, Sports Academies, and Complete Interior Solutions (Office, Luxury Home, Modular Kitchens). Call 9557323216.',
  phone: '9557323216',
  telephone: '+919557323216',
  email: 'contact@royalproindustrial.com',
  logoUrl: `${SITE_URL}/images/royalpro_logo.png`,
  address: {
    streetAddress: 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera',
    addressLocality: 'Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201009',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 28.628,
    longitude: 77.439,
  },
  googleSiteVerification: 'googleb46a16958a20877d',
  keywords: [
    'Industrial Factory Tin Shed',
    'Factory Tin Shed Fabrication',
    'All Welding Work Services',
    'PEB Steel Structure Manufacturer',
    'Cold Store Structure Work',
    'Badminton Academy Shed Fabrication',
    'Heavy Metal Fabrication',
    'Tensile Structure Work',
    'Commercial Rolling Shutter',
    'SS MS Railing Work',
    'Complete Interior Solution',
    'Office Interior Work',
    'Home Interior Work',
    'Modular Kitchen Fabrication',
    'Gypsum False Ceiling Work',
    'Aluminium Glass Work',
    'ACP HPL Elevation Work',
    'Ghaziabad',
    'Noida',
    'Delhi NCR',
    'Royalpro Industrial',
  ],
};
