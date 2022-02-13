import Datas from "../components/web-dev/Web-dev-data";
import NoResults from "../components/NoResults";
import { useState, useEffect, React } from "react";
import { Link } from "react-scroll";
// import { useLocation } from "react-router-dom";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const { pathname } = useLocation();
  const [selectedLabel, setSelectedLabel] = useState("");
  const labels = [
    ...new Set(
      Datas.map((data) => {
        if (!data.label) return null;
        return data.label;
      })
    ),
  ].filter((label) => label);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const filterOptions = selectedLabel !== "" || searchTerm !== ""
    ? Datas.filter((data) => (selectedLabel === "" || data.label === selectedLabel) &&
        (searchTerm === "" || data.head.toLowerCase().includes(searchTerm.toLowerCase())))
    : Datas;

  return (
    <>
      <div className="container-landing">
        <div className="landing-page-header">
          <div className="header-details">
            <h1>Web Development Tools</h1>

            <p>A collection of all the tools that are required in web development made by the community to ease the 
              process of web development.</p>

            <Link to="container" smooth={true} duration={1000}>
              <h4>Explore all</h4>
            </Link>

            <div className="search-container">
              <i className="fa fa-search search-icon"></i>
              <input
                className="search"
                text="type"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="label-container">
          <span
            className="label"
            style={
              selectedLabel === ""
                ? { color: "white", background: "orange", border: "none" }
                : {}
            }
            onClick={() => {
              setSelectedLabel("");
            }}
          >
            All
          </span>
          {labels.map((label) => {
            return (
              <span
                key={label}
                className="label"
                style={
                  selectedLabel === label
                    ? { color: "white", background: "#0093ed" }
                    : {}
                }
                onClick={() => {
                  setSelectedLabel(label);
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="container" id="container">
        <div className="align-flex">
          {filterOptions.length > 0 ? (
            filterOptions.map((data) => (
                <div className="frame-border" key={`${data.head}_${data.link}`}>
                  <div className="pointer"></div>
                  <div className="card-js">
                    <div className="content">
                      <a href={data.link} target="_blank" rel="noreferrer">
                        <h3>{data.head}</h3>
                        <img src={data.image} alt={data.alt}></img>
                      </a>
                      <p>{data.about}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <NoResults search={searchTerm} />
          )}
        </div>
      </div>
    </>
  );
};

export default Content;