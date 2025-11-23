import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebsiteProvider } from './contexts/WebsiteContext';
import { LandingPage } from './components/LandingPage';
import { SetupPage } from './components/SetupPage';
import { PreviewPage } from './components/PreviewPage';

export default function App() {
  return (
    <WebsiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </WebsiteProvider>
  );
}
