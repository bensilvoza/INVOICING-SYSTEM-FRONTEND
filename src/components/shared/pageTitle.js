// Libraries
import { Cell } from "baseui/layout-grid";

// Components
import Spacer from "./spacer";

// CSS
import "./page-title.css";

function PageTitle(props) {
  return (
    <Cell span={props.cellSpan}>
      <Spacer val="2rem" />
      <p className="page-title">{props.title}</p>
    </Cell>
  );
}

export default PageTitle;
