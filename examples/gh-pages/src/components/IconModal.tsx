import { useState, useEffect } from "react";
import { MaterialIcon, getIconSvg } from "react-material-icon-theme";
import { type IconInfo } from "./IconCard";

interface IconModalProps {
  icon: IconInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IconModal({ icon, isOpen, onClose }: IconModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [svgCode, setSvgCode] = useState<string>("");

  // Get SVG code when modal opens
  useEffect(() => {
    if (icon) {
      const svg = getIconSvg(icon.name);
      setSvgCode(svg || "");
    }
  }, [icon]);

  if (!isOpen || !icon) return null;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const usageExamples = [
    {
      title: "Raw SVG Code",
      code: svgCode,
      language: "html",
    },
    {
      title: "React Component",
      code: `<MaterialIcon name="${icon.name}" size={24} />`,
      language: "jsx",
    },
  ];

  if (icon.categories.includes("files")) {
    const tmp = icon.matchedTerms.sort((a, b) => (a.length < b.length ? -1 : 1))[0];
    usageExamples.push({
      title: "With FileIcon Component",
      code: `<FileIcon fileName="${tmp.startsWith(".") ? `example${tmp}` : `example.${tmp}`}" size={24} />`,
      language: "jsx",
    });
  }

  if (icon.categories.includes("folders")) {
    const tmp = icon.matchedTerms.sort((a, b) => (a.length < b.length ? -1 : 1))[0];
    usageExamples.push({
      title: "With FolderIcon Component",
      code: `<FolderIcon folderName="${tmp || "default_folder"}" size={24} />`,
      language: "jsx",
    });
  }

  if (icon.categories.includes("languages")) {
    usageExamples.push({
      title: "With LanguageIcon Component",
      code: `<LanguageIcon language="${icon.matchedTerms
        .sort((a, b) => (a.length > b.length ? -1 : 1))
        .find((term) => !term.includes("."))}" size={24} />`,
      language: "jsx",
    });
  }

  usageExamples.push({
    title: "With Custom Props",
    code: `<MaterialIcon
  name="${icon.name}"
  size={32}
  color="#1976d2"
  opacity={0.8}
/>`,
    language: "jsx",
  });

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h2>{icon.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <img src="/icons/x.svg" alt="Close" />
          </button>
        </div>

        <div className="modal-content">
          <div className="icon-preview-section">
            <div className="icon-preview-large">
              <MaterialIcon name={icon.name} size={64} />
            </div>

            <div className="icon-sizes">
              {[16, 24, 32, 48].map((size) => (
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
              {icon.categories.map((category, index) => (
                <span key={index} className={`category-badge ${category}`}>
                  {category}
                </span>
              ))}
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
                        className={`copy-code-button ${copiedText === example.title ? "copied" : ""}`}
                        onClick={() => copyToClipboard(example.code, example.title)}
                      >
                        <img src={`/icons/${copiedText === example.title ? "check" : "copy"}.svg`} alt="Copy" />
                        {copiedText === example.title ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <pre className={`code-block ${example.title === "Raw SVG Code" ? "svg-code" : ""}`}>
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
