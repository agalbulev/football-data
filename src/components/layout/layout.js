import React from 'react';
import { Route, Switch } from "react-router-dom";
import Standing from '../standing/standing';
import Navigation from '../navigation/navigation'

const Layout = () => {
    return (
        <React.Fragment>
            <Navigation />
            <main>
                <Switch>
                    <Route exact path="/" component={Standing} />
                    <Route path="/:league" component={Standing} />
                </Switch>
            </main>
        </React.Fragment>
    )
}

export default Layout;