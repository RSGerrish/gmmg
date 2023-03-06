import { Box, BackgroundImage, Center, createStyles, rem } from '@mantine/core';
import { LeadGrid } from '../components/LeadGrid';

// Images
import bgArugula from '../../public/bg-arugula.jpg';

const useStyles = createStyles((theme) => ({
  boxStyle: {
    minHeight: rem(100),
  },
}))

export function Lander() {
  const { classes } = useStyles();

  return ( 
    <Box maw="80%" mx="auto" className={classes.boxStyle}>
      <BackgroundImage
        src={bgArugula.src}
        radius='md'>
        <Center p="md">
          <LeadGrid />
        </Center>
      </BackgroundImage>
    </Box>
  );
}

export default Lander;