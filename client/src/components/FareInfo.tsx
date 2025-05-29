import { Card, CardContent } from "@/components/ui/card";
import { Coins, CreditCard, Luggage } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function FareInfo() {
  const { t } = useTranslation();
  
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{t('fare.title')}</h2>
          <p className="text-gray-600">{t('fare.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-md text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center mx-auto mb-3">
                <Coins className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('fare.pricing.title')}</h3>
              <p className="text-gray-600 mb-3 text-sm">{t('fare.pricing.description')}</p>
              <div className="text-xl font-bold text-ocean">{t('fare.pricing.amount')}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-tropical rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('fare.payment.title')}</h3>
              <p className="text-gray-600 mb-3 text-sm">{t('fare.payment.description')}</p>
              <div className="text-base font-medium text-gray-700">{t('fare.payment.method')}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center mx-auto mb-3">
                <Luggage className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('fare.luggage.title')}</h3>
              <p className="text-gray-600 mb-3 text-sm">{t('fare.luggage.description')}</p>
              <div className="text-base font-medium text-gray-700">{t('fare.luggage.cost')}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
