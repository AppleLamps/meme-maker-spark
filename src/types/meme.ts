export interface MemeStyle {
  fontFamily: string;
  fontSize: number;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  shadowEnabled: boolean;
}

export interface MemeTemplate {
  id: string;
  name: string;
  src: string;
  textPositions?: number;
}

export interface MemeState extends MemeStyle {
  selectedTemplateId: string | null;
  customImage: string | null;
  topText: string;
  bottomText: string;
  setTemplate: (id: string) => void;
  setCustomImage: (dataUrl: string) => void;
  setTopText: (text: string) => void;
  setBottomText: (text: string) => void;
  setStyle: (partial: Partial<MemeStyle>) => void;
  reset: () => void;
}
