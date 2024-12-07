export interface ISurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}
export type TPendingSurveyResponse = {
  url?: string;
};
