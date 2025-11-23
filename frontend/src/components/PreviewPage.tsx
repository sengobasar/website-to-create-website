import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useWebsite } from '../contexts/WebsiteContext';
import { ArrowLeft, Download, RefreshCw, Sparkles } from 'lucide-react';

export function PreviewPage() {
  const navigate = useNavigate();
  const { website, websiteData, setWebsite, setWebsiteData } = useWebsite();

  const handleDownload = () => {
    if (!website) return;

    // Create a complete HTML document
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    ${website}
</body>
</html>`;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = () => {
    setWebsite(null);
    setWebsiteData(null);
    navigate('/setup');
  };

  if (!website) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center space-y-4">
            <Sparkles className="w-12 h-12 mx-auto text-purple-600" />
            <h2 className="text-2xl font-semibold text-slate-900">No website found</h2>
            <p className="text-slate-600">Please generate a website first.</p>
            <Button onClick={() => navigate('/setup')} className="w-full">
              Go to Setup
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-900 font-semibold">Website Preview</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleRegenerate}
                variant="outline"
                className="border-2 border-slate-300 hover:border-purple-300 hover:bg-purple-50 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Website
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200/50 overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: website }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

