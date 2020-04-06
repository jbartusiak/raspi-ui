import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const appBar : React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar >
                <Typography>Interfejsy sieciowe Raspberry PI</Typography>
            </Toolbar>
        </AppBar>
    );
};
