import React from 'react';

import { Button, Flex } from '@chakra-ui/react';

import onboardingSingleChoiceStyle from './OnboardingSingleChoice.style';
import { OnboardingSingleChoiceProps } from './OnboardingSingleChoice.type';
import BackButton from '../BackButton';

import { ContentfulRichText, PulseArticle } from '@/components';
import { OnboardingOption } from '@/types/ContentFul.type';

const OnboardingSingleChoice = (props: OnboardingSingleChoiceProps) => {
  const {
    questionData,
    selectedOptions,
    goToNextQuestion,
    goToPrevQuestion,
    isLoading,
  } = props;

  const onNextButtonClick = (option: OnboardingOption) => {
    goToNextQuestion(questionData, option);
  };

  const onBackButtonClick = () => {
    goToPrevQuestion();
  };

  return (
    <PulseArticle
      style={onboardingSingleChoiceStyle}
      backgroundImage={questionData.fields.backgroundImage}
      backButtonNode={
        questionData.sys.id != selectedOptions[1].id ? (
          <BackButton
            onClick={() => onBackButtonClick()}
            isDisabled={isLoading}
          />
        ) : undefined
      }
    >
      {!!questionData.fields.title && (
        <ContentfulRichText
          document={questionData.fields.title}
          className="onboardingPulseArticleParagraph"
        />
      )}

      {!!questionData.fields.questionText && (
        <ContentfulRichText
          document={questionData.fields.questionText}
          className="onboardingPulseArticleParagraph"
        />
      )}

      <Flex __css={onboardingSingleChoiceStyle.onboardingChoices}>
        {questionData.fields.questionOptions &&
          questionData.fields.questionOptions.map(option => (
            <Button
              key={option.sys.id}
              onClick={() => {
                onNextButtonClick(option);
              }}
              variant="secondary"
              isDisabled={isLoading}
            >
              {option.fields.text}
            </Button>
          ))}
      </Flex>
    </PulseArticle>
  );
};

export default OnboardingSingleChoice;
