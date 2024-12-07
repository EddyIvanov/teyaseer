import { fileTypes, zipFileTypes } from '../Documents/Document.constants';

export const acceptedFileTypes: string[] = [
  ...new Set([...Object.values(fileTypes), ...zipFileTypes]),
];

export const maxFileSize: number = 2 * 1024 * 1024 * 1024; // 2GB
