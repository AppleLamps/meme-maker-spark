import { create } from "zustand";
import { DEFAULT_STYLE, DEFAULT_TEMPLATE_ID } from "@/lib/defaults";
import type { MemeState, MemeStyle } from "@/types/meme";

export const useMemeStore = create<MemeState>((set) => ({
  selectedTemplateId: DEFAULT_TEMPLATE_ID,
  customImage: null,
  topText: "",
  bottomText: "",
  ...DEFAULT_STYLE,
  setTemplate: (id: string) => set({ selectedTemplateId: id, customImage: null }),
  setCustomImage: (dataUrl: string) =>
    set({ customImage: dataUrl, selectedTemplateId: null }),
  setTopText: (text: string) => set({ topText: text }),
  setBottomText: (text: string) => set({ bottomText: text }),
  setStyle: (partial: Partial<MemeStyle>) => set((state) => ({ ...state, ...partial })),
  reset: () =>
    set({
      selectedTemplateId: DEFAULT_TEMPLATE_ID,
      customImage: null,
      topText: "",
      bottomText: "",
      ...DEFAULT_STYLE,
    }),
}));
