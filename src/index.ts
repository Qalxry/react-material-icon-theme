// Components
export { MaterialIcon } from './components/MaterialIcon';
export type { MaterialIconProps } from './components/MaterialIcon';

// Icon Data
export { iconData, availableIcons, getIconSvg, hasIcon } from './iconData';
export type { IconData } from './iconData';

// Context
export { IconThemeProvider, useIconThemeContext } from './context/IconThemeContext';
export type { IconThemeProviderProps } from './context/IconThemeContext';

// Utils
export {
  getFileIcon,
  getFolderIcon,
  getAvailableFileExtensions,
  getAvailableFileNames,
  getAvailableFolderNames,
  getAvailableLanguageIds,
} from './utils/iconMatcher';
export type { GetFileIconOptions, GetFolderIconOptions } from './utils/iconMatcher';

// Core types (re-exported for advanced usage)
export type { FileIcon as FileIconType } from './core/models/icons/files/fileIcon';
export type { FolderIcon as FolderIconType } from './core/models/icons/folders/folderIcon';
export type { LanguageIcon } from './core/models/icons/languages/languageIdentifier';
export type { Config, IconAssociations } from './core/models/icons/config';
export { IconPack } from './core/models/icons/iconPack';
export type { IconPackValue } from './core/models/icons/iconPack';

// Icon data
export { fileIcons } from './core/icons/fileIcons';
export { folderIcons } from './core/icons/folderIcons';
export { languageIcons } from './core/icons/languageIcons';
