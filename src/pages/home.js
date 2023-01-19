// Libraries
import { Grid } from "baseui/layout-grid";

// Components
import Header from "../components/shared/header";
import ListOfInvoice from "../components/home/listOfInvoice";
import PageTitle from "../components/shared/pageTitle";
import CreateInvoiceButton from "../components/home/createInvoiceButton";

// Utils
import gridJustifyContentCenter from "../utils/gridJustifyContentCenter";

function Home() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Header />
      <PageTitle cellSpan={8} title={"List of statement"} />
      <CreateInvoiceButton />
      <ListOfInvoice />
    </Grid>
  );
}

export default Home;
