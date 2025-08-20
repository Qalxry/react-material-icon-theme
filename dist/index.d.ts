import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare const availableIcons: string[];

declare type BasicFileIcon = DefaultIcon & LightSettingsWithCloneOptions & {
    /**
     * Define the file extensions that should use this icon.
     * E.g. `['js']`
     */
    fileExtensions?: string[];
    /**
     * Define if there are some static file names that should apply this icon.
     * E.g. `['sample.js']`
     */
    fileNames?: string[];
    /**
     * Define patterns for file names. Patterns are used to generate common file names and file extensions based on a key.
     */
    patterns?: Patterns;
    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;
    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    enabledFor?: IconPack[];
};

declare type BasicFolderIcon = DefaultIcon & LightSettingsWithCloneOptions & {
    /**
     * Define the folder names that should apply the icon.
     * E.g. `['src', 'source']`
     */
    folderNames: string[];
    /**
     * Define the workspace (root) folder names that should apply the icon.
     * E.g. `['database']`
     */
    rootFolderNames?: string[];
    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;
    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    enabledFor?: IconPack[];
};

declare type CloneOptions = {
    base: string;
    color: string;
    lightColor?: string;
};

export declare type Config = {
    activeIconPack: IconPackValue;
    hidesExplorerArrows: boolean;
    opacity: number;
    saturation: number;
    folders: {
        theme: FolderThemeName;
        color: string;
        associations: IconAssociations;
        customClones: FolderIconClone[];
    };
    rootFolders: {
        color: string;
        associations: IconAssociations;
    };
    files: {
        color: string;
        associations: IconAssociations;
        customClones: FileIconClone[];
    };
    languages: {
        associations: IconAssociations;
        customClones: LanguageIconClone[];
    };
    enableLogging: boolean;
    logLevel: LogLevel;
};

declare type CustomClone = CloneOptions & {
    name: string;
    activeForPacks?: IconPackValue[];
};

declare type DefaultIcon = {
    /**
     * Name of the icon, e.g. `src`
     */
    name: string;
    /**
     * Define if there is a light icon available.
     */
    light?: boolean;
    /**
     * Define if there is a high contrast icon available.
     */
    highContrast?: boolean;
};

export declare function FileIcon({ fileName, fileExtension, languageId, fallback, iconPack, ...iconProps }: FileIconProps): JSX_2.Element;

declare type FileIconClone = CustomClone & Pick<FileIconType, 'fileExtensions' | 'fileNames'>;

