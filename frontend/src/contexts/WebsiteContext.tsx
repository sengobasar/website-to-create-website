import { createContext, useContext, useState, ReactNode } from 'react';

interface WebsiteContextType {
  website: string | null;
  setWebsite: (website: string | null) => void;
  websiteData: {
    type: string;
    description: string;
    theme: string;
  } | null;
  setWebsiteData: (data: { type: string; description: string; theme: string } | null) => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [website, setWebsite] = useState<string | null>(null);
  const [websiteData, setWebsiteData] = useState<{
    type: string;
    description: string;
    theme: string;
  } | null>(null);

  return (
    <WebsiteContext.Provider
      value={{
        website,
        setWebsite,
        websiteData,
        setWebsiteData,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}


