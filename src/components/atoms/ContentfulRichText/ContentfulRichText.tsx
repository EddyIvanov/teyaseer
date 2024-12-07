import React from 'react';

import { Button, Flex, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Block, Inline } from '@contentful/rich-text-types';
import { useRouter } from 'next/navigation';

import ContentfulRichTextProps from './ContentfulRichText.type';
import { BUTTON_VARIANTS, HEADING_TYPES } from './constants';
import { isChildrenEmptyString, isEmptyHtml } from './utils';

import { Link, Icon } from '@/components';
import { isExternalUrl } from '@/helpers/isExternalUrl';

const ContentfulRichText = ({
  document,
  className,
  linkAsButton = false,
  variant,
  hyperlinkType = 'Link',
  children,
  getParagraphNode,
  getHeaderNode,
  getHyperlinkNode,
}: ContentfulRichTextProps) => {
  const style = useMultiStyleConfig('ContentfulRichText', {
    variant,
  });
  const router = useRouter();

  // default variant is not accessible here, so we can't use props.variant === 'dynamicContent'
  const isDynamicContent = variant !== 'unstyled';

  const handleHeading = (node: Block | Inline, children: React.ReactNode) => {
    if (isChildrenEmptyString(children)) return null;

    return (
      <>
        {getHeaderNode ? (
          getHeaderNode(node, children)
        ) : (
          <Text as={HEADING_TYPES[node.nodeType]}>{children}</Text>
        )}
      </>
    );
  };

  const handleParagraph = (node: Block | Inline, children: React.ReactNode) => {
    // Return null when there is no children to remove extra p tags
    if (isChildrenEmptyString(children)) return null;

    const onlyTextNodes = node.content.every(node => node.nodeType === 'text');

    // Handle scenario when there is no hyperlink, etc
    if (onlyTextNodes) {
      return (
        <>
          {getParagraphNode ? (
            getParagraphNode(node, children)
          ) : (
            <p>{children}</p>
          )}
        </>
      );
    } else {
      // Handle scenario when there is hyperlink, etc
      return <>{children}</>;
    }
  };

  const handleHyperlink = (node: Block | Inline, children: React.ReactNode) => {
    const target = isExternalUrl(node.data.uri) ? '_blank' : '_self';
    return (
      <>
        {getHyperlinkNode ? (
          getHyperlinkNode(node, children)
        ) : (
          <Link
            target={target}
            href={node.data.uri || '#'}
            pointerEvents={'all'}
          >
            {children}{' '}
            {isDynamicContent && <Icon name={'arrowRight'} w="18px" h="18px" />}
          </Link>
        )}
      </>
    );
  };

  const handleHyperlinkAsButton = (
    node: Block | Inline,
    children: React.ReactNode
  ) => {
    const handleOnClick = () => {
      if (isExternalUrl(node.data.uri) && node.data.uri !== '#') {
        window.open(node.data.uri, '_blank');
      } else {
        router.push(node.data.uri || '#');
      }
    };

    return (
      <>
        {getHyperlinkNode ? (
          getHyperlinkNode(node, children)
        ) : (
          <Button
            pointerEvents={'all'}
            onClick={() => handleOnClick()}
            variant={BUTTON_VARIANTS[hyperlinkType]}
            rightIcon={<Icon name="arrowRight" w="18px" h="18px" />}
          >
            {children}
          </Button>
        )}
      </>
    );
  };

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: handleParagraph,
      [BLOCKS.HEADING_1]: handleHeading,
      [BLOCKS.HEADING_2]: handleHeading,
      [BLOCKS.HEADING_3]: handleHeading,
      [BLOCKS.HEADING_4]: handleHeading,
      [BLOCKS.HEADING_5]: handleHeading,
      [BLOCKS.HEADING_6]: handleHeading,
      [INLINES.HYPERLINK]:
        linkAsButton || hyperlinkType !== 'Link'
          ? handleHyperlinkAsButton
          : handleHyperlink,
    },
  };
  try {
    const nodes = documentToReactComponents(document, renderOptions);

    if (isEmptyHtml(nodes)) {
      return;
    }

    return (
      <Flex __css={style} className={className ? className : ''}>
        {nodes}
        {children}
      </Flex>
    );
  } catch (e) {
    return null;
  }
};

export default ContentfulRichText;
