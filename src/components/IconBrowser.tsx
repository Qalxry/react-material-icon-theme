import React, { useState, useMemo } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { getAllIconsWithCategories, searchIcons, type IconInfo } from '../utils/iconMatcher';

export interface IconBrowserProps {
  /**
   * Maximum number of icons to display
   */
  maxIcons?: number;
  
  /**
   * Search filter
   */
  searchFilter?: string;
  
  /**
   * Icon size
   */
  iconSize?: number;
  
  /**
   * Whether to show icon names
   */
  showNames?: boolean;
  
  /**
   * Grid columns
   */
  columns?: number;
  
  /**
   * Active icon pack
   */
  iconPack?: string;
  
  /**
   * Callback when an icon is clicked
   */
  onIconClick?: (iconInfo: IconInfo) => void;
}

export function IconBrowser({
  maxIcons = 200,
  searchFilter = '',
  iconSize = 32,
  showNames = true,
  columns = 8,
  iconPack = 'angular',
  onIconClick,
}: IconBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { categories, filteredIcons } = useMemo(() => {
    const allCategories = getAllIconsWithCategories(iconPack);
    
    let icons: IconInfo[] = [];
    
    if (searchFilter.trim()) {
      // If searching, show search results
      icons = searchIcons(searchFilter, iconPack);
    } else if (selectedCategory === 'all') {
      // Show all icons
      icons = allCategories.flatMap(category => category.icons);
    } else {
      // Show specific category
      const category = allCategories.find(cat => cat.name === selectedCategory);
      icons = category ? category.icons : [];
    }
    
    return {
      categories: allCategories,
      filteredIcons: icons.slice(0, maxIcons),
    };
  }, [selectedCategory, searchFilter, iconPack, maxIcons]);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '16px',
    padding: '16px',
  };

  const iconItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '4px',
    cursor: onIconClick ? 'pointer' : 'default',
    transition: 'background-color 0.2s',
    border: '1px solid transparent',
  };

  const iconItemHoverStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  };

  const controlsStyle: React.CSSProperties = {
    marginBottom: '16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const selectStyle: React.CSSProperties = {
    marginLeft: '8px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  return (
    <div>
      <div style={controlsStyle}>
        <label>
          Category:
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="all">All Icons ({categories.reduce((sum, cat) => sum + cat.icons.length, 0)})</option>
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.description} ({category.icons.length})
              </option>
            ))}
          </select>
        </label>
        
        <span style={{ color: '#666' }}>
          Showing {filteredIcons.length} icons
          {searchFilter && ` matching "${searchFilter}"`}
        </span>
      </div>
      
      {/* Category breakdown when showing all */}
      {selectedCategory === 'all' && !searchFilter && (
        <div style={{ marginBottom: '24px' }}>
          {categories.map(category => (
            <div key={category.name} style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                marginBottom: '16px', 
                color: '#333',
                borderBottom: '2px solid #eee',
                paddingBottom: '8px'
              }}>
                {category.description} ({category.icons.length})
              </h3>
              <div style={gridStyle}>
                {category.icons.slice(0, 20).map((iconInfo) => (
                  <div
                    key={`${category.name}-${iconInfo.name}`}
                    style={iconItemStyle}
                    onClick={() => onIconClick?.(iconInfo)}
                    onMouseEnter={(e) => {
                      if (onIconClick) {
                        Object.assign(e.currentTarget.style, iconItemHoverStyle);
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    title={iconInfo.description || iconInfo.name}
                  >
                    <MaterialIcon 
                      name={iconInfo.iconName} 
                      size={iconSize}
                      style={{ marginBottom: showNames ? '4px' : '0' }}
                    />
                    {showNames && (
                      <span style={{ 
                        fontSize: '10px', 
                        textAlign: 'center', 
                        wordBreak: 'break-word',
                        color: '#666',
                        maxWidth: '80px',
                        lineHeight: '1.2'
                      }}>
                        {iconInfo.name}
                      </span>
                    )}
                  </div>
                ))}
                {category.icons.length > 20 && (
                  <div style={{
                    ...iconItemStyle,
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '12px',
                  }}
                  onClick={() => setSelectedCategory(category.name)}
                  >
                    <div style={{
                      width: iconSize,
                      height: iconSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #ccc',
                      borderRadius: '4px',
                      marginBottom: showNames ? '4px' : '0'
                    }}>
                      +{category.icons.length - 20}
                    </div>
                    {showNames && (
                      <span style={{ 
                        fontSize: '10px', 
                        textAlign: 'center',
                        color: '#666',
                      }}>
                        View all
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Single category or search results */}
      {(selectedCategory !== 'all' || searchFilter) && (
        <div style={gridStyle}>
          {filteredIcons.map((iconInfo) => (
            <div
              key={iconInfo.name}
              style={iconItemStyle}
              onClick={() => onIconClick?.(iconInfo)}
              onMouseEnter={(e) => {
                if (onIconClick) {
                  Object.assign(e.currentTarget.style, iconItemHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              title={iconInfo.description || iconInfo.name}
            >
              <MaterialIcon 
                name={iconInfo.iconName} 
                size={iconSize}
                style={{ marginBottom: showNames ? '4px' : '0' }}
              />
              {showNames && (
                <span style={{ 
                  fontSize: '10px', 
                  textAlign: 'center', 
                  wordBreak: 'break-word',
                  color: '#666',
                  maxWidth: '80px',
                  lineHeight: '1.2'
                }}>
                  {iconInfo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      
      {filteredIcons.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          fontSize: '14px',
          padding: '32px' 
        }}>
          {searchFilter ? `No icons found matching "${searchFilter}"` : 'No icons to display'}
        </div>
      )}
    </div>
  );
}