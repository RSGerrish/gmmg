import { LeadGrid } from "../../components/LeadGrid";
import { Box, Button, Center, createStyles, Image, NumberInput, Select, Text, Title, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCartContext } from "../../hooks/useCartContext";
import { useUser } from "@auth0/nextjs-auth0/client";

const useStyles = createStyles((theme) => ({
  mainPos: {
    display: "flex",
    minHeight: '350px',
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

const handleAddToCart = async (dispatch, item, price, quant, authUser) => {
  // Fetch users and store them as objects in an array
  const response = await fetch('/api/users');
  const users = await response.json();

  //Define an empty object to be the matched user once found
  let matchUser = {};

  // Iterate through the list of users
  for (let i = 0; i < users.length; i++) {
    // If one of the DB email properties matches the name (email) of the authUser
    if (users[i].email === authUser.user.name) {
      // set matchUser equal to the single user that was matched
      matchUser = users[i];
      console.log('match!');
    }
  }

  console.log(item, 'item');
  matchUser.cart.push(item);
  console.log(matchUser.cart, 'matchUser cart');
  matchUser.cart[matchUser.cart.length - 1].optionsOrdered = { "size": '2 oz', "quantity": quant, "price": price };
  console.log(matchUser, 'matchUser');
  const { name, email, admin, lastLogin, cart } = matchUser;
  const newUser = { name, email, admin, lastLogin, cart };
  console.log(newUser, 'newUser');

  const res = await fetch('/api/users/' + matchUser._id, {
    method: 'PATCH',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(res);

  const json = await res.json();

  console.log('response received');

  if (!res.ok) {
    console.log('error');
  }
  if (res.ok) {
    console.log(json);
    dispatch({type: 'ADD_ITEM', payload: item})
  }
}

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
  // console.log(data, 'data');

  const paths = data.map(item => {
    return {
      params: { id: item._id.toString() }
    }
  })

  // console.log(paths, 'paths');

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const response = await fetch(checkEnvironment().concat('/api/order/' + id));
  const json = await response.json();

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
      <Title order={1} weight={300} mt={10}>{item.name}</Title>
      <Image src={item.imgUrl} height={350} width={350} mt={5} className={classes.imgStyle} fit="fill" />
      <Text fw={100} fz="md" mt={10}>{item.description}</Text>
    </Center>
  )
}

const Secondary = ({ item }) => {
  const { classes } = useStyles();
  const [price, setPrice] = useState<number>(0);
  const [quant, setQuant] = useState<number | "">(1);

  const theme = useMantineTheme();
  const authUser = useUser();

  const { dispatch } = useCartContext();

  const keys = Object.keys(item.options);
  let data = [];
  
  data = keys.map(key => {
    return { "value": item.options[key], "label": key };
  })

  useEffect(() => {
    console.log(item.options['2 oz'], ' * ', quant);
    setPrice(item.options['2 oz'] * quant);
  }, []) 

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
          onClick={() => handleAddToCart(dispatch, item, price, quant, authUser)}
        >Add To Cart</Button>
      </Box>
    </Center>
  )
}

const Details = ({ item }) => {
  // console.log(item, 'Details');
  return (
    <Center>
      <LeadGrid primary={<Main item={item}/>} secondary={<Secondary item={item} />} />
    </Center>
  )  
}

export default Details;