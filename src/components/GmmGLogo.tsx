import logo from '../../public/robot.png'
import { createStyles, getStylesRef, rem, Image, Text } from '@mantine/core';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  logoPos: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  title: {
    color: `linear-gradient(45deg, ${theme.colors.merriGold[5]}, ${theme.colors.machineGreen[3]})`,
    fontFamily: 'Roboto, sans-serif',
    margin: 'auto',
  },
  imagePos: {
    display: 'flex',
    alignItems: 'center',
  }
}))

type GmmGLogoProps = {
  size: number;
  tColor: string;
};

const GmmGLogo: React.FunctionComponent<GmmGLogoProps>= ({ size, tColor }) => {
  const { classes } = useStyles();

  return ( 
    <div className={classes.logoPos}>
      <Link href="/">
        <Image src={logo.src} width={size} height={size} className={classes.imagePos} />
      </Link>
      <Text 
        className={classes.title}
        color={tColor}
        // variant="gradient"
        // gradient={{ from: theme.colors.merriGold[5], to: theme.colors.machineGreen[2], deg: 45 }}
        size={rem(45)}
        weight='700'
      >GmmG</Text>
    </div>
   );
}

export default GmmGLogo;