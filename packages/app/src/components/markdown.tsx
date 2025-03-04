import css from '@styled-system/css';
import React, { ElementType, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { ExternalLink } from '~/components/external-link';
import { useIntl } from '~/intl';
import { nestedHtml } from '~/style/preset';
import { isAbsoluteUrl } from '~/utils/is-absolute-url';
import { Link } from '~/utils/link';
import { DisplayOnMatchingQueryCode } from './display-on-matching-query-code';
import { Message } from './message';
import { Anchor } from './typography';

interface MarkdownProps {
  content: string;
  renderersOverrides?: { [nodeType: string]: ElementType };
}
interface LinkProps {
  children: ReactNode;
  href: string;
}

const renderers = {
  link: (props: LinkProps) =>
    isAbsoluteUrl(props.href) ? (
      <ExternalLink href={props.href}>{props.children}</ExternalLink>
    ) : (
      <Link href={props.href} passHref>
        <Anchor underline>{props.children}</Anchor>
      </Link>
    ),

  /**
   * The code element is hijacked to display context-aware pieces of content.
   * usage:
   *
   *     ```VR09,VR16
   *     This will only be displayed on routes with a code equal to VR09 or VR16.
   *     ```
   *
   * Tildes are also accepted:
   *
   *     ~~~VR09,VR16
   *     This will only be displayed on routes with a code equal to VR09 or VR16.
   *     ~~~
   */
  code: ({ language, value }: { language: string | null; value: string }) => (
    <DisplayOnMatchingQueryCode code={language || ''}>
      <Markdown content={value} />
    </DisplayOnMatchingQueryCode>
  ),

  /**
   * The blockquote element is hijacked for displaying "warning" or "message" banner.
   * We also have to reset the parent styles when a double blockquote ("messages") is
   * passed along to show the proper styling of the last blockquote ("messages").
   */
  blockquote: (props: { children: ReactNode; node: any }) => {
    const hasChildBlockquote = props.node.children[0].type === 'blockquote';

    return (
      <Message
        variant={hasChildBlockquote ? 'message' : 'warning'}
        resetParentStyles={hasChildBlockquote}
      >
        {props.children}
      </Message>
    );
  },
};

export function Markdown({ content, renderersOverrides }: MarkdownProps) {
  const { dataset } = useIntl();
  const source = dataset === 'keys' ? `✅${content}` : content;
  return (
    <StyledReactMarkdown
      source={source}
      renderers={{
        ...renderers,
        ...renderersOverrides,
      }}
    />
  );
}

const StyledReactMarkdown = styled(ReactMarkdown)(css(nestedHtml));
