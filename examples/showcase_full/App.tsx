import React, { useState, useMemo, useEffect } from 'react';
import { IconThemeProvider } from "react-material-icon-theme";
import { SearchBar } from './components/SearchBar';
import { FilterTabs, FilterCategory } from './components/FilterTabs';
import { IconGrid } from './components/IconGrid';
import { IconModal } from './components/IconModal';
import { IconInfo } from './components/IconCard';
import { getAllIcons, getIconsByCategory } from './utils/iconData';
import './styles.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedIcon, setSelectedIcon] = useState<IconInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const allIcons = useMemo(() => getAllIcons(), []);

  const filteredIcons = useMemo(() => {
    if (activeCategory === 'all') {
      return allIcons;
    }
    return getIconsByCategory(activeCategory);
  }, [allIcons, activeCategory]);

  const categoryBadNumbers = useMemo(() => {
    const counts = {
      all: allIcons.length,
      files: 0,
      folders: 0,
      languages: 0,
    };

    allIcons.forEach(icon => {
      counts[icon.category]++;
    });

    return counts;
  }, [allIcons]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIconClick = (icon: IconInfo) => {
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIcon(null);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <IconThemeProvider>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1>Material Icon Theme</h1>
            <p>
              Beautiful Material Design icons for React applications, 
              extracted from VS Code Material Icon Theme
            </p>
          </div>
        </header>

        <main className="main-content">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleSearchClear}
            placeholder="Search icons by name, extension, or keyword..."
          />

          <FilterTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={categoryBadNumbers}
          />

          <IconGrid
            icons={filteredIcons}
            searchQuery={searchQuery}
            onIconClick={handleIconClick}
            loading={loading}
          />
        </main>

        <IconModal
          icon={selectedIcon}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </IconThemeProvider>
  );
}

export default App;
