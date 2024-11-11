/// <reference types="vite/client" />

declare module 'react-email-editor' {
  import { ComponentType } from 'react';

  interface EmailEditorProps {
    ref?: any;
    onReady?: () => void;
    minHeight?: string | number;
    options?: {
      customCSS?: string[];
      features?: {
        colorPicker?: {
          presets?: string[];
        };
      };
      tools?: {
        [key: string]: {
          enabled: boolean;
        };
      };
      appearance?: {
        theme?: 'light' | 'dark';
        panels?: {
          tools?: {
            dock?: 'left' | 'right';
          };
        };
      };
    };
  }

  const EmailEditor: ComponentType<EmailEditorProps>;
  export default EmailEditor;
}