import { fileTypes } from '../Documents/Document.constants';
import { DocumentFileExtension } from '../Documents/Documents.types';

export const findExtensionFromFileType = (
  fileType: string
): DocumentFileExtension | undefined => {
  const entry = Object.entries(fileTypes).find(
    ([, value]) => value === fileType
  );
  return entry ? (entry[0] as DocumentFileExtension) : undefined;
};
