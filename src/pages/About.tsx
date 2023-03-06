import { Box, BackgroundImage, Center, createStyles, rem } from '@mantine/core';


// Images
import bgArugula from '../../public/bg-arugula.jpg';

const useStyles = createStyles((theme) => ({
  boxStyle: {
    minHeight: rem(250),
  },
  bgImageStyle: {
    minHeight: rem(250),
  },
  textStyle: {
    color: theme.white,
    fontSize: rem(64),
  },
}))

export function About() {
  const { classes } = useStyles();

  return ( 
    <Box maw="80%" mx="auto" className={classes.boxStyle}>
      <BackgroundImage
        src={bgArugula.src}
        radius='md'
        className={classes.bgImageStyle}>
        <Center p="md">
          <h1 className={classes.textStyle}>About</h1>
        </Center>
      </BackgroundImage>
    </Box>
  );
}

export default About;