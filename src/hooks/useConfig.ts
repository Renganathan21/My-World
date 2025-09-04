import { useState, useEffect } from 'react';

interface Config {
  siteTitle: string;
  primaryColor: string;
  themes: string[];
  header: {
    logo: string;
    title: string;
    showSearch: boolean;
  };
  genres: string[];
}

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  excerpt: string;
  coverImage: string;
  pages: Array<{
    id: number;
    content: Array<{
      type: 'heading' | 'subheading' | 'text' | 'image';
      value?: string;
      src?: string;
      alt?: string;
      caption?: string;
      placement: 'left' | 'center' | 'right' | 'justify';
    }>;
  }>;
}

interface Poetry {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  lines: string[];
}

interface ConfigData {
  config: Config;
  stories: Story[];
  poetries: Poetry[];
}

export const useConfig = () => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Fetch from public folder
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error('Failed to load configuration');
        }
        const data: ConfigData = await response.json();
        setConfigData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load configuration');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { configData, loading, error };
};
