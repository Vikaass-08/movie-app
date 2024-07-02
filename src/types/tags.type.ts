export interface TagProps {
  tagClickAction: (id: number) => void;
  tagName: string;
  currentActive: boolean;
  tagId: number;
}
