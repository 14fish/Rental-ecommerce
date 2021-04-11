import React, { useState, useEffect } from "react";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import { Search, Filter, Post } from "../../../components";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { propertyActions } from "../../../actions/property.actions";
import { Spinner } from "../../../components";

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperty: () => dispatch(propertyActions.getAll()),
    makeDetailPage: (page, keyword, category, feature) =>
      dispatch(
        propertyActions.makeDetailedRequest(page, keyword, category, feature)
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    property: state.property,
  };
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ property, makeDetailPage, history }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenFeature, setChosenFeature] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    makeDetailPage(currentPage, searchKeyword, chosenCategory, chosenFeature);
  }, [
    searchKeyword,
    chosenCategory,
    chosenFeature,
    makeDetailPage,
    currentPage,
  ]);

  const { loading, properties, error } = property;

  return (
    <div className='home-container'>
      <Search setSearchKeyword={setSearchKeyword} />
      <div className='vertical-line'></div>
      <Grid container>
        <Grid container item xs={12} md={12} lg={2} xl={2}>
          <Filter
            setChosenCategory={setChosenCategory}
            setChosenFeature={setChosenFeature}
          />
        </Grid>
        <Grid container item xs={12} md={12} lg={10} xl={10} wrap>
          <Grid container>
            {loading ? (
              <div className='spinner-container'>
                <Spinner />
              </div>
            ) : (
              properties &&
              properties.rows &&
              properties.rows.map((property, id) => {
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={4}
                    justify='center'
                    key={id}
                  >
                    <Post
                      postId={property.id}
                      userId={property.UserId}
                      title={property.title}
                      price={property.price}
                      img={property.imageURL}
                      categories={property.category}
                      features={property.feature}
                      location={property.location}
                      isUnderOffer={property.isUnderOffer}
                      history={history}
                      key={property.id}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={(properties && properties.count / 12) || 1}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Grid>
      </Grid>
    </div>
  );
});
