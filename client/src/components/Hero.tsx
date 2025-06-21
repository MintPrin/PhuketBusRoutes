import { useTranslation } from "@/hooks/useTranslation";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero-section relative py-12 bg-gradient-to-br from-blue-500 to-cyan-500">
      {/* Simplified background with minimal animations */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-300/10"></div>
      
      {/* Reduced floating elements for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-24 h-24 bg-yellow-200/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-300/15 rounded-full blur-2xl"></div>
      </div>
      
      <div className="hero-content max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="hero-title text-3xl md:text-4xl font-bold mb-3 text-white">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle text-lg mb-8 max-w-2xl mx-auto text-white/95">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
