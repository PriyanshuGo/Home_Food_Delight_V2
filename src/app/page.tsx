import HeroPage from '@/components/HeroPage';
import OrderProcess from '@/components/OrderProcess';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Homepage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroPage />

      {/* How It Works */}
      <OrderProcess />

      

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}