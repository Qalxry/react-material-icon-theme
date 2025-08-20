import { fileIcons } from "../core/icons/fileIcons";
import { folderIcons } from "../core/icons/folderIcons";
import { languageIcons } from "../core/icons/languageIcons";
import type { FileIcon as FileIconType } from "../core/models/icons/files/fileIcon";
import type { FolderIcon as FolderIconType } from "../core/models/icons/folders/folderIcon";
import type { LanguageIcon as LanguageIconType } from "../core/models/icons/languages/languageIdentifier";

export interface GetFileIconOptions {
  fileName?: string;
  fileExtension?: string;
  languageId?: string;
  fallback?: string;
  iconPack?: string;
  light?: boolean;
}

export interface GetFolderIconOptions {
  folderName?: string;
  isRoot?: boolean;
  isOpen?: boolean;
  theme?: string;
  fallback?: string;
}

export interface GetLanguageIconOptions {
  languageId: string;
  iconPack?: string;
  fallback?: string;
}

/**
 * Get the appropriate file icon name based on file name, extension, or language
 */
export function getFileIcon(options: GetFileIconOptions): string {
  const { fileName, fileExtension, languageId, fallback = "file", iconPack = "angular" } = options;

  // Check language icons first
  if (languageId) {
    const langIcon = findLanguageIcon(languageId, iconPack);
    if (langIcon) {
      return langIcon.name;
    }
  }

  // Check file icons by name
  if (fileName) {
    const fileIcon = findFileIconByName(fileName, iconPack);
    if (fileIcon) {
      return fileIcon.name;
    }
  }

  // Check file icons by extension
  if (fileExtension) {
    const fileIcon = findFileIconByExtension(fileExtension, iconPack);
    if (fileIcon) {
      return fileIcon.name;
    }
  }

  return fallback;
}

/**
 * Get the appropriate folder icon name based on folder name and state
 */
export function getFolderIcon(options: GetFolderIconOptions): string {
  const { folderName, isRoot = false, isOpen = false, theme = "specific", fallback } = options;

  if (theme === "none") {
    return fallback || "folder";
  }

  if (theme === "classic") {
    return isOpen ? "folder-open" : "folder";
  }

  // Specific theme
  if (folderName) {
    const folderIcon = findFolderIcon(folderName, isRoot);
    if (folderIcon) {
      const iconName = folderIcon.name;
      return isOpen ? `${iconName}-open` : iconName;
    }
  }

  // Default folder icons
  if (isRoot) {
    return isOpen ? "folder-root-open" : "folder-root";
  }

  return isOpen ? "folder-open" : "folder";
}

/**
 * Get the appropriate language icon name based on language ID
 */
export function getLanguageIcon(options: GetLanguageIconOptions): string {
  const { languageId, iconPack = "angular", fallback = "file" } = options;

  if (!languageId) {
    return fallback;
  }

  const langIcon = findLanguageIcon(languageId, iconPack);

  if (langIcon) {
    return langIcon.name;
  }

  // Fallback to default file icon if no language icon found
  return fallback;
}

/**
 * Find file icon by file name
 */
function findFileIconByName(fileName: string, iconPack?: string): FileIconType | undefined {
  return fileIcons.icons.find((icon) => {
    if (icon.disabled || (icon.enabledFor && !icon.enabledFor.some((pack) => pack.toString() === iconPack))) {
      return false;
    }
    return icon.fileNames?.some((name) => name === fileName);
  });
}

/**
 * Find file icon by file extension
 */
function findFileIconByExtension(extension: string, iconPack?: string): FileIconType | undefined {
  // Remove leading dot if present
  const cleanExtension = extension.startsWith(".") ? extension.slice(1) : extension;

  return fileIcons.icons.find((icon) => {
    if (icon.disabled || (icon.enabledFor && !icon.enabledFor.some((pack) => pack.toString() === iconPack))) {
      return false;
    }
    return icon.fileExtensions?.some((ext) => ext === cleanExtension);
  });
}

/**
 * Find language icon by language ID
 */
function findLanguageIcon(languageId: string, iconPack?: string): LanguageIconType | undefined {
  return languageIcons.find((icon) => {
    if (icon.disabled || (icon.enabledFor && !icon.enabledFor.some((pack) => pack.toString() === iconPack))) {
      return false;
    }
    return icon.ids.includes(languageId);
  });
}

/**
 * Find folder icon by folder name
 */
function findFolderIcon(folderName: string, isRoot: boolean): FolderIconType | undefined {
  // Find the specific theme
  const specificTheme = folderIcons.find((theme) => theme.name === "specific");
  if (!specificTheme || !specificTheme.icons) {
    return undefined;
  }

  return specificTheme.icons.find((icon) => {
    if (icon.disabled) {
      return false;
    }

    if (isRoot && icon.rootFolderNames) {
      return icon.rootFolderNames.includes(folderName);
    }

    return icon.folderNames?.includes(folderName);
  });
}

/**
 * Get all available file extensions that have icons
 */
export function getAvailableFileExtensions(): string[] {
  const extensions = new Set<string>();

  fileIcons.icons.forEach((icon) => {
    if (!icon.disabled && icon.fileExtensions) {
      icon.fileExtensions.forEach((ext) => extensions.add(ext));
    }
  });

  return Array.from(extensions).sort();
}

/**
 * Get all available file names that have icons
 */
export function getAvailableFileNames(): string[] {
  const names = new Set<string>();

  fileIcons.icons.forEach((icon) => {
    if (!icon.disabled && icon.fileNames) {
      icon.fileNames.forEach((name) => names.add(name));
    }
  });

  return Array.from(names).sort();
}

