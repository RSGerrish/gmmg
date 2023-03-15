import dbConnect from '../lib/mongodb'

// Components
import { ApplicationShell } from '../components/ApplicationShell';
import Lander from '../components/Lander';

// Connect to DB
export async function getServerSideProps(context) {
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

// Render App
export default function Home({ isConnected }) {
    return (
      <ApplicationShell childEle={<Lander />} isConnected={isConnected} />
    )
  // }
}
