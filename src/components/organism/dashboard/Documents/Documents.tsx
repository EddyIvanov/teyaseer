import { useContext, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { getDocuments } from './Documents.api';
import style from './Documents.styles';
import { IDocument, IDocuments } from './Documents.types';
import DocumentListItems from './components/DocumentListItems/DocumentListItems';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

import { Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

interface IDocumentAccordionItem {
  title: string;
  documents: IDocument[];
}

const DocumentsComponent = () => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [myReportsCount, setMyReportsCount] = useState(0);
  const [myDocumentsCount, setMyDocumentsCount] = useState(0);
  const [myReports, setMyReports] = useState<IDocumentAccordionItem[]>([]);
  const [myDocuments, setMyDocuments] = useState<IDocumentAccordionItem[]>([]);

  const countTotalDocuments = (data: IDocuments[]) => {
    let totalDocuments = 0;

    data.forEach(item => {
      totalDocuments += item.files.length;
    });

    return totalDocuments;
  };

  const groupByStages = (
    docArray: IDocuments[]
  ): { [key in IDocuments['Stage']]: IDocuments[] } => {
    return docArray.reduce(
      (result, item) => {
        const groupKey: IDocuments['Stage'] = item.Stage;
        result[groupKey] = result[groupKey] || [];
        result[groupKey].push(item);
        return result;
      },
      {} as { [key in IDocuments['Stage']]: IDocuments[] }
    );
  };

  const getAccordionData = (groupedData: {
    [key in IDocuments['Stage']]: IDocuments[];
  }): IDocumentAccordionItem[] => {
    const data: IDocumentAccordionItem[] = [];

    for (const [key, group] of Object.entries(groupedData)) {
      const docs: IDocument[] = [];

      group.forEach(item => {
        if (item.files.length) {
          docs.push(...item.files);
        }
      });

      const item: IDocumentAccordionItem = {
        title: key,
        documents: docs,
      };

      data.push(item);
    }

    return data;
  };

  const fetchDocuments = async () => {
    try {
      const documents = (await getDocuments(locale)).data;
      const allReports = documents.filter(item => item.Type === 'report');
      const allDocs = documents.filter(item => item.Type === 'document');

      const groupedReports = groupByStages(allReports);
      const groupedDocuments = groupByStages(allDocs);

      const reports = getAccordionData(groupedReports);
      const docs = getAccordionData(groupedDocuments);

      setMyReportsCount(countTotalDocuments(allReports));
      setMyDocumentsCount(countTotalDocuments(allDocs));
      setMyReports(reports);
      setMyDocuments(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <Box width="100%" overflow={'hidden'}>
      <Card
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        borderColor="border"
        direction="column"
        padding="0"
      >
        <CardHeader
          padding="24px"
          display="flex"
          flexDirection="column"
          gap="24px"
        >
          <Heading sx={style.title}>{t('portal_my_documents_title')}</Heading>
          <Text fontSize="normal">{t('portal_my_documents_sub_title')}</Text>
        </CardHeader>
        <CardBody padding="0">
          <Tabs colorScheme={colors.brand.primary}>
            <TabList sx={style.tabList}>
              <Tab className="firstTab" sx={style.tab}>
                {t('portal_my_documents_tab_title_reports')} ({myReportsCount})
              </Tab>
              <Tab sx={style.tab}>
                {t('portal_my_documents_tab_title_documents')} (
                {myDocumentsCount})
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding="0">
                <Accordion defaultIndex={[0]} allowMultiple>
                  {!myReports.length ? (
                    <NoDataFound {...{ isLoading }} />
                  ) : (
                    myReports.map(item => (
                      <DocumentAccordionItem key={item.title} {...item} />
                    ))
                  )}
                </Accordion>
              </TabPanel>
              <TabPanel padding="0">
                <Accordion defaultIndex={[0]} allowMultiple>
                  {!myDocuments.length ? (
                    <NoDataFound {...{ isLoading }} />
                  ) : (
                    myDocuments.map(item => (
                      <DocumentAccordionItem key={item.title} {...item} />
                    ))
                  )}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  );
};

const NoDataFound = ({ isLoading }: { isLoading?: boolean }) => {
  const { t } = useTranslation();
  return (
    <>
      {isLoading ? (
        <CenteredLoader variant="documentListSkeleton" />
      ) : (
        <Text padding="20px" textAlign="center">
          {t('portal_no_data_found')}
        </Text>
      )}
    </>
  );
};

const DocumentAccordionItem = (item: IDocumentAccordionItem) => {
  return (
    <AccordionItem sx={style.accordionItem}>
      <AccordionButton
        borderBottom="1px solid"
        borderColor={colors.border}
        padding="20px"
      >
        <Box as="span" flex="1" textAlign="start">
          <Heading fontSize="medium" fontWeight="normal">
            {item.title}
          </Heading>
        </Box>
        <AccordionIcon fontSize="5xl" />
      </AccordionButton>
      <AccordionPanel flexDirection="column" display="flex" padding="0">
        {!item.documents.length ? (
          <NoDataFound />
        ) : (
          item.documents.map(doc => (
            <DocumentListItems
              key={doc.Id}
              document={doc}
              editEnabled={false}
            />
          ))
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DocumentsComponent;
