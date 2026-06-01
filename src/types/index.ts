

export interface Educator {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  institution: string;
  image: string;
}

export interface BundlePackage {
  id: string;
  title: string;
  isPopular?: boolean;
  features: string[];
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to pick the lucide-react icon dynamically or we can just pass strings
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface FeatureColumn {
  title: string;
  description: string;
  iconName: string;
}
