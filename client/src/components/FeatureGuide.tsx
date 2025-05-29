
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin, Clock, Route, Smartphone, Navigation, CreditCard } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function HelpModal() {
  const { t } = useTranslation();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          {t('nav.help')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t('help.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('help.stops.title')}</h3>
                <p className="text-sm text-gray-600 mb-2">{t('help.stops.description')}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t('help.stops.features').map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('help.times.title')}</h3>
                <p className="text-sm text-gray-600 mb-2">{t('help.times.description')}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t('help.times.features').map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Route className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('help.directions.title')}</h3>
                <p className="text-sm text-gray-600 mb-2">{t('help.directions.description')}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t('help.directions.features').map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('help.mobile.title')}</h3>
                <p className="text-sm text-gray-600 mb-2">{t('help.mobile.description')}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t('help.mobile.features').map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('help.payment.title')}</h3>
                <p className="text-sm text-gray-600 mb-2">{t('help.payment.description')}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {t('help.payment.features').map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
              <Navigation className="w-4 h-4" />
              <span className="font-medium">{t('help.tip.title')}</span>
              <span>{t('help.tip.description')}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
