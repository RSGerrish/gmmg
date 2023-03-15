import { ApplicationShell } from "../components/ApplicationShell";
import { ItemsDisplay } from "../components/ItemsDisplay";

export default function Order() {

  return (
    <ApplicationShell isConnected={false} childEle={<ItemsDisplay />} />
  )
}