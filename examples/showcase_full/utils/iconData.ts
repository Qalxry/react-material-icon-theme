import { 
  getAllFileIcons, 
  getAllFolderIcons, 
  getAllLanguageIcons 
} from "react-material-icon-theme";
import { IconInfo } from '../components/IconCard';

export function getAllIcons(): IconInfo[] {
  const fileIcons = getAllFileIcons();
  const folderIcons = getAllFolderIcons();
  const languageIcons = getAllLanguageIcons();

  const allIcons: IconInfo[] = [];

  // Add file icons
  fileIcons.forEach(iconData => {
    const matchedTerms: string[] = [];
    
    if (iconData.fileExtensions) {
      matchedTerms.push(...iconData.fileExtensions);
    }
    
    if (iconData.fileNames) {
      matchedTerms.push(...iconData.fileNames);
    }

    allIcons.push({
      name: iconData.name,
      category: 'files',
      matchedTerms: matchedTerms,
      description: `File icon for ${matchedTerms.join(', ')}`
    });
  });

  // Add folder icons
  folderIcons.forEach(iconData => {
    const matchedTerms: string[] = [];
    
    if (iconData.folderNames) {
      matchedTerms.push(...iconData.folderNames);
    }
    
    if (iconData.rootFolderNames) {
      matchedTerms.push(...iconData.rootFolderNames);
    }

    allIcons.push({
      name: iconData.name,
      category: 'folders',
      matchedTerms: matchedTerms,
      description: `Folder icon for ${matchedTerms.join(', ')}`
    });

    // Add open variant if it exists
    allIcons.push({
      name: `${iconData.name}-open`,
      category: 'folders',
      matchedTerms: matchedTerms.map(term => `${term} (open)`),
      description: `Open folder icon for ${matchedTerms.join(', ')}`
    });
  });

  // Add language icons
  languageIcons.forEach(iconData => {
    allIcons.push({
      name: iconData.name,
      category: 'languages',
      matchedTerms: iconData.ids,
      description: `Language icon for ${iconData.ids.join(', ')}`
    });
  });

  // Add default icons
  const defaultIcons = [
    { name: 'file', category: 'files' as const, matchedTerms: ['default', 'generic'], description: 'Default file icon' },
    { name: 'folder', category: 'folders' as const, matchedTerms: ['default', 'generic'], description: 'Default folder icon' },
    { name: 'folder-open', category: 'folders' as const, matchedTerms: ['default', 'generic', 'open'], description: 'Default open folder icon' },
    { name: 'folder-root', category: 'folders' as const, matchedTerms: ['root', 'project'], description: 'Root folder icon' },
    { name: 'folder-root-open', category: 'folders' as const, matchedTerms: ['root', 'project', 'open'], description: 'Open root folder icon' },
  ];

  allIcons.push(...defaultIcons);

  // Remove duplicates and sort
  const uniqueIcons = allIcons.filter((icon, index, self) => 
    index === self.findIndex(i => i.name === icon.name)
  );

  return uniqueIcons.sort((a, b) => a.name.localeCompare(b.name));
}

export function getIconsByCategory(category: 'files' | 'folders' | 'languages'): IconInfo[] {
  return getAllIcons().filter(icon => icon.category === category);
}

export function searchIcons(query: string, icons: IconInfo[]): IconInfo[] {
  if (!query.trim()) {
    return icons;
  }

  const searchTerms = query.toLowerCase().split(/\s+/);
  
  return icons.filter(icon => {
    const searchableText = [
      icon.name,
      ...icon.matchedTerms,
      icon.description || ''
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}
