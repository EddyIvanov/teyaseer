import { Card, Flex } from '@chakra-ui/react';

import style from './ProfileSidebar.style';
import HelpSubmissionFormSection from '../HelpSubmissionFormSection/HelpSubmissionFormSection';
import LoanDetails from '../LoanDetails/LoanDetails';
import PersonOfDetermination from '../PersonOfDetermination/PersonOfDetermination';
import ProjectInfo from '../ProjectInfo/ProjectInfo';

import { IMe } from '@/types/user.type';

const ProfileSidebar = (user: IMe) => (
  <Flex sx={style.root}>
    <Card sx={style.infoContainer}>
      <ProjectInfo projectInfo={user.userInfo.projectInfo} />
      <LoanDetails loanInfo={user.userInfo.loanInfo} />
      {user.userInfo.isPersonOfDetermination && <PersonOfDetermination />}
    </Card>
    <Card sx={{ ...style.infoContainer, backgroundColor: '#fff' }}>
      <HelpSubmissionFormSection />
    </Card>
  </Flex>
);

export default ProfileSidebar;
