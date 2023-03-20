import { createStyles, Grid, Image, List, Popover, Text, Title } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useCartContext } from "../hooks/useCartContext";

const useStyles = createStyles((theme) => ({
  listStyle: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
  listItemStyle: {
    '&:hover': {
      backgroundColor: theme.colors.merriGold[2],
      cursor: 'default',
    }
  },
  gridColStyle: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default function Cart() {
  const {cart} = useCartContext();
  const { classes } = useStyles();

  let cartItems = <></>;

  console.log(cart, 'cart');

  // Create Cart Menu Items
  if (cart) {
    cartItems = cart.map((item, index) => {
      return (
        <Grid key={index} className={classes.listItemStyle} gutter={5} grow>
          <Grid.Col span={2} className={classes.gridColStyle}>
            <Image width={55} height={55} src={item.imgUrl} />
          </Grid.Col>
          <Grid.Col span={4} className={classes.gridColStyle}>
            <Title order={4}>{item.name}</Title>
          </Grid.Col>
          <Grid.Col span={1} className={classes.gridColStyle}>
            {item.optionsOrdered.size && <Text>{item.optionsOrdered.size}</Text>}
          </Grid.Col>
          <Grid.Col span={1} className={classes.gridColStyle}>
            {item.optionsOrdered.quantity && <Text>{item.optionsOrdered.quantity.toString()}</Text>}
          </Grid.Col>
          <Grid.Col span={1} className={classes.gridColStyle}>
          {item.optionsOrdered.price && <Text>@{item.optionsOrdered.price.toString()}</Text>}
          </Grid.Col>
          {console.log(item.optionsOrdered.price)}
          <Grid.Col span={1} className={classes.gridColStyle}>
            {item.optionsOrdered.price && <Text>${((item.optionsOrdered.quantity * item.optionsOrdered.price).toString())}</Text>}
          </Grid.Col>
        </Grid>
      )
    })
  }
  if (!cart) {
    cartItems = <List.Item>No Items</List.Item>
  }

  return (
    <Popover width={450}>
      <Popover.Target>
        <IconShoppingCart
          size={36}
          strokeWidth={2}
          color={'#FFFAF0'}
          className={classes.listStyle}
        />
      </Popover.Target>
      <Popover.Dropdown w={325}>
        <List listStyleType="none">
          {cartItems}
        </List>
      </Popover.Dropdown>
    </Popover>
  )
}