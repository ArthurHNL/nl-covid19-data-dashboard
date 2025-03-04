import { Close, Search } from '@corona-dashboard/icons';
import css from '@styled-system/css';
import { MouseEvent, useRef } from 'react';
import styled from 'styled-components';
import { Box } from '~/components/base';
import { VisuallyHidden } from '~/components/visually-hidden';
import { useIntl } from '~/intl';
import { useSearchContext } from './context';

const ICON_SPACE = 50;
const ICON_SPACE_LARGE = 66;

export function SearchInput() {
  const { siteText } = useIntl();
  const { id, inputProps, setTerm } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box position="relative">
      <IconContainer align="left">
        <Search />
      </IconContainer>

      {inputProps.value && (
        <IconContainer
          as="button"
          align="right"
          onClick={(evt: MouseEvent) => {
            evt.stopPropagation();
            inputRef.current?.focus();
            setTerm('');
          }}
        >
          <VisuallyHidden>{siteText.search.clear}</VisuallyHidden>
          <Close />
        </IconContainer>
      )}

      <VisuallyHidden>
        <label htmlFor={`${id}-input`}>{siteText.search.placeholder}</label>
      </VisuallyHidden>

      <StyledSearchInput
        ref={inputRef}
        type="search"
        id={`${id}-input`}
        placeholder={siteText.search.placeholder}
        autoComplete="off"
        {...inputProps}
      />
    </Box>
  );
}

export const paddedStyle = css({
  p: '1rem',
  px: [ICON_SPACE, null, null, ICON_SPACE_LARGE],
});

const StyledSearchInput = styled.input(
  paddedStyle,
  css({
    fontFamily: 'body',
    display: 'block',
    width: '100%',
    borderRadius: 1,
    border: `solid`,
    borderWidth: '1px',
    borderColor: 'border',
    fontSize: 2,
    appearance: 'none',
    m: 0,

    '&:focus': {
      outline: '2px dotted currentColor !important',
    },

    '&::-webkit-search-cancel-button': {
      display: 'none',
    },

    '&::-ms-clear': {
      display: 'none',
    },

    '&:placeholder-shown': {
      pr: 2,
    },

    '[aria-expanded="true"] &': {
      borderColor: 'blue',
      borderBottomColor: 'border',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  })
);

const IconContainer = styled.div<{ align: 'left' | 'right' }>((x) =>
  css({
    zIndex: 1,
    color: 'black',
    position: 'absolute',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: [ICON_SPACE, null, null, ICON_SPACE_LARGE],
    pointerEvents: x.onClick ? 'all' : 'none',

    top: 0,
    left: x.align === 'left' ? 0 : undefined,
    right: x.align === 'right' ? 0 : undefined,

    background: 'none',
    border: 0,
    p: 0,
    m: 0,
    cursor: 'pointer',

    svg: {
      width: 24,
      height: 24,
    },
  })
);