/**
 * Get all available folder names that have icons
 */
export function getAvailableFolderNames(): string[] {
  const names = new Set<string>();

  const specificTheme = folderIcons.find((theme) => theme.name === "specific");
  if (specificTheme) {
    specificTheme.icons?.forEach((icon) => {
      if (!icon.disabled) {
        icon.folderNames?.forEach((name) => names.add(name));
        if (icon.rootFolderNames) {
          icon.rootFolderNames.forEach((name) => names.add(name));
        }
      }
    });
  }

  return Array.from(names).sort();
}

/**
 * Get all available language IDs that have icons
 */
export function getAvailableLanguageIds(): string[] {
  const ids = new Set<string>();

  languageIcons.forEach((icon) => {
    if (!icon.disabled) {
      icon.ids.forEach((id) => ids.add(id));
    }
  });

  return Array.from(ids).sort();
}

/**
 * Icon category for organizing icons
 */
export interface IconCategory {
  name: string;
  description: string;
  icons: IconInfo[];
}

/**
 * Icon information
 */
export interface IconInfo {
  name: string;
  iconName: string;
  description?: string;
  category: string;
  tags: string[];
}

/**
 * Get all available icons organized by category
 */
export function getAllIconsWithCategories(iconPack: string = "angular"): IconCategory[] {
  const categories: IconCategory[] = [];

  // File Icons Category
  const fileIconInfos: IconInfo[] = [];
  fileIcons.icons.forEach((icon) => {
    if (icon.disabled || (icon.enabledFor && !icon.enabledFor.some((pack) => pack.toString() === iconPack))) {
      return;
    }

    const tags: string[] = [];
    if (icon.fileExtensions) tags.push(...icon.fileExtensions);
    if (icon.fileNames) tags.push(...icon.fileNames);

    fileIconInfos.push({
      name: icon.name,
      iconName: icon.name,
      description: `File icon for ${icon.name}`,
      category: "files",
      tags,
    });
  });

  categories.push({
    name: "files",
    description: "File Icons",
    icons: fileIconInfos.sort((a, b) => a.name.localeCompare(b.name)),
  });

  // Language Icons Category
  const languageIconInfos: IconInfo[] = [];
  languageIcons.forEach((icon) => {
    if (icon.disabled || (icon.enabledFor && !icon.enabledFor.some((pack) => pack.toString() === iconPack))) {
      return;
    }

    languageIconInfos.push({
      name: icon.name,
      iconName: icon.name,
      description: `Language icon for ${icon.ids.join(", ")}`,
      category: "languages",
      tags: icon.ids,
    });
  });

  categories.push({
    name: "languages",
    description: "Language Icons",
    icons: languageIconInfos.sort((a, b) => a.name.localeCompare(b.name)),
  });

  // Folder Icons Category
  const folderIconInfos: IconInfo[] = [];
  const specificTheme = folderIcons.find((theme) => theme.name === "specific");
  if (specificTheme && specificTheme.icons) {
    specificTheme.icons.forEach((icon) => {
      if (icon.disabled) {
        return;
      }

      const tags: string[] = [];
      if (icon.folderNames) tags.push(...icon.folderNames);
      if (icon.rootFolderNames) tags.push(...icon.rootFolderNames);

      folderIconInfos.push({
        name: icon.name,
        iconName: icon.name,
        description: `Folder icon for ${tags.join(", ")}`,
        category: "folders",
        tags,
      });
    });
  }

  // Add basic folder icons
  const basicFolderIcons = [
    { name: "folder", description: "Default folder" },
    { name: "folder-open", description: "Open folder" },
    { name: "folder-root", description: "Root folder" },
    { name: "folder-root-open", description: "Open root folder" },
  ];

  basicFolderIcons.forEach((icon) => {
    folderIconInfos.push({
      name: icon.name,
      iconName: icon.name,
      description: icon.description,
      category: "folders",
      tags: ["folder"],
    });
  });

  categories.push({
    name: "folders",
    description: "Folder Icons",
    icons: folderIconInfos.sort((a, b) => a.name.localeCompare(b.name)),
  });

  return categories;
}

/**
 * Get all file icons
 */
export function getAllFileIcons(iconPack: string = "angular"): FileIconType[] {
  return fileIcons.icons.filter((icon) => {
    return !icon.disabled && (!icon.enabledFor || icon.enabledFor.some((pack) => pack.toString() === iconPack));
  });
}

/**
 * Get all folder icons
 */
export function getAllFolderIcons(): FolderIconType[] {
  const specificTheme = folderIcons.find((theme) => theme.name === "specific");
  if (!specificTheme || !specificTheme.icons) {
    return [];
  }

  return specificTheme.icons.filter((icon) => !icon.disabled);
}

/**
 * Get all language icons
 */
export function getAllLanguageIcons(iconPack: string = "angular"): LanguageIconType[] {
  return languageIcons.filter((icon) => {
    return !icon.disabled && (!icon.enabledFor || icon.enabledFor.some((pack) => pack.toString() === iconPack));
  });
}

/**
 * Get all available icons as a flat list
 */
export function getAllIcons(iconPack: string = "angular"): IconInfo[] {
  const categories = getAllIconsWithCategories(iconPack);
  return categories.flatMap((category) => category.icons);
}

/**
 * Search icons by name or tags
 */
export function searchIcons(query: string, iconPack: string = "angular"): IconInfo[] {
  const allIcons = getAllIcons(iconPack);
  const searchTerm = query.toLowerCase();

  return allIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      (icon.description && icon.description.toLowerCase().includes(searchTerm))
  );
}
