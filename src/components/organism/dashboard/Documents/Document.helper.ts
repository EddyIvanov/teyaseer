import { DocumentFileExtension } from './Documents.types';

export const replaceFileExtension = (
  fileName: string,
  newExtension: DocumentFileExtension
) => {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex !== -1) {
    const fileNameWithoutExtension = fileName.substring(0, dotIndex);
    return fileNameWithoutExtension + '.' + newExtension;
  } else {
    return fileName + '.' + newExtension;
  }
};

export const getFileExtension = (
  fileName: string
): string | DocumentFileExtension | null => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    const extension = fileName.substring(lastDotIndex + 1).toLowerCase();
    return extension;
  }

  return null;
};
