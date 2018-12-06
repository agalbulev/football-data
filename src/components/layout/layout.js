import React from 'react';
import { Route, Switch } from "react-router-dom";
import Standing from '../standing/standing';
import Navigation from '../navigation/navigation';
import StandingAll from '../standingAll/standingAll'

const Layout = () => {
    return (
        <React.Fragment>
            <Navigation />
            <main>
                <Switch>
                    <Route exact path="/" component={StandingAll} />
                    <Route path="/league/:league" component={Standing} />
                </Switch>
            </main>
        </React.Fragment>
    )
}

export default Layout;