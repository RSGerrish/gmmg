import { Badge, Box, Button, Card, Grid, Group, Image, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface StoreItem {
  imgUrl: string,
  _id: number,
  __v: number,
  description: string,
  name: string,
  onSale: boolean,
  options: Object,
  quantity: number
}

export function ItemsDisplay () {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/order');
      const json = await response.json();

      await setItems(json);

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
          {items && items.map((e:StoreItem, i) => (
            <Grid.Col span={4} key={i}>
              <Card mah={480} miw={200} maw={300} shadow="sm" padding="lg" radius="md" withBorder m={24}>
                <Card.Section>
                  <Image
                    src={e.imgUrl}
                    height={160}
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} size="md">{e.name}</Text>
                  <Badge color="orange" variant="light">
                    On Sale
                  </Badge>
                </Group>

                <Text size="xs" color="dimmed">{e.description}</Text>
                <Group position="apart" mt={10}>
                  {e.disData && <Select maw='50%' data={e.options} />}
                  {e.options && <Badge color="red" variant="filled">$ {e.options.price}</Badge>}
                </Group>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  Buy Now
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}