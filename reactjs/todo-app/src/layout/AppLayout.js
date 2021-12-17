import {Frame} from "@shopify/polaris";
import TopBar from "../components/TopBars"

const AppLayout = ({children}) => {
  return (
      <Frame topBar={<TopBar />}>
          {children}
      </Frame>
  );
};

export default AppLayout;
