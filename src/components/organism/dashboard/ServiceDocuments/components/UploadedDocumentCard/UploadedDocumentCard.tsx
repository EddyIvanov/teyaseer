import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

import style from './UploadedDocumentCard.styles';
import DocumentListItems from '../../../Documents/components/DocumentListItems/DocumentListItems';
import { Document } from '../../../Stages/components/Service/Service.type';

interface IUploadedDocumentCardProps {
  documentDetails: Document;
  onDocumentRemove: (templateId: Document['sfTemplateId']) => void;
}

const UploadedDocumentCard = ({
  documentDetails,
  onDocumentRemove,
}: IUploadedDocumentCardProps) => {
  return (
    <Card __css={style.card}>
      <CardHeader __css={style.cardHeader}>
        <Heading fontSize="normal" fontWeight="semibold">
          {documentDetails.name}
        </Heading>
      </CardHeader>
      <CardBody __css={style.cardBody}>
        {documentDetails.files?.map(item => (
          <DocumentListItems
            onDocumentRemove={() => {
              onDocumentRemove(documentDetails?.sfTemplateId);
            }}
            document={item}
            key={item.Id}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default UploadedDocumentCard;
