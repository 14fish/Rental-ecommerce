import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const CustomCheckbox = withStyles({
  root: {
    color: "#ee8762",
    "&$checked": {
      color: "#ee8762",
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);
