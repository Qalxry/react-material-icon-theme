import React from 'react';
import { MaterialIcon, MaterialIconProps } from './MaterialIcon';
import { getFileIcon } from '../utils/iconMatcher';

export interface FileIconProps extends Omit<MaterialIconProps, 'name'> {
  /**
   * File name with extension (e.g., 'app.tsx', 'package.json')
   */
  fileName?: string;
  
  /**
   * File extension (e.g., 'tsx', 'json')
   */
  fileExtension?: string;
  
  /**
   * Language ID for the file (e.g., 'typescript', 'javascript')
   */
  languageId?: string;
  
  /**
   * Fallback icon name if no match is found
   */
  fallback?: string;
  
  /**
   * Active icon pack
   */
  iconPack?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({
  fileName,
  fileExtension,
  languageId,
  fallback = 'file',
  iconPack = 'angular',
  ...iconProps
}) => {
  const iconName = getFileIcon({
    fileName,
    fileExtension,
    languageId,
    fallback,
    iconPack,
  });

  return <MaterialIcon name={iconName} {...iconProps} />;
};

export default FileIcon;
