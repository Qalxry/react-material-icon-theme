// Components
export * from "./components";

// Icon Data
export * from "./iconData";

// Context
export * from "./context/IconThemeContext";

// Utils
export * from "./utils/iconMatcher";

// Core types (re-exported for advanced usage)
export type { FileIcon as FileIconType } from "./core/models/icons/files/fileIcon";
export type { FolderIcon as FolderIconType } from "./core/models/icons/folders/folderIcon";
export type { LanguageIcon as LanguageIconType } from "./core/models/icons/languages/languageIdentifier";
export type { Config, IconAssociations } from "./core/models/icons/config";
export { IconPack } from "./core/models/icons/iconPack";
export type { IconPackValue } from "./core/models/icons/iconPack";

// Icon data
export { fileIcons } from "./core/icons/fileIcons";
export { folderIcons } from "./core/icons/folderIcons";
export { languageIcons } from "./core/icons/languageIcons";
