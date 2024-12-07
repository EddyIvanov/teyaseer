import { useContext, useState } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

import InfoStatus from './components/InfoStatus';
import ProjectInfoModal from '../ProjectInfoModal/ProjectInfoModal';

import { formatDate } from '@/helpers/date';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { IProjectInfo } from '@/types/user.type';

interface IProjectDetails {
  projectInfo: IProjectInfo;
}

const ProjectInfo = ({ projectInfo }: IProjectDetails) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const [isProjectInfoModalOpen, setIsProjectInfoModalOpen] = useState(false);

  const toggleProjectInfoModal = () => {
    setIsProjectInfoModalOpen(!isProjectInfoModalOpen);
  };

  return (
    <>
      <Card
        boxShadow="none"
        overflow="hidden"
        borderRadius="none"
        border="0"
        p="6"
      >
        <CardHeader>
          <Heading
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize="2xl"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              gap="20px"
            >
              <Text>{t('portal_profile_project_info')}</Text>
              <Flex gap="12px" alignItems="center">
                <InfoStatus
                  status={projectInfo.projectStatus}
                  onClick={toggleProjectInfoModal}
                />
              </Flex>
            </Flex>
          </Heading>
        </CardHeader>

        <CardBody fontSize="small">
          <List spacing={4}>
            <ListItem>
              <strong>{t('portal_profile_project_phase')}:</strong>{' '}
              {projectInfo.phase || '-'}
            </ListItem>
            <ListItem>
              <strong>{t('portal_profile_project_start_date')}:</strong>{' '}
              {projectInfo.projectStartDate
                ? formatDate(projectInfo.projectStartDate, 'dd/MM/yyyy', locale)
                : '-'}
            </ListItem>
            <ListItem>
              <strong>{t('portal_profile_project_estimated_end_date')}:</strong>{' '}
              {projectInfo.estimatedEndDate
                ? formatDate(projectInfo.estimatedEndDate, 'dd/MM/yyyy', locale)
                : '-'}
            </ListItem>
          </List>
        </CardBody>
      </Card>
      <ProjectInfoModal
        isProjectInfoModalOpen={isProjectInfoModalOpen}
        toggleProjectInfoModal={toggleProjectInfoModal}
        projectStatus={projectInfo.projectStatus}
      />
    </>
  );
};
export default ProjectInfo;
