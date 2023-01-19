// Libraries
import { Grid } from "baseui/layout-grid";

// Components
import Header from "../../components/shared/header";
import PageTitle from "../../components/shared/pageTitle";
import Form from "../../components/invoice/create/form";

// Utils
import gridJustifyContentCenter from "../../utils/gridJustifyContentCenter";

function Create() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Header />
      <PageTitle cellSpan={8} title="Create invoice" />
      <Form />
    </Grid>
  );
}

export default Create;
