import { ApplicationShell } from "../components/ApplicationShell";
import { AboutSection } from "../components/AboutSection";

export function About() {

  return ( 
    <ApplicationShell childEle={<AboutSection />} isConnected={false} />
  );
}

export default About;