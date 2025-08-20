import React, { useState } from "react";
import { MaterialIcon } from "react-material-icon-theme";

export interface IconInfo {
  name: string;
  categories: ("files" | "folders" | "languages")[];
  matchedTerms: string[];
  description?: string;
}

interface IconCardProps {
  icon: IconInfo;
  size?: number;
  onClick?: (icon: IconInfo) => void;
}

export function IconCard({ icon, size = 32, onClick }: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(icon.name);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClick = () => {
    onClick?.(icon);
  };

  return (
    <div
      className={`icon-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="icon-preview">
        <MaterialIcon name={icon.name} size={size} alt={`${icon.name} icon`} />
      </div>

      <div className="icon-info">
        <div className="icon-name" title={icon.name}>
          {icon.name}
        </div>

        {icon.matchedTerms.length > 0 && (
          <div className="icon-tags">
            {icon.matchedTerms.slice(0, 1).map((term, index) => (
              <span key={index} className="icon-tag">
                {term}
              </span>
            ))}
            {icon.matchedTerms.length > 1 && <span className="icon-tag more">+{icon.matchedTerms.length - 1}</span>}
          </div>
        )}
      </div>

      {isHovered && (
        <div className="icon-actions">
          <button className={`copy-button ${isCopied ? "copied" : ""}`} onClick={handleCopy} title="Copy icon name">
            <img src={`/icons/${isCopied ? "check" : "copy"}.svg`} alt={isCopied ? "Copied" : "Copy"} />
          </button>
        </div>
      )}
    </div>
  );
}
