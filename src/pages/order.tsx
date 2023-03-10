import { Badge, Box, Button, Card, Center, createStyles, Grid, Group, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  cardStyle: {
    margin: '24px',
  },
}));

// export async function getServerSideProps() {
//   const response = await fetch('/api/order');
//   const json = await response.json();

//   console.log(json);

//   if (response.ok) {
//     // return {
//     //   props: { name, size, price, error: false },
//     // }
//   }
//   if (!response.ok) {
//     return {
//       props: { error: true },
//     }
//   }
// }


export function Order() {
  const { classes } = useStyles();
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/order');
      const json = await response.json();

      await setItems(json);

      console.log(items);

      if (response.ok) {
        return;
      }
      if (!response.ok) {
        return;     }
    }

    fetchItems();
  }, []);

  return (
    <Box 
      maw="80%" 
      mx="auto"
      sx={() => ({
        minHeight: '150px',
      })}
    >
      <Box
        maw="980px"
        miw="780px"
        mx="auto"
        sx={(theme) => ({
          borderWidth: '1px',
          borderColor: theme.colors.black,
          borderRadius: '4px',
          borderStyle: 'solid',
          width: '80%',
          minHeight: '100px',
        })}
      >
        <Grid justify='center'>
          {items && items.map((e, i) => (
            <Grid.Col span={4}>
              <Card key={i} mah={480} miw={200} maw={300} shadow="sm" padding="lg" radius="md" withBorder className={classes.cardStyle}>
                <Card.Section>
                  <Image
                    src="/item-springmix.jpg"
                    height={160}
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} size="md">{e.name}</Text>
                  <Badge color="orange" variant="light">
                    On Sale
                  </Badge>
                </Group>

                <Text size="xs" color="dimmed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </Text>

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  Buy Now
                </Button>
              </Card>
            </Grid.Col>
            // <div key={i} className="card-container">
            //   <div>{e.name}</div>
            //   <div>{e.size}</div>
            //   <div>{e.price}</div>
            // </div>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Order;