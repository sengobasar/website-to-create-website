import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Sparkles, 
  Layout, 
  MousePointerClick, 
  Rocket,
  Star,
  Users
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">BuildAI</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Templates
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Docs
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            onClick={() => navigate('/setup')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 rounded-xl px-6"
          >
            Start Building
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 rounded-full px-4 py-1.5 shadow-sm"
            >
              ✨ Powered by AI
            </Badge>

            {/* Title with Gradient */}
            <h1 className="text-5xl md:text-7xl tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Create websites instantly with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-600 max-w-lg">
              A simple tool that lets anyone design websites in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/setup')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl shadow-purple-500/30 rounded-xl px-8 py-6"
              >
                Start building
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:border-purple-300 hover:bg-purple-50 rounded-xl px-8 py-6"
              >
                Watch demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-slate-900">10k+</div>
                  <div className="text-sm text-slate-500">websites created</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
                </div>
                <div>
                  <div className="text-slate-900">4.9/5</div>
                  <div className="text-sm text-slate-500">rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Preview Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-purple-500/20 p-4 border border-slate-200/50">
              <img
                src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MzkwNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Product Preview"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Powerful features for everyone
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to create stunning websites in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-8 rounded-3xl border-0 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-slate-900">AI Website Generator</h3>
              <p className="text-slate-600">
                Generate complete websites from a simple description in seconds
              </p>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-8 rounded-3xl border-0 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Layout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-slate-900">Smart Templates</h3>
              <p className="text-slate-600">
                Beautiful, responsive templates that adapt to your content
              </p>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-8 rounded-3xl border-0 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <MousePointerClick className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-slate-900">Drag-and-drop Editing</h3>
              <p className="text-slate-600">
                Customize every element with intuitive drag-and-drop interface
              </p>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-8 rounded-3xl border-0 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-slate-900">Instant Publishing</h3>
              <p className="text-slate-600">
                Deploy your website instantly with one click to the cloud
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Extra spacing at bottom */}
      <div className="h-20"></div>
    </div>
  );
}
