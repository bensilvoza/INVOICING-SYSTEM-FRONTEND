// Libraries
import { Grid } from "baseui/layout-grid";

// Components
import Form from "../../components/login/form";
import PageTitle from "../../components/shared/pageTitle";
import Header from "../../components/shared/header";

// Utils
import gridJustifyContentCenter from "../../utils/gridJustifyContentCenter";

function Login() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Header />
      <PageTitle cellSpan={4} title="Log in" />
      <Form />
    </Grid>
  );
}

export default Login;
