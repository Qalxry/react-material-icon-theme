import React, { CSSProperties, useMemo } from "react";
import { getIconSvg, hasIcon } from "../iconData";

export interface MaterialIconProps {
  /**
   * The name of the icon (without file extension)
   */
  name: string;

  /**
   * Size of the icon in pixels
   */
  size?: number | string;

  /**
   * Color of the icon
   */
  color?: string;

  /**
   * Opacity of the icon (0-1)
   */
  opacity?: number;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional CSS styles
   */
  style?: CSSProperties;

  /**
   * Alt text for accessibility
   */
  alt?: string;

  /**
   * Whether to use light theme variant if available
   */
  light?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function MaterialIcon({
  name,
  size = 24,
  color,
  opacity = 1,
  className = "",
  style = {},
  alt,
  light = false,
  onClick,
}: MaterialIconProps) {
  // Determine the icon name with light variant
  const iconName = light && hasIcon(`${name}_light`) ? `${name}_light` : name;

  // Get and process the SVG content
  const svgContent = useMemo(() => {
    const rawSvg = getIconSvg(iconName);
    if (!rawSvg) return null;

    // If no color customization is needed, return the original SVG
    if (!color) return rawSvg;

    // Process the SVG content to apply color
    let processedContent = rawSvg;

    // Replace existing fill attributes
    processedContent = processedContent.replace(/fill="[^"]*"/g, `fill="${color}"`);

    // Add fill attribute to paths that don't have one
    processedContent = processedContent.replace(/<path(?![^>]*fill=)/g, `<path fill="${color}"`);

    // Add fill attribute to other shape elements if they don't have one
    processedContent = processedContent.replace(
      /<(rect|circle|ellipse|polygon|polyline)(?![^>]*fill=)/g,
      `<$1 fill="${color}"`
    );

    return processedContent;
  }, [iconName, color]);

  const iconStyle: CSSProperties = {
    width: size,
    height: size,
    opacity,
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  // Icon not found
  if (!svgContent) {
    return (
      <div
        className={`material-icon material-icon-error ${className}`}
        style={iconStyle}
        title={alt || `${name} icon (not found)`}
      >
        📄
      </div>
    );
  }

  return (
    <div
      className={`material-icon ${className}`}
      style={iconStyle}
      title={alt || `${name} icon`}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

export default MaterialIcon;
