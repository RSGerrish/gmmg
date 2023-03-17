import { LeadGrid } from "../../components/LeadGrid";
import { ApplicationShell } from "../../components/ApplicationShell";
import { Box, Button, Center, createStyles, Image, NumberInput, Select, Text, Title, useMantineTheme } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  mainPos: {
    display: "flex",
    maxHeight: '300px',
    flexDirection: "column",
  },
  imgStyle: {
    boxShadow: "0 0 10px 2px lightgrey",
  },
  optContainer: {
    display: "flex",
    flexDirection: "column",
  }
}))

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"; // https://v2ds.netlify.app

  return base_url;
};

export const getStaticPaths = async () => {
  console.log('here!');
  const res = await fetch(checkEnvironment().concat('/api/order'));
  const data = await res.json();
  console.log(data, 'data');

  const paths = data.map(item => {
    return {
      params: { id: item._id.toString() }
    }
  })

  console.log(paths, 'paths');

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const response = await fetch(checkEnvironment().concat('/api/order/' + id));
  const json = await response.json();

  console.log(json, 'json');

  if (response.ok) {
    return {
      props: { item: json }
    }
  };
  if (!response.ok) {
    return;     
  }
}

const Main = ({ item }) => {
  const { classes } = useStyles();

  return(
    <Center className={classes.mainPos}>
      {/* <Box
        sx={(theme => ({
          boxShadow: "1px 1px 3px black"
        }))}
      > */}
        <Image src={item.imgUrl} height={300} width={300} mt={160} className={classes.imgStyle} fit="fill" />
      {/* </Box> */}
      <Title order={1} weight={200}>{item.name}</Title>
      <Text fw={100} fz="md">{item.description}</Text>
    </Center>
  )
}

const Secondary = ({ item }) => {
  const { classes } = useStyles();
  const [price, setPrice] = useState<number>(0);
  const [quant, setQuant] = useState<number | "">(1);
  const theme = useMantineTheme();

  const keys = Object.keys(item.options);
  let data = [];
  
  data = keys.map(key => {
    return { "value": item.options[key], label: key };
  })

  console.log(data, 'data');

  return (
    <Center className={classes.optContainer}>
      <Box
        sx={(theme => ({
          display: 'grid',
          gridTemplateColumns: '150px 80px 125px',
          gap: '20px',
          alignItems: "flex-end",
        }))}
      >
        <Select
          placeholder='Choose Size'
          label='Size'
          data={data}
          value={price}
          onChange={setPrice}
          w={150}
        />
        <NumberInput 
          defaultValue={1}
          label="Quantity"
          w={80}
          value={quant}
          onChange={setQuant}
        />
        <Text ta="right" fz="xl" c={theme.colors.pink[8]} fw={700}>${price * quant}</Text>
      </Box>
      <Box
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          justifyContent: "center",
        })}
      >
        <Button
          mt={24}
          w="80%"
          miw="200px"
        >Add To Cart</Button>
      </Box>
    </Center>
  )
}

const PageDisplay = ({ item }) => {
  console.log(item, 'PageDisplay');
  return (
    <Center>
      <LeadGrid primary={<Main item={item}/>} secondary={<Secondary item={item} />} />
    </Center>
  )
}

const Details = ({ item }) => {
  console.log(item, 'Details');
  return (
    <ApplicationShell isConnected={false} childEle={<PageDisplay item={item}/>}/>
  )  
}

export default Details;