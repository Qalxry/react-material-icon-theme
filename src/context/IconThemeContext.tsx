import { createContext, useContext, ReactNode } from "react";
import { useIconTheme, IconThemeConfig } from "../hooks/useIconTheme";

interface IconThemeContextType {
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

const IconThemeContext = createContext<IconThemeContextType | undefined>(undefined);

export interface IconThemeProviderProps {
  children: ReactNode;
  initialConfig?: Partial<IconThemeConfig>;
}

export function IconThemeProvider({ children, initialConfig }: IconThemeProviderProps) {
  const themeApi = useIconTheme(initialConfig);

  return <IconThemeContext.Provider value={themeApi}>{children}</IconThemeContext.Provider>;
}

export const useIconThemeContext = (): IconThemeContextType => {
  const context = useContext(IconThemeContext);
  if (context === undefined) {
    throw new Error("useIconThemeContext must be used within an IconThemeProvider");
  }
  return context;
};

export default IconThemeProvider;