export declare interface FileIconProps extends Omit<MaterialIconProps, "name"> {
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

declare type FileIcons = {
    /**
     * Define the default icon for folders.
     */
    defaultIcon: DefaultIcon;
    /**
     * Defines all folder icons.
     */
    icons: FileIconType[];
};

/**
 * Defines file icons
 */
export declare const fileIcons: FileIcons;

/**
 * Type for a `FileIcon`. In addition to the `name` property, either a `fileExtensions`, `fileNames`, or `patterns` property is required.
 */
export declare type FileIconType = RequireAtLeastOneFileIcon<BasicFileIcon>;

declare enum FileNamePattern {
    /** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`. */
    Ecmascript = "ecmascript",
    /** Adds the following extensions to the file name: `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
    Configuration = "configuration",
    /** Adds the following extensions to the file name: `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `json`, `jsonc`, `json5`, `yaml`, `yml`, `toml`. */
    NodeEcosystem = "nodeEcosystem",
    /** It adjusts the name with the following patterns: `.fileNamerc`, `.config/fileNamerc`, `fileName.config` and combines that with the pattern `NodeEcosystem` */
    Cosmiconfig = "cosmiconfig",
    /** Adds the following extensions to the file name: `yaml`, `yml`. */
    Yaml = "yaml",
    /** It adjusts the name with the following patterns: `.${fileName}`, `${fileName}`. */
    Dotfile = "dotfile"
}

export declare function FolderIcon({ folderName, isRoot, isOpen, theme, fallback, ...iconProps }: FolderIconProps): JSX_2.Element;

declare type FolderIconClone = CustomClone & Pick<FolderIconType, 'folderNames' | 'rootFolderNames'>;

export declare interface FolderIconProps extends Omit<MaterialIconProps, "name"> {
    /**
     * Folder name (e.g., 'src', 'node_modules')
     */
    folderName?: string;
    /**
     * Whether this is a root folder
     */
    isRoot?: boolean;
    /**
     * Whether the folder is open/expanded
     */
    isOpen?: boolean;
    /**
     * Folder theme ('specific', 'classic', 'none')
     */
    theme?: string;
    /**
     * Fallback icon name if no match is found
     */
    fallback?: string;
}

/**
 * Defines folder icons
 */
export declare const folderIcons: FolderTheme[];

/**
 * Type for a `FileIcon`. In addition to the `name` property, either a `fileExtensions`, `fileNames`, or `patterns` property is required.
 */
export declare type FolderIconType = RequireAtLeastOneFolderIcon<BasicFolderIcon>;

declare type FolderTheme = {
    /**
     * Name of the theme
     */
    name: FolderThemeName;
    /**
     * Define the default icon for folders in a theme.
     */
    defaultIcon: DefaultIcon;
    /**
     * Icon for root folders.
     */
    rootFolder?: DefaultIcon;
    /**
     * Defines folder icons for specific folder names.
     */
    icons?: FolderIconType[];
};

declare type FolderThemeName = 'specific' | 'classic' | 'none';

/**
 * Get all file icons
 */
export declare function getAllFileIcons(iconPack?: string): FileIconType[];

/**
 * Get all folder icons
 */
export declare function getAllFolderIcons(): FolderIconType[];

/**
 * Get all available icons as a flat list
 */
export declare function getAllIcons(iconPack?: string): IconInfo[];

/**
 * Get all available icons organized by category
 */
export declare function getAllIconsWithCategories(iconPack?: string): IconCategory[];

/**
 * Get all language icons
 */
export declare function getAllLanguageIcons(iconPack?: string): LanguageIconType[];

/**
 * Get all available file extensions that have icons
 */
export declare function getAvailableFileExtensions(): string[];

/**
 * Get all available file names that have icons
 */
export declare function getAvailableFileNames(): string[];

/**
 * Get all available folder names that have icons
 */
export declare function getAvailableFolderNames(): string[];

/**
 * Get all available language IDs that have icons
 */
export declare function getAvailableLanguageIds(): string[];

/**
 * Get the appropriate file icon name based on file name, extension, or language
 */
export declare function getFileIcon(options: GetFileIconOptions): string;

export declare interface GetFileIconOptions {
    fileName?: string;
    fileExtension?: string;
    languageId?: string;
    fallback?: string;
    iconPack?: string;
    light?: boolean;
}

/**
 * Get the appropriate folder icon name based on folder name and state
 */
export declare function getFolderIcon(options: GetFolderIconOptions): string;

export declare interface GetFolderIconOptions {
    folderName?: string;
    isRoot?: boolean;
    isOpen?: boolean;
    theme?: string;
    fallback?: string;
}

export declare function getIconSvg(name: string): string | null;

/**
 * Get the appropriate language icon name based on language ID
 */
export declare function getLanguageIcon(options: GetLanguageIconOptions): string;

export declare interface GetLanguageIconOptions {
    languageId: string;
    iconPack?: string;
    fallback?: string;
}

export declare function hasIcon(name: string): boolean;

export declare type IconAssociations = {
    [pattern: string]: string;
};

/**
 * Icon category for organizing icons
 */
export declare interface IconCategory {
    name: string;
    description: string;
    icons: IconInfo[];
}

export declare interface IconData {
    [key: string]: string;
}

export declare const iconData: IconData;

/**
 * Icon information
 */
export declare interface IconInfo {
    name: string;
    iconName: string;
    description?: string;
    category: string;
    tags: string[];
}

/**
 * Defines icon packs that can be toggled.
 */
export declare enum IconPack {
    Angular = "angular",
    Nest = "nest",
    Ngrx = "angular_ngrx",
    React = "react",
    Redux = "react_redux",
    Roblox = "roblox",
    Qwik = "qwik",
    Vue = "vue",
    Vuex = "vue_vuex"
}

export declare type IconPackValue = `${IconPack}` | '';

declare interface IconThemeConfig {
    /**
     * Active icon pack
     */
    iconPack: string;
    /**
     * Whether to use light theme
     */
    lightTheme: boolean;
    /**
     * Folder theme
     */
    folderTheme: 'specific' | 'classic' | 'none';
    /**
     * Icon opacity (0-1)
     */
    opacity: number;
    /**
     * Icon saturation (0-1)
     */
    saturation: number;
    /**
     * Default icon color
     */
    color?: string;
}

declare interface IconThemeContextType {
    config: IconThemeConfig;
    updateConfig: (updates: Partial<IconThemeConfig>) => void;
    setIconPack: (iconPack: string) => void;
    setLightTheme: (lightTheme: boolean) => void;
    setFolderTheme: (folderTheme: IconThemeConfig["folderTheme"]) => void;
    setOpacity: (opacity: number) => void;
    setSaturation: (saturation: number) => void;
    setColor: (color?: string) => void;
    resetConfig: () => void;
}

export declare function IconThemeProvider({ children, initialConfig }: IconThemeProviderProps): JSX_2.Element;

export declare interface IconThemeProviderProps {
    children: ReactNode;
    initialConfig?: Partial<IconThemeConfig>;
}

export declare function LanguageIcon({ fileName, fileExtension, languageId, fallback, iconPack, ...iconProps }: LanguageIconProps): JSX_2.Element;

declare type LanguageIconClone = CustomClone & Pick<LanguageIconType, 'ids'>;

export declare interface LanguageIconProps extends Omit<MaterialIconProps, 'name'> {
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

/**
 * Defines icons for language ids
 */
export declare const languageIcons: LanguageIconType[];

export declare type LanguageIconType = DefaultIcon & LightSettingsWithCloneOptions & {
    /**
     * Language ID, e.g. `javascript`
     *
     * According to official VS Code documentation:
     * https://code.visualstudio.com/docs/languages/identifiers
     */
    ids: string[];
    /**
     * Define if the icon should be disabled.
     */
    disabled?: boolean;
    /**
     * Defines a pack to which this icon belongs. A pack can be toggled and all icons inside this pack can be enabled or disabled together.
     */
    enabledFor?: IconPack[];
};

/**
 * Settings for light mode, determining the behavior of `clone` and `lightColor` based on `light`.
 */
declare type LightSettingsWithCloneOptions = {
    /** Enables light mode; requires `clone` with `lightColor`. */
    light: true;
    /** Clone configuration with a required `lightColor`. */
    clone: CloneOptions & {
        /** Specifies the color for light mode (required). */
        lightColor: string;
    };
} | {
    /** Enables light mode; `clone` is not provided. */
    light: true;
    /** No clone configuration when absent in light mode. */
    clone?: never;
} | {
    /** Disables light mode; prohibits `lightColor` in `clone`. */
    light?: false;
    /** Optional clone configuration for dark mode. */
    clone?: CloneOptions & {
        /** Must not exist when `light` is `false`. */
        lightColor?: never;
    };
};

declare type LogLevel = 'info' | 'error' | 'debug';

export declare function MaterialIcon({ name, size, color, opacity, className, style, alt, light, onClick, }: MaterialIconProps): JSX_2.Element;

export declare interface MaterialIconProps {
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
    onClick?: (event: default_2.MouseEvent<HTMLDivElement>) => void;
}

declare type Patterns = Record<string, FileNamePattern>;

declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];

declare type RequireAtLeastOneFileIcon<T> = T extends BasicFileIcon ? RequireAtLeastOne<T, 'fileExtensions' | 'fileNames' | 'patterns'> : never;

declare type RequireAtLeastOneFolderIcon<T> = T extends BasicFolderIcon ? RequireAtLeastOne<T, 'folderNames' | 'rootFolderNames'> : never;

/**
 * Search icons by name or tags
 */
export declare function searchIcons(query: string, iconPack?: string): IconInfo[];

export declare const useIconThemeContext: () => IconThemeContextType;

export { }
