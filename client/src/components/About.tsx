import { Info, BookOpen, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50" data-section="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('about.title')}</h2>
        </div>

        <div className="space-y-6">
          {/* Story Card */}
          <Card className="shadow-lg border-l-4 border-ocean">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center">
                  <Info className="w-6 h-6 text-ocean" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('about.story.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.story.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sources Card */}
          <Card className="shadow-lg border-l-4 border-tropical">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-tropical/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-tropical" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('about.sources.title')}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {t('about.sources.description')}
                  </p>
                  <ul className="space-y-2">
                    {(t('about.sources.list') as string[]).map((source, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-tropical mt-1">•</span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates Card */}
          <Card className="shadow-lg border-l-4 border-sunset">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-sunset" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('about.updates.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.updates.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
