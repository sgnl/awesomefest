// @flow
import glamorous from 'glamorous';

export const Wrapper = glamorous.div({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 40px',
  fontFamily: '"Noto Sans", sans-serif'
});

export const PageTitle = glamorous.h1({
  margin: 0,
  padding: 0,
  fontSize: '1rem',
  color: '#f2f940',
  textTransform: 'uppercase',
  textShadow: '2px 2px 2px black, 4px 4px 2px white'
});

export const Button = glamorous.button({
  margin: '1rem 0',
  padding: '1rem',
  textTransform: 'uppercase',
  textDecoration: 'underline'
});

export const ActListHeader = glamorous.h1({
  position: 'relative',
  padding: '1rem 0.5rem',
  textTransform: 'uppercase',
});
export const ActListHeaderTitle = glamorous.span({
  position: 'absolute',
  top: '5px',
  right: 0,
  left: 0,
  fontSize: '1rem',
  fontWeight: 400,
  color: '#eee',
  textAlign: 'center',
  textShadow: '1px 1px 3px black'
});
export const ActListHeaderName = glamorous.span({});
