import { Badge, Box, Button, Card, Center, Container, createStyles, FileInput, Group, Image, NumberInput, rem, Select, Space, Switch, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { IconCurrencyDollar } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  shopContainer: {
    borderWidth: '1px',
    borderColor: theme.colors.black,
    borderRadius: '4px',
    borderStyle: 'solid',
    minWidth: '80%',
    minHeight: rem(6),
  },
  formPos: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    gap: '15px',
    alignItems: 'flex-end',
    justifyItems: 'flex-end',
    padding: '20px 0',
    margin: '0 20px',
  },
  titlePos: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  addPos: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  lowerer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '10px',
  },
  containerPos: {
    padding: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  switchPos: {
    height: "fit-content",
  },
  switchBody: {
    height: "fit-content",
  },
  switchLabel: {
    height: "fit-content",
  }
}));

const handleSubmit = async (e: Event, name: String | null, description: String | null, imgPath: String | undefined, options: Object | {}, quantity: Number | '', onSale: Boolean | null) => {
  e.preventDefault();

  const item = {name, description, imgPath, options, quantity, onSale};

  const res = await fetch('/api/order', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'applicatin/json'
    }
  });

  const json = await res.json();

  if (!res.ok) {
    console.log('error');
  }
  if (res.ok) {
    console.log('new item added');
  }
}

export function Dashboard() {
  const { classes } = useStyles();

  const [name, setName] = useState<string | null>('');
  const [options, setOptions] = useState<object | {}>({});
  const [oSize, setSize] = useState<string | null>('');
  const [price, setPrice] = useState<number | ''>(0);
  const [quantity, setQuantity] = useState<number | ''>(0);
  const [disData, setDisData] = useState<[]>([]);
  const [disPrice, setDisPrice] = useState<number | ''>(0);
  const [disDesc, setDisDesc] = useState<string | ''>('');
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [onSale, setOnSale] = useState(false);

  return (
    <Box 
      maw="90%" 
      mx="auto"
      sx={() => ({
        minHeight: '150px',
      })}
    >
      <Box
        maw="80%"
        mx="auto"
        sx={(theme) => ({
          borderWidth: '1px',
          borderColor: theme.colors.gray[5],
          borderRadius: '4px',
          borderStyle: 'solid',
          minWidth: '980px',
          minHeight: '100px',
        })}
      >
        <Center>
          <form 
            className={classes.formPos}
          >
            <div className={classes.titlePos}>
              <Title order={2}>Add a New Item</Title>
            </div>
            <Space h="xl"/>
            <Box
              maw="100%"
              mx="auto"
              sx={(theme) => ({
                minWidth: '100%',
                minHeight: '100px',
                padding: '5px',
              })}
            >
              <TextInput
                placeholder='Item Name'
                label='Item Name'
                onChange={(event) => setName(event.currentTarget.value)}
                value={name}
              />
              <Textarea 
                placeholder="Short Description"
                label="Short Description"
                onChange={(event) => setDisDesc(event.currentTarget.value)}
                value={disDesc}
              />
            </Box>
            <Box
              maw="100%"
              mx="auto"
              sx={(theme) => ({
                borderWidth: '1px',
                borderColor: theme.colors.gray[3],
                borderRadius: '4px',
                borderStyle: 'solid',
                minWidth: '100%',
                minHeight: '100px',
                padding: '5px',
              })}
            >
              <Select
                placeholder='Choose Size'
                label='Size'
                data={[
                  { value: '2 oz', label: '2 oz'},
                  { value: '4 oz', label: '4 oz'},
                  { value: '8 oz', label: '8 oz'}
                ]}
                value={oSize}
                onChange={setSize}
              />
              <TextInput
                type='number'
                label='Price'
                placeholder='27.95'
                value={price}
                onChange={(event) => {
                  setPrice(parseFloat(event.currentTarget.value));
                }}
                icon={<IconCurrencyDollar size="1rem" />}
              />
              <Space h='xs'></Space>
              {/* Add Button */}
              <div className={classes.addPos}>
                <Button 
                  mr={10} 
                  onClick={() => {
                    const obj = options;
                    const array:any = disData;

                    obj[oSize] = price;
                    console.log(obj);
                    array.push({'value': parseFloat(price.toString()).toFixed(2), 'label': `${oSize}`})

                    setOptions(obj);
                    setDisData(array);
                  }}
                >Add</Button>
              </div>
            </Box>
            <FileInput
              w="100%"
              placeholder="Pick an Image"
              label="Image"
              value={itemImage}
              onChange={setItemImage}
            />
            <Container fluid={true} className={classes.containerPos}>
              <TextInput
                type='number'
                label='Quantity (in oz)'
                placeholder='6'
                value={quantity}
                maw="35%"
                onChange={(event) => {
                  setQuantity(parseFloat(event.currentTarget.value));
                }}
              />
              <div className={classes.lowerer}>
                <Switch
                  label="On Sale"
                  classNames={{
                    root: classes.switchPos,
                    body: classes.switchBody,
                    labelWrapper: classes.switchLabel,
                  }}
                  checked={onSale}
                  onChange={(event) => setOnSale(event.currentTarget.checked)}
                />
              </div>
            </Container>
            <Space />
            <Button w="50%" onClick={(e: any) => {
              console.log(`submitting: {${name}, ${oSize}, ${price}}`);
              handleSubmit(e, name, disDesc, itemImage?.name, options, quantity, onSale);
              setName('');
              setDisDesc('');
              setItemImage(null);
              setOptions({});
              setQuantity(0);
              setPrice(0);
              setOnSale(false);
              setDisData([]);

            }}>Submit</Button>
          </form>
          <Card mah={480} miw={200} maw={250} m={20} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              {itemImage && <Image
                src={itemImage.name}
                height={160}
              />}
            </Card.Section>
            <Group position="apart" mt="md" mb="xs" maw="100%">
              <Text weight={500} size="md">{name}</Text>
              {onSale && <Badge color="orange" variant="light">
                On Sale
              </Badge>}
            </Group>

            <Text size="xs" color="dimmed">{disDesc}</Text>
            <Group position="apart" mt={10}>
              <Select maw='50%' data={disData} onChange={setDisPrice} />
              {disPrice && <Badge color="red" variant="filled">$ {disPrice}</Badge>}
            </Group>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Buy Now
            </Button>
          </Card>
        </Center>
      </Box>
      
    </Box>
  )
}

export default Dashboard;