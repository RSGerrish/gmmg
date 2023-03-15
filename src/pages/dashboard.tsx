import { Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { AddItem } from '../components/AddItem';
import { ManageItems } from "../components/ManageItems";
import dbConnect from '../lib/mongodb'
import { ApplicationShell } from "../components/ApplicationShell";

export function PageDisplay() {
  return (
    <>
      <AddItem />
      <Space h="lg" />
      <ManageItems />
    </>
  )
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export function Dashboard({ isConnected }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'object') {
      // Check if document is finally loaded
      setIsLoaded(true);
    }
  }, [])

  return (
    <>
      {isLoaded && <ApplicationShell isConnected={isConnected} childEle={<PageDisplay />} />}
    </>
  )
}

export default Dashboard;