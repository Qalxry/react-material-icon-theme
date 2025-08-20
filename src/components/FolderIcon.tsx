import { MaterialIcon, MaterialIconProps } from "./MaterialIcon";
import { getFolderIcon } from "../utils/iconMatcher";

export interface FolderIconProps extends Omit<MaterialIconProps, "name"> {
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

export function FolderIcon({
  folderName,
  isRoot = false,
  isOpen = false,
  theme = "specific",
  fallback,
  ...iconProps
}: FolderIconProps) {
  const iconName = getFolderIcon({
    folderName,
    isRoot,
    isOpen,
    theme,
    fallback,
  });

  return <MaterialIcon name={iconName} {...iconProps} />;
}
