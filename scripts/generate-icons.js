#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../icons');
const outputFile = path.join(__dirname, '../src/iconData.ts');

function generateIconsData() {
  try {
    // 读取所有 SVG 文件
    const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
    
    const iconData = {};
    
    console.log(`Found ${files.length} icon files. Processing...`);
    
    files.forEach(file => {
      const iconName = path.basename(file, '.svg');
      const filePath = path.join(iconsDir, file);
      
      try {
        let svgContent = fs.readFileSync(filePath, 'utf-8');
        
        // 清理 SVG 内容：移除不必要的空白和换行
        svgContent = svgContent
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><')
          .trim();
        
        iconData[iconName] = svgContent;
        
        if (Object.keys(iconData).length % 100 === 0) {
          console.log(`Processed ${Object.keys(iconData).length} icons...`);
        }
      } catch (error) {
        console.warn(`Warning: Could not read ${file}:`, error.message);
      }
    });
    
    // 生成 TypeScript 文件
    const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated from SVG files in the icons directory.

export interface IconData {
  [key: string]: string;
}

export const iconData: IconData = ${JSON.stringify(iconData, null, 2)};

export const availableIcons = Object.keys(iconData);

export function getIconSvg(name: string): string | null {
  return iconData[name] || null;
}

export function hasIcon(name: string): boolean {
  return name in iconData;
}
`;
    
    fs.writeFileSync(outputFile, tsContent, 'utf-8');
    
    console.log(`✅ Generated ${Object.keys(iconData).length} icons to ${outputFile}`);
    console.log(`📦 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error generating icons data:', error);
    process.exit(1);
  }
}

generateIconsData();
