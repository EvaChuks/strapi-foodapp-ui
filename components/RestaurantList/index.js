import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading restaurants";
  if (loading) return <h1>Fetching</h1>;
  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Container fluid>
          <Row>
            {searchQuery.map((res) => (
              <Col xs={6} sm={4} key={res.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      process.env.NODE_ENV === "production"
                        ? res.image[0].url
                        : `${process.env.NEXT_PUBLIC_API_URL}/${res.image[0].url}`
                    }
                    alt="..."
                    style={{ height: 250 }}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h5>{res.name}</h5>
                    </Card.Title>
                    <Card.Text>
                      <p>{res.description}</p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Link
                      as={`/restaurants/${res.id}`}
                      href={`/restaurants?id=${res.id}`}
                    >
                      <a className="btn btn-primary">View</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        //   <div className="container-fluid">
        //   <div className="row">
        //     {searchQuery.map((res) => (
        //       <div className="col-xs-6 col-4" key={res.id}>
        //         <div
        //           className="card"
        //           style={{ margin: "0 0.5rem 20px 0.5rem" }}
        //         >
        //           <img
        //             src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
        //             className="card-img-top"
        //             alt="..."
        //             style={{ height: 250 }}
        //           />
        //           <div className="card-body">
        //             <h5 className="card-title">{res.name}</h5>
        //             <p className="card-text">{res.description}</p>
        //             <Link
        //               as={`/restaurants/${res.id}`}
        //               href={`/restaurants?id=${res.id}`}
        //             >
        //               <a className="btn btn-primary">View</a>
        //             </Link>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}

export default RestaurantList;
