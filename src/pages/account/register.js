// Libraries
import { Grid } from "baseui/layout-grid";

// Components
import Form from "../../components/register/form";
import PageTitle from "../../components/shared/pageTitle";
import Header from "../../components/shared/header";

// Utils
import gridJustifyContentCenter from "../../utils/gridJustifyContentCenter";

function Register() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Header />
      <PageTitle cellSpan={4} title="Create account" />
      <Form />
    </Grid>
  );
}

export default Register;
