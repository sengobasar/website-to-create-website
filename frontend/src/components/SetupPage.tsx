import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import {
  Briefcase,
  ShoppingCart,
  BookOpen,
  Users,
  User,
  UtensilsCrossed,
  Rocket,
  Palette,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { generateWebsite } from '../services/api';
import { useWebsite } from '../contexts/WebsiteContext';

type WebsiteType = 
  | 'portfolio' 
  | 'business' 
  | 'ecommerce' 
  | 'blog' 
  | 'agency' 
  | 'personal' 
  | 'restaurant' 
  | 'landing';

type ColorTheme = 'purple-blue' | 'green-teal' | 'black-white';

const websiteTypes = [
  { id: 'portfolio' as WebsiteType, label: 'Portfolio', icon: Palette },
  { id: 'business' as WebsiteType, label: 'Business', icon: Briefcase },
  { id: 'ecommerce' as WebsiteType, label: 'Ecommerce', icon: ShoppingCart },
  { id: 'blog' as WebsiteType, label: 'Blog', icon: BookOpen },
  { id: 'agency' as WebsiteType, label: 'Agency', icon: Users },
  { id: 'personal' as WebsiteType, label: 'Personal', icon: User },
  { id: 'restaurant' as WebsiteType, label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'landing' as WebsiteType, label: 'Landing Page', icon: Rocket },
];

export function SetupPage() {
  const navigate = useNavigate();
  const { setWebsite, setWebsiteData } = useWebsite();
  const [selectedType, setSelectedType] = useState<WebsiteType | null>(null);
  const [description, setDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map theme to backend format
  const getThemeForBackend = (theme: ColorTheme): string => {
    const themeMap: Record<ColorTheme, string> = {
      'purple-blue': 'Purple/Blue',
      'green-teal': 'Green/Teal',
      'black-white': 'Black/White',
    };
    return themeMap[theme];
  };

  // Map website type to backend format (capitalize first letter)
  const getTypeForBackend = (type: WebsiteType): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleContinue = async () => {
    if (!selectedType || !selectedTheme || !description.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await generateWebsite({
        type: getTypeForBackend(selectedType),
        description: description.trim(),
        theme: getThemeForBackend(selectedTheme),
      });

      if (response.success && response.website) {
        setWebsite(response.website);
        setWebsiteData({
          type: getTypeForBackend(selectedType),
          description: description.trim(),
          theme: getThemeForBackend(selectedTheme),
        });
        navigate('/preview');
      } else {
        setError(response.error || 'Failed to generate website');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-12 max-w-md text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Building your website...
              </h2>
              <p className="text-slate-600">
                Our AI is crafting your perfect website. This may take a moment.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let's build your website
          </h1>
          <p className="text-xl text-slate-600">
            Answer a few quick questions to personalize your site.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="p-8 md:p-12 rounded-3xl border-0 bg-white shadow-2xl shadow-slate-300/50">
          <div className="space-y-12">
            {/* Section 1: Website Type Selection */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-slate-900">Choose your website type</h2>
                <p className="text-slate-600">
                  Select the category that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {websiteTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`
                        p-6 rounded-2xl border-2 transition-all duration-200
                        flex flex-col items-center gap-3
                        ${isSelected 
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg shadow-purple-500/20' 
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                        ${isSelected 
                          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'bg-slate-100 text-slate-600'
                        }
                      `}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Description */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-slate-900">Tell us about your project</h2>
                <p className="text-slate-600">
                  Describe your business, brand, or idea
                </p>
              </div>

              <Textarea
                placeholder="Describe your business, brand, or idea…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[140px] rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none p-4 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Section 3: Color Theme */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-slate-900">Pick your color theme</h2>
                <p className="text-slate-600">
                  Choose a color palette for your website
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Purple/Blue Gradient Theme */}
                <button
                  onClick={() => setSelectedTheme('purple-blue')}
                  className={`
                    p-8 rounded-2xl border-2 transition-all duration-200
                    ${selectedTheme === 'purple-blue'
                      ? 'border-purple-500 shadow-xl shadow-purple-500/30'
                      : 'border-slate-200 hover:border-purple-300 hover:shadow-lg'
                    }
                  `}
                >
                  <div className="space-y-4">
                    <div className="h-24 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 shadow-lg"></div>
                    <div className="text-center">
                      <div className="text-slate-900">Purple/Blue</div>
                      <div className="text-sm text-slate-500">Modern gradient</div>
                    </div>
                  </div>
                </button>

                {/* Green/Teal Theme */}
                <button
                  onClick={() => setSelectedTheme('green-teal')}
                  className={`
                    p-8 rounded-2xl border-2 transition-all duration-200
                    ${selectedTheme === 'green-teal'
                      ? 'border-green-500 shadow-xl shadow-green-500/30'
                      : 'border-slate-200 hover:border-green-300 hover:shadow-lg'
                    }
                  `}
                >
                  <div className="space-y-4">
                    <div className="h-24 rounded-xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 shadow-lg"></div>
                    <div className="text-center">
                      <div className="text-slate-900">Green/Teal</div>
                      <div className="text-sm text-slate-500">Fresh & natural</div>
                    </div>
                  </div>
                </button>

                {/* Black/White Minimal Theme */}
                <button
                  onClick={() => setSelectedTheme('black-white')}
                  className={`
                    p-8 rounded-2xl border-2 transition-all duration-200
                    ${selectedTheme === 'black-white'
                      ? 'border-slate-900 shadow-xl shadow-slate-500/30'
                      : 'border-slate-200 hover:border-slate-400 hover:shadow-lg'
                    }
                  `}
                >
                  <div className="space-y-4">
                    <div className="h-24 rounded-xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-600 shadow-lg"></div>
                    <div className="text-center">
                      <div className="text-slate-900">Black/White</div>
                      <div className="text-sm text-slate-500">Minimal elegance</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-8 px-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="lg"
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to homepage
          </Button>

          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl shadow-purple-500/30 rounded-xl px-8"
            disabled={!selectedType || !selectedTheme || !description.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
