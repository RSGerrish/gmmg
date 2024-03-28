import { Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { AddItem } from '../components/AddItem';
import { ManageItems } from "../components/ManageItems";
import dbConnect from '../lib/mongodb'
import { ApplicationShell } from "../components/ApplicationShell";

type AppProps = {
  isConnected:Boolean,
}

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

export default function Dashboard(props: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isConnected } = props;


  useEffect(() => {
    if (typeof window === 'object') {
      // Check if document is finally loaded
      setIsLoaded(true);
    }
  }, [])

  return (
    <>
      {isLoaded && <PageDisplay />}
    </>
  )
}