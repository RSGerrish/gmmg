import { Box, Button, createStyles, Select, Title } from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  titlePos: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '20px 30px',
  },
}));

const handleDelete = async (index:String) => {
  const response = await fetch('/api/order/' + index, {
    method: 'DELETE',
  });
  const json = await response.json();

  if (response.ok) {
    console.log(json);
  }

  const imgUrl = json.imgUrl;
  await fetch(imgUrl, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

interface Options {
  [key: string]: string,
}

interface StoreItem {
  imgUrl: string,
  _id: number,
  __v: number,
  description: string,
  name: string,
  onSale: boolean,
  options: Options,
  quantity: number
}

export function ManageItems() {
  const { classes } = useStyles();
  const [index, setIndex] = useState('');
  const [sData, setSData] = useState([]);

  useEffect(() => {
    const selectData:[] = [];

    const fetchItems = async () => {
      const response = await fetch('/api/order');
      const json:[] = await response.json();

      console.log(json, 'json')

      json.map(e => {
        selectData.push({ value: e._id, label: e.name });
      });

      console.log(selectData, 'selectData');
      setSData(selectData);

      if (response.ok) {
        return;
      }
      if (!response.ok) {
        return;     }
    }

    fetchItems();
  }, [])

  return (
    <Box
      maw="80%"
      mx="auto"
      sx={(theme) => ({
        borderWidth: '1px',
        borderColor: theme.colors.gray[5],
        borderRadius: '4px',
        borderStyle: 'solid',
        minWidth: '980px',
        height: '450px',
      })}
    >
      <div className={classes.titlePos}>
        <Title order={2}>Manage Items</Title>
      </div>
      <Select data={sData} w={300} ml={30} mb={30} onChange={setIndex} value={index} />
      <Button onClick={async () => {
        await handleDelete(index);

        const sepData = sData.filter(e => e.value != index);
        setSData(sepData);
        setIndex('');
      }} ml={30}>Delete</Button>
    </Box>
  )
}