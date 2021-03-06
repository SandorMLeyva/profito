import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { App as AppLayout } from "layouts/app";
import SessionLayout from "layouts/session";
import Loading from "components/loading";
import Dashboard from "views/dashboard";

const Privacy = lazy(() => import("views/home/privacy"));
const Terms = lazy(() => import("views/home/terms"));
const Home = lazy(() => import("views/home"));

const Login = lazy(() => import("./views/registration/login"));
const Register = lazy(() => import("./views/registration/register"));
const Payments = lazy(() => import("./views/payments"));
const PaymentsEdit = lazy(() => import("./views/payments/edit"));
const PaymentsCreate = lazy(() => import("./views/payments/create"));

const Integrations = lazy(() => import("views/integrations"));
const Shopifies = lazy(() => import("./views/integrations/shopify"));
const ShopifiesEdit = lazy(() => import("./views/integrations/shopify/edit"));
const ShopifiesCreate = lazy(() =>
  import("./views/integrations/shopify/create")
);
const Ads = lazy(() => import("views/integrations/google_ads"));

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path='/auth' render={() => <LoginComponent />} />
          <Route path='/app' render={() => <AppComponent />} />
          <Route path='/' render={() => <HomeComponent />} />
        </Switch>
      </Suspense>
    </Router>
  );
}

function HomeComponent() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/privacy' component={Privacy} />
      <Route exact path='/terms' component={Terms} />
      <Redirect from='*' to='/' />
    </Switch>
  );
}

function AppComponent() {
  return (
    <AppLayout>
      <Switch>
        {/* DASHBOARD */}
        <Route exact path='/app/dashboard' component={Dashboard} />

        {/* PAYMENTS */}
        <Route exact path='/app/payments' component={Payments} />
        <Route exact path='/app/payments/create' component={PaymentsCreate} />
        <Route exact path='/app/payments/:id/edit' component={PaymentsEdit} />

        {/* INTEGRATIONS */}
        <Route exact path='/app/integrations' component={Integrations} />

        {/* INTEGRATIONS SHOPIFY */}
        <Route exact path='/app/integrations/shopify' component={Shopifies} />
        <Route
          path='/app/integrations/shopify/create'
          component={ShopifiesCreate}
        />
        <Route
          path='/app/integrations/shopify/:id/edit'
          component={ShopifiesEdit}
        />
        {/* INTEGRATIONS GOOGLE ADDS */}
        <Route exact path='/app/integrations/google_ads' component={Ads} />

        <Redirect from='*' to='/app/dashboard' />
      </Switch>
    </AppLayout>
  );
}

function LoginComponent() {
  return (
    <SessionLayout>
      <Switch>
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/register' component={Register} />
      </Switch>
    </SessionLayout>
  );
}
