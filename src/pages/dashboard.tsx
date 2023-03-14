import { Box, Space } from "@mantine/core";
import { AddItem } from '../components/AddItem';
import { ManageItems } from "../components/ManageItems";

export function Dashboard() {
  return (
    <Box 
      maw="90%" 
      mx="auto"
      sx={() => ({
        minHeight: '150px',
      })}
    >
      <AddItem />
      <Space h="lg" />
      <ManageItems />
    </Box>
  )
}

export default Dashboard;