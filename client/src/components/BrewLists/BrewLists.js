import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Collapse, ListItemText, Typography} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  
}));

const BrewLists = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [breweries, setBreweries] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (      
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {props.breweries.map(brew =>

          <div>
            <ListItemText primary={brew.name}
              {...open ? <ExpandLess /> : <ExpandMore />}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>      
            <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText
                primary="Contact Info" 
                secondary={
                  <React.Fragment>
                      <Typography
                      component="span"
                      variant="body2"
                      >
                      {`Address: ${brew.street}, ${brew.city}, ${brew.state}`}
                      <br></br>
                      {`Website: ${brew.website_url}`}
                      <br></br>
                      {"Phone: " + brew.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                      </Typography>
                  </React.Fragment>
                } />
            </ListItem>
            </List>
            </Collapse>
            </div>
        )}

        </List>
        
  );
};

export default BrewLists;