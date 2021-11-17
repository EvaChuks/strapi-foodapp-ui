import React, { useState } from "react";

import Head from "next/head";
import RestaurantList from "../components/RestaurantList";

// import pkg from "react-popper";

function HomePage(props) {
  const [query, updateQuery] = useState("");
  return (
    <>
      <div className="container">
        <div className="col-10">
          <div className="search">
            <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
        onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
              value={query}
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
            {/* <input
              type="text"
              placeholder="search"
              onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
              value={query}
            />
            <button className="btn btn-primary">search</button> */}
          </div>
          <RestaurantList search={query}  />
        </div>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    </>
  );
}
export default HomePage;
