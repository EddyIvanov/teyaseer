import React from 'react';

import { Flex } from '@chakra-ui/react';

import { VillaDesignsSectionProps } from './VillaDesignsSection.type';
import VillaDesignSection from './components/VillaDesignSection';

const VillaDesignsSection = (props: VillaDesignsSectionProps) => {
  const areFeaturedVillasAvailable = props.villaDesignTypes.some(
    villaDesignType => {
      return villaDesignType.fields.villas.some(villa => {
        return villa.fields.isFeatured;
      });
    }
  );

  return (
    <>
      {areFeaturedVillasAvailable ? (
        <Flex
          id={props.id}
          sx={{
            flexDirection: 'column',
            py: {
              base: '48px',
              lg: '96px',
              '2xl': '128px',
            },
            gap: {
              base: '64px',
              lg: '152.96px',
            },
          }}
        >
          {props.villaDesignTypes.map(villaDesignType => (
            <VillaDesignSection
              key={villaDesignType.fields.contentType}
              villaDesign={villaDesignType}
            />
          ))}
        </Flex>
      ) : null}
    </>
  );
};

export default VillaDesignsSection;
