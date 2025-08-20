import React, { useState } from 'react';
import { MaterialIcon } from '../../components/MaterialIcon';
import { IconInfo } from './IconCard';

interface IconModalProps {
  icon: IconInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IconModal({
  icon,
  isOpen,
  onClose
}: IconModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen || !icon) return null;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const usageExamples = [
    {
      title: 'React Component',
      code: `<MaterialIcon name="${icon.name}" size={24} />`,
      language: 'jsx'
    },
    {
      title: 'With FileIcon Component',
      code: icon.category === 'files' 
        ? `<FileIcon fileName="example.${icon.matchedTerms[0] || 'txt'}" size={24} />`
        : `<FileIcon fileExtension="${icon.matchedTerms[0] || 'txt'}" size={24} />`,
      language: 'jsx'
    },
    {
      title: 'With Custom Props',
      code: `<MaterialIcon 
  name="${icon.name}" 
  size={32}
  color="#1976d2"
  opacity={0.8}
/>`,
      language: 'jsx'
    }
  ];

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h2>{icon.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <img 
              src="https://unpkg.com/lucide-static@0.540.0/icons/x.svg"
              alt="Close"
            />
          </button>
        </div>

        <div className="modal-content">
          <div className="icon-preview-section">
            <div className="icon-preview-large">
              <MaterialIcon name={icon.name} size={64} />
            </div>
            
            <div className="icon-sizes">
              {[16, 24, 32, 48].map(size => (
                <div key={size} className="size-variant">
                  <MaterialIcon name={icon.name} size={size} />
                  <span>{size}px</span>
                </div>
              ))}
            </div>
          </div>

          <div className="icon-details">
            <div className="detail-section">
              <h3>Category</h3>
              <span className={`category-badge ${icon.category}`}>
                {icon.category}
              </span>
            </div>

            {icon.matchedTerms.length > 0 && (
              <div className="detail-section">
                <h3>Matched Terms</h3>
                <div className="matched-terms">
                  {icon.matchedTerms.map((term, index) => (
                    <span key={index} className="matched-term">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-section">
              <h3>Usage Examples</h3>
              <div className="usage-examples">
                {usageExamples.map((example, index) => (
                  <div key={index} className="usage-example">
                    <div className="example-header">
                      <h4>{example.title}</h4>
                      <button
                        className={`copy-code-button ${copiedText === example.title ? 'copied' : ''}`}
                        onClick={() => copyToClipboard(example.code, example.title)}
                      >
                        <img 
                          src={`https://unpkg.com/lucide-static@0.540.0/icons/${copiedText === example.title ? 'check' : 'copy'}.svg`}
                          alt="Copy"
                        />
                        {copiedText === example.title ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="code-block">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
