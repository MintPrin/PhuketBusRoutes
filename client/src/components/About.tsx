import { Info, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-6 bg-gradient-to-br from-blue-50 to-cyan-50" data-section="about">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md border-l-4 border-ocean">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-ocean/10 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-ocean" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('about.title')}</h2>
                <p className="text-sm text-gray-700 leading-snug">
                  {t('about.description')}
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 mb-3 pl-11">
              {t('about.sources')}
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{t('about.feedback.title')}</h3>
                <p className="text-xs text-gray-500 italic">{t('about.feedback.description')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
