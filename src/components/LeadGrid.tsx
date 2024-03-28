import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';

const PRIMARY_COL_HEIGHT = rem(600);

type AppProps = {
  primary: ReactNode | undefined;
  secondary: ReactNode | undefined;
  tertiary1: ReactNode | undefined;
  tertiary2: ReactNode | undefined;
}

export function LeadGrid({ primary, secondary, tertiary1, tertiary2 }:AppProps) {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container miw="80%" my="md" mx={0} p={0} >
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {/* {primary} */}
        {primary || <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />}
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col>
            {secondary || <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}