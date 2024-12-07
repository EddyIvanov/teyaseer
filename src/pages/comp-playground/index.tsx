import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Icon } from '@/components';

const Index = () => {
  return (
    <VStack
      background={'#cbcbcb'}
      gap={8}
      p={12}
      w={'100%'}
      alignItems={'start'}
    >
      <VStack gap={4}>
        <Heading>Large buttons</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text size={'lg'}>Large inverted</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button size={'lg'} variant={'secondaryInverted'}>
              VIEW ROOM SIZES
            </Button>
            <Button
              size={'lg'}
              variant={'primary'}
              rightIcon={<Icon name="arrowRight" />}
            >
              VIEW ROOM SIZES
            </Button>
            <IconButton
              variant={'secondaryInverted'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
      <VStack gap={4}>
        <Heading>UAE Pass</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Links</Text>
            <Button variant="link">Learn more</Button>
            <Button
              variant="link"
              rightIcon={
                <Icon name="arrowRight" width={'18px'} height={'18px'} />
              }
            >
              Learn more
            </Button>
            <Button
              variant="link"
              rightIcon={
                <Icon name="arrowRight" width={'18px'} height={'18px'} />
              }
              isDisabled
            >
              Learn more
            </Button>
          </Box>
          <VStack gap={4}>
            <Text>CONTINUE WITH UAE PASS تسجيل الدخول بالهوية الرقمية</Text>
            <Button
              leftIcon={<Icon name="fingerPrint" />}
              variant="primaryInverted"
            >
              CONTINUE WITH UAE PASS
            </Button>
            <Button
              rightIcon={<Icon name="fingerPrint" />}
              variant="primaryInverted"
            >
              تسجيل الدخول بالهوية الرقمية
            </Button>
          </VStack>
          <Box>
            <Button
              leftIcon={<Icon name="fingerPrint" />}
              variant="primaryInverted"
            >
              CONTINUE WITH UAE PASS
            </Button>
          </Box>
        </HStack>
      </VStack>

      <VStack gap={4}>
        <Heading>Primary</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Default</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button variant={'primary'}>BROWSE VILLAS</Button>
            <Button variant={'primary'} rightIcon={<Icon name="arrowRight" />}>
              BROWSE VILLAS
            </Button>
            <IconButton
              variant={'primary'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Disabled</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button isDisabled variant={'primary'}>
              BROWSE VILLAS
            </Button>
            <Button
              isDisabled
              variant={'primary'}
              rightIcon={<Icon name="arrowRight" />}
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              isDisabled
              variant={'primary'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
      <VStack gap={4}>
        <Heading>Primary inverted</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Default</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button variant={'primaryInverted'}>BROWSE VILLAS</Button>
            <Button
              variant={'primaryInverted'}
              rightIcon={
                <Icon name="arrowRight" width={'18px'} height={'18px'} />
              }
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              variant={'primaryInverted'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Disabled</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button isDisabled variant={'primaryInverted'}>
              BROWSE VILLAS
            </Button>
            <Button
              isDisabled
              variant={'primaryInverted'}
              rightIcon={<Icon name="arrowRight" />}
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              variant={'primaryInverted'}
              isDisabled
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
      <VStack gap={4}>
        <Heading>Secondary</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Default</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button variant={'secondary'}>BROWSE VILLAS</Button>
            <Button rightIcon={<Icon name="arrowRight" />}>
              BROWSE VILLAS
            </Button>
            <IconButton
              variant={'secondary'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Disabled</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button isDisabled variant={'primaryInverted'}>
              BROWSE VILLAS
            </Button>
            <Button
              isDisabled
              variant={'primaryInverted'}
              rightIcon={<Icon name="arrowRight" />}
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              isDisabled
              variant={'secondary'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
      <VStack gap={4}>
        <Heading>Secondary Inverted</Heading>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Default</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button variant={'secondaryInverted'}>BROWSE VILLAS</Button>
            <Button
              variant={'secondaryInverted'}
              rightIcon={<Icon name="arrowRight" />}
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              variant={'secondaryInverted'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
        <HStack w={100} gap={8}>
          <Box>
            <Text>Disabled</Text>
          </Box>
          <ButtonGroup gap={6}>
            <Button isDisabled variant={'secondaryInverted'}>
              BROWSE VILLAS
            </Button>
            <Button
              isDisabled
              variant={'secondaryInverted'}
              rightIcon={<Icon name="arrowRight" />}
            >
              BROWSE VILLAS
            </Button>
            <IconButton
              isDisabled
              variant={'secondaryInverted'}
              aria-label="Some action"
              icon={<Icon name="arrowRight" width={'18px'} height={'18px'} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Index;
