export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: EmailBlock[];
  header?: EmailBlock[];
  footer?: EmailBlock[];
  signature?: EmailBlock[];
  styles: {
    fontFamily?: string;
    fontSize?: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'columns' | 'social' | 'header' | 'footer' | 'image-text-left' | 'image-text-right' | 'three-columns' | 'two-columns';
  content: any;
  styles?: {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: string;
    width?: string;
    height?: string;
    alignment?: 'left' | 'center' | 'right';
    columns?: number;
  };
}

export interface ImageTextBlock extends EmailBlock {
  type: 'image-text-left' | 'image-text-right';
  content: {
    layout: 'image-left' | 'image-right';
    image: {
      url: string;
      alt: string;
    };
    text: {
      content: string;
    };
  };
}

export interface ColumnsBlock extends EmailBlock {
  type: 'two-columns' | 'three-columns';
  content: {
    columns: Array<{
      content: string;
    }>;
  };
}

export interface SocialBlock extends EmailBlock {
  type: 'social';
  content: {
    networks: Array<{
      type: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
      url: string;
      icon?: string;
    }>;
  };
}