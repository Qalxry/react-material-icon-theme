# React Material Icon Theme

> ![WARNING]
> Only React 18 is supported. This package is not compatible with earlier or later versions of React.

A React package that brings the beautiful Material Icon Theme from VS Code to your React applications. This package extracts and adapts the complete icon system from the popular VS Code Material Icon Theme extension.

## Features

- 🎨 **1000+ Material Design Icons** - Complete set of file, folder, and language icons
- ⚛️ **React Components** - Easy-to-use React components with TypeScript support
- 🎯 **Smart Icon Detection** - Automatically matches icons based on file extensions, names, or language IDs
- 🎨 **Theme Support** - Multiple icon packs (Angular, React, Vue, etc.) and light/dark variants
- 🎛️ **Customizable** - Adjustable size, color, opacity, and saturation
- 📦 **Lightweight** - Minimal dependencies, optimized bundle size
- 🔧 **Developer Friendly** - Full TypeScript support and comprehensive API

## Installation

```bash
npm install react-material-icon-theme
# or
yarn add react-material-icon-theme
# or
pnpm add react-material-icon-theme
```

## Quick Start

### Basic Usage

```tsx
import { MaterialIcon, FileIcon, FolderIcon } from 'react-material-icon-theme';

function App() {
  return (
    <div>
      {/* Basic icon */}
      <MaterialIcon name="typescript" size={32} />
      
      {/* Auto-detected file icon */}
      <FileIcon fileName="app.tsx" size={24} />
      
      {/* Auto-detected folder icon */}
      <FolderIcon folderName="src" size={24} />
    </div>
  );
}
```

## Components

### MaterialIcon

The base icon component for displaying any icon by name.

```tsx
<MaterialIcon 
  name="typescript"
  size={32}
  color="#3178c6"
  opacity={0.8}
  light={false}
  onClick={() => console.log('Icon clicked')}
/>
```

**Props:**

- `name` (string): Icon SVG file name without extension
- `size` (number | string): Icon size in pixels
- `color` (string): Icon color (CSS color value)
- `opacity` (number): Icon opacity (0-1)
- `light` (boolean): Use light variant if available
- `className` (string): Additional CSS class
- `style` (CSSProperties): Additional styles
- `onClick` (function): Click handler

### FileIcon

Automatically detects and displays the appropriate icon for files.

```tsx
<FileIcon 
  fileName="package.json"
  size={24}
/>

<FileIcon 
  fileExtension="tsx"
  size={24}
/>

<FileIcon 
  languageId="typescript"
  size={24}
/>
```

**Props:**

- Inherits all `MaterialIcon` props except `name`
- `fileName` (string): Complete file name with extension
- `fileExtension` (string): File extension (with or without dot)
- `languageId` (string): Language identifier
- `fallback` (string): Fallback icon name if no match found
- `iconPack` (string): Active icon pack

### FolderIcon

Displays appropriate folder icons with support for open/closed states.

```tsx
<FolderIcon 
  folderName="src"
  isOpen={true}
  size={24}
/>

<FolderIcon 
  isRoot={true}
  theme="specific"
  size={24}
/>
```

**Props:**

- Inherits all `MaterialIcon` props except `name`
- `folderName` (string): Folder name
- `isRoot` (boolean): Whether this is a root folder
- `isOpen` (boolean): Whether folder is open/expanded
- `theme` (string): Folder theme ('specific', 'classic', 'none')
- `fallback` (string): Fallback icon name

### IconBrowser

A component for browsing and selecting from available icons.

```tsx
<IconBrowser 
  maxIcons={100}
  searchFilter="react"
  iconSize={32}
  columns={8}
  onIconClick={(iconName) => console.log('Selected:', iconName)}
/>
```

## Utility Functions

### Icon Matching

```tsx
import { 
  getFileIcon, 
  getFolderIcon,
  getAvailableFileExtensions,
  getAvailableFileNames 
} from 'react-material-icon-theme';

// Get icon name for a file
const iconName = getFileIcon({
  fileName: 'app.tsx',
  iconPack: 'react'
});

// Get all available file extensions
const extensions = getAvailableFileExtensions();
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test
```

## License

MIT - This package is based on the [VS Code Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme) which is also MIT licensed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This package is based on the excellent [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) VS Code extension by [Philipp Kief](https://github.com/PKief) and the [Material Extensions](https://github.com/material-extensions) team.
