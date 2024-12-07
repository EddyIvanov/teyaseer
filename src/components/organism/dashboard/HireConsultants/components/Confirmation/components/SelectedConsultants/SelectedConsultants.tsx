import { useContext } from 'react';

import {
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import pageStyle from './SelectedConsultants.style';
import { IConsultantType } from '../../../../Consultants.type';

import { Text } from '@/components';
import { companyName } from '@/helpers/companyNameTranslation';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

interface ISelectedConsultants {
  items: IConsultantType[];
  title: string;
  cardHeader?: React.ReactNode;
}
const SelectedConsultants = (props: ISelectedConsultants) => {
  const { t } = useTranslation();
  const { items, title } = props;
  const style = useMultiStyleConfig('Card', {});
  const { locale } = useContext(Context);

  return (
    <Card>
      {props.cardHeader && props.cardHeader}
      <CardBody>
        <Text sx={style.bodyMainTitle}>{title}</Text>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr sx={pageStyle.tr}>
                <Th>{t('portal_your_selected_consultant_consultants')}</Th>
                {/* <Th>Completed Projects</Th>
                <Th>Ongoing Projects</Th>
                <Th>Municipality Classification</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {items &&
                items.map(item => {
                  return (
                    <Tr key={item.id} sx={pageStyle.tr}>
                      <Td>{companyName(item, locale)}</Td>
                      {/* <Td>212</Td>
                      <Td>426</Td>
                      <Td>12</Td> */}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default SelectedConsultants;
