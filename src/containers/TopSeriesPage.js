import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    marginTop: 50
  }
};

class TopSeriesPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1">
              Top Series
            </Typography>
            <Typography variant="body1">
              This is a template showcasing the optional theme stylesheet
              included in Bootstrap. Use it as a starting point to create
              something more unique by building on or modifying it.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(TopSeriesPage);
