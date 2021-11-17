import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/checkoutForm";
import AppContext from "../context/AppContext";
import Cart from "../components/cart";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;
  // load stripe to inject into elements components
  const stripe_pk = process.env.PUBLIC_PK;
  const stripePromise = loadStripe(
    "pk_test_51JvyplSFZe05x8CrnUUVhoPZqeMV4mlThimGAS6DGdbDHxzuoTSFyaFYEN408bF8YbI9TBChS1tylaNz9rrMixuC006ARl5Snb"
  );
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ span: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ span: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
}
export default Checkout;
