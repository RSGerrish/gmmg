import { Box, BackgroundImage, Center, createStyles, rem } from '@mantine/core';
import { LeadGrid } from './LeadGrid';

// Images
import bgArugula from '../../public/bg-arugula.jpg';

export function Lander() {
  return ( 
    <Box 
      maw="80%" 
      mx="auto" 
      sx={(theme) => ({
        minHeight: rem(100),
      })}
    >
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