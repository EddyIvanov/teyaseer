import { DocumentFileExtension } from '../../Documents.types';

import { Icon } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';

interface IDocumentIconProp {
  extension?: DocumentFileExtension;
}

const DocumentIcon = ({ extension }: IDocumentIconProp) => {
  let iconName: IconNames = 'documentDefault';
  switch (extension) {
    case 'pdf':
      iconName = 'documentPdf';
      break;
    case 'doc':
      iconName = 'documentWord';
      break;
    case 'docx':
      iconName = 'documentWord';
      break;
    case 'xls':
      iconName = 'documentExcel';
      break;
    case 'xlsx':
      iconName = 'documentExcel';
      break;
    case 'zip':
      iconName = 'documentZip';
      break;
    case 'dwg':
      iconName = 'documentCad';
      break;
    case 'dxf':
      iconName = 'documentCad';
      break;
  }

  return <Icon height="35px" width="35px" name={iconName} />;
};

export default DocumentIcon;
