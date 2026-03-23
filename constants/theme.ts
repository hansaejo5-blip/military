import { Platform } from 'react-native';

const tintColorLight = '#1E3A5F';
const tintColorDark = '#8FB3D9';

export const Colors = {
  light: {
    text: '#17212B',
    background: '#F3F5F7',
    tint: tintColorLight,
    icon: '#6A7785',
    tabIconDefault: '#8793A0',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#D6DDE5',
    mutedText: '#5A6774',
    success: '#1F7A45',
    warning: '#B97412',
    danger: '#B63B3B',
    info: '#355C7D',
    chip: '#E7ECF2',
  },
  dark: {
    text: '#EEF3F7',
    background: '#11161B',
    tint: tintColorDark,
    icon: '#94A4B3',
    tabIconDefault: '#7E8A97',
    tabIconSelected: tintColorDark,
    card: '#1A2128',
    border: '#2A333D',
    mutedText: '#A6B3BF',
    success: '#69C38A',
    warning: '#F1B562',
    danger: '#F08989',
    info: '#9CC0E3',
    chip: '#202A33',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
