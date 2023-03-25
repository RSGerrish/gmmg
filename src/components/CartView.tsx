import { Button, Center, createStyles, Grid, Group, rem, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useCartContext } from "../hooks/useCartContext";
import { IconX } from '@tabler/icons-react';
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  listStyleLight: {
    backgroundColor: theme.colors.merriGold[1],
  },
  listStyleDark : {
    backgroundColor: theme.colors.merriGold[2],
  },
  iconStyle: {

    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonContainer: {
    marginTop: rem(20),
    paddingTop: rem(10),
    borderTop: '1px solid lightgrey',
  }
}));

export function CartView() {
  const { cart, dispatch } = useCartContext();
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const authUser = useUser();

  let lightDark = false;

  let gridItems:ReactNode;

  // Delete items from the cart
  async function handleDeleteItem (index)  {
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
      }
    }

    matchUser.cart.splice(index, 1);

    console.log(matchUser, 'matchUser');

    const res = await fetch('/api/users/' + matchUser._id, {
      method: 'PATCH',
      body: JSON.stringify(matchUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await res.json();

    if (!res.ok) {
      console.log('error');
    }
    if (res.ok) {
      dispatch({type: 'DELETE_ITEM', payload: cart[index]});
      console.log(json, 'item deleted response');
    }
  }

  // Update items (quantity) in the cart
  async function handleEditItem(newQuant, index) {
    // Fetch users and store them as objects in an array
    const usersResponse = await fetch('/api/users');
    const users = await usersResponse.json();

    //Define an empty object to be the matched user once found
    let matchUser:Object = {};

    // Iterate through the list of users
    for (let i = 0; i < users.length; i++) {
      // If one of the DB email properties matches the name (email) of the authUser
      if (users[i].email === authUser.user.name) {
        // set matchUser equal to the single user that was matched
        matchUser = users[i];
      }
    }

    console.log(matchUser, 'matchUser');

    // console.log(cart, 'cart');
    const newCart = cart;
    newCart[index].optionsOrdered.quantity = newQuant;
    matchUser.cart = newCart;

    const id = matchUser._id;

    console.log(id, 'id');
    const response = await fetch('/api/users/' + id, {
      method: 'PATCH',
      body: JSON.stringify(matchUser)
    });
    
    const json = await response.json();

    console.log(json, 'user');

    console.log('dispatching...');
    dispatch({type: 'EDIT_ITEM', payload: newCart});
  }

  if (cart) {
    gridItems = cart.map((item, index) => {
      if (lightDark) {
        lightDark = false;

        return (
          <Grid key={index} align="flex-start" justify="center" miw={450} className={classes.listStyleLight}>
            <Grid.Col span={3}>{item.name}</Grid.Col>
            <Grid.Col span={2}>{item.optionsOrdered.size}</Grid.Col>
            <Grid.Col span={2}><TextInput size='xs' value={cart[index].optionsOrdered.quantity} onChange={(event) => {
                const newCart = cart;
                newCart[index].optionsOrdered.quantity = event.currentTarget.value

                console.log('dispatching...');
                dispatch({type: 'EDIT_ITEM', payload: newCart});
              }} onBlur={(event) => handleEditItem(event.currentTarget.value, index)} /></Grid.Col>
            <Grid.Col span={2}>${item.optionsOrdered.price}</Grid.Col>
            <Grid.Col span={2}>${item.optionsOrdered.price * item.optionsOrdered.quantity}</Grid.Col>
            <Grid.Col span={1}><IconX size={22} strokeWidth={2} color={theme.colors.smokeyBlack[5]} className={classes.iconStyle} onClick={() => handleDeleteItem(index)} /></Grid.Col>
          </Grid>
        )
      }
      else {
        lightDark = true;

        return (
          <Grid key={index} align="flex-start" justify="center" miw={450} className={classes.listStyleDark}>
            <Grid.Col span={3}>{item.name}</Grid.Col>
            <Grid.Col span={2}>{item.optionsOrdered.size}</Grid.Col>
            <Grid.Col span={2}><TextInput size='xs' value={cart[index].optionsOrdered.quantity} onChange={(event) => {
                const newCart = cart;
                newCart[index].optionsOrdered.quantity = event.currentTarget.value

                console.log('dispatching...');
                dispatch({type: 'EDIT_ITEM', payload: newCart});
              }} onBlur={(event) => handleEditItem(event.currentTarget.value, index)} /></Grid.Col>
            <Grid.Col span={2}>${item.optionsOrdered.price}</Grid.Col>
            <Grid.Col span={2}>${item.optionsOrdered.price * item.optionsOrdered.quantity}</Grid.Col>
            <Grid.Col span={1}><IconX size={22} strokeWidth={2} color={theme.colors.smokeyBlack[5]} className={classes.iconStyle} onClick={() => handleDeleteItem(index)} /></Grid.Col>
          </Grid>
        )
      }
    })
  }

  return (
    <Center>
      <Stack>
        <Stack>
          {gridItems}
        </Stack>
        <Group position="right" className={classes.buttonContainer}>
          <Link href="/order">
            <Button>Back To Store</Button>
          </Link>
          <Link href="/checkout">
            <Button>Checkout</Button>
          </Link>
        </Group>
      </Stack>
    </Center>
  )
}