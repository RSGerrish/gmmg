import { createStyles, Container, Group, Anchor, rem, useMantineTheme, Text } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';
import GmmGLogo from './GmmGLogo';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    width: '100%',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function FooterSimple({ links }: FooterSimpleProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      <GmmGLogo size={55} tColor={theme.colors.smokeyBlack[0]} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}