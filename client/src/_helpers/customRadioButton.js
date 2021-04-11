import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";

export const CustomRadioButton = withStyles({
  root: {
    color: "#ee8762",
    "&$checked": {
      color: "#ee8762",
    },
  },
  checked: {},
})((props) => <Radio color='default' {...props} />);
