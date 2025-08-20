interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search icons..."
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <img 
          src="icons/search.svg" 
          alt="Search"
          className="search-icon"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {value && (
          <button
            onClick={onClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <img 
              src="icons/x.svg" 
              alt="Clear"
            />
          </button>
        )}
      </div>
    </div>
  );
}
