export type Currency = 'USD' | 'ARS';

export type Money = {
  amount: number;
  currency: Currency;
};

export type Operation = 'venta' | 'alquiler';
export type PropertyType = 'casa' | 'departamento' | 'ph' | 'terreno' | 'local' | 'oficina';

export type Address = {
  street: string;
  neighborhood: string;
  city: string;
  province: string;
  lat: number;
  lng: number;
};

export type Specs = {
  ambientes: number;
  dormitorios: number;
  baños: number;
  cocheras: number;
  antiguedad: number;
  orientacion: string;
  estado: string;
};

export type Areas = {
  cubierta: number;
  semicubierta: number;
  descubierta: number;
  total: number;
};

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  focalX?: number;
  focalY?: number;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  officeId: string;
  phone: string;
  whatsapp: string;
  email: string;
  photoUnsplashId: string;
  bio: string;
};

export type Office = {
  id: string;
  name: string;
  province: string;
  region: string;
  address: string;
  phone: string;
  email: string;
};

export type Amenity = {
  key: string;
  label: string;
};

export type Listing = {
  id: string;
  slug: string;
  operation: Operation;
  propertyType: PropertyType;
  title: string;
  price: Money;
  priceARS?: Money;
  expensas?: Money;
  address: Address;
  specs: Specs;
  areas: Areas;
  amenities: string[];
  description: string;
  gallery: Photo[];
  agentId: string;
  officeId: string;
  publishedAt: string;
  updatedAt: string;
  videoTourUrl?: string;
  floorPlanUrl?: string;
};

export type FeaturedCard = {
  id: string;
  slug: string;
  operation: Operation;
  propertyType: PropertyType;
  title: string;
  neighborhood: string;
  province: string;
  price: Money;
  specsShort: { ambientes: number; dormitorios: number; baños: number; cubierta: number };
  photoUnsplashId: string;
  photoAlt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  role: 'cliente' | 'broker' | 'franquiciado';
  neighborhood?: string;
  photoUnsplashId?: string;
};

export type BlogCard = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  photoUnsplashId: string;
};

export type SocialLink = {
  network: 'instagram' | 'facebook' | 'linkedin' | 'x';
  handle: string;
  url: string;
};

export type Region = {
  key: string;
  label: string;
  group: 'Buenos Aires' | 'Noroeste' | 'Noreste' | 'Centro' | 'Sur';
};

export type Country = {
  code: string;
  name: string;
};
