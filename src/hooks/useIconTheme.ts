import { useState, useCallback } from 'react';

export interface IconThemeConfig {
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

const defaultConfig: IconThemeConfig = {
  iconPack: 'angular',
  lightTheme: false,
  folderTheme: 'specific',
  opacity: 1,
  saturation: 1,
};

export function useIconTheme(initialConfig?: Partial<IconThemeConfig>) {
  const [config, setConfig] = useState<IconThemeConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const updateConfig = useCallback((updates: Partial<IconThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const setIconPack = useCallback((iconPack: string) => {
    updateConfig({ iconPack });
  }, [updateConfig]);

  const setLightTheme = useCallback((lightTheme: boolean) => {
    updateConfig({ lightTheme });
  }, [updateConfig]);

  const setFolderTheme = useCallback((folderTheme: IconThemeConfig['folderTheme']) => {
    updateConfig({ folderTheme });
  }, [updateConfig]);

  const setOpacity = useCallback((opacity: number) => {
    updateConfig({ opacity: Math.max(0, Math.min(1, opacity)) });
  }, [updateConfig]);

  const setSaturation = useCallback((saturation: number) => {
    updateConfig({ saturation: Math.max(0, Math.min(1, saturation)) });
  }, [updateConfig]);

  const setColor = useCallback((color?: string) => {
    updateConfig({ color });
  }, [updateConfig]);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return {
    config,
    updateConfig,
    setIconPack,
    setLightTheme,
    setFolderTheme,
    setOpacity,
    setSaturation,
    setColor,
    resetConfig,
  };
}
