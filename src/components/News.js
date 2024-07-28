import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  CapitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      // loading: false, (We will make loading true for getting a loader in top as well)
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.CapitalizeFirstLetter(
      this.props.category
    )} - News Wala`;
  }
  async UpdateNews() {
    this.props.setProgress(10);
    const Url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cba6d68c52e54231aeff4285ef8d31e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(Url);
    this.props.setProgress(30);
    let ParsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: ParsedData.articles,
      totalResults: ParsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // console.log("cmd");
    // let Url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cba6d68c52e54231aeff4285ef8d31e4&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true})
    // let data = await fetch(Url);
    // let ParsedData = await data.json();
    // this.setState({
    //   articles: ParsedData.articles,
    //   totalResults: ParsedData.totalResults,
    //   loading: false
    // });
    this.UpdateNews();
  }
  // HandleNextClick = async () => {
  // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
  // let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cba6d68c52e54231aeff4285ef8d31e4&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(Url);
  //   let ParsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: ParsedData.articles,
  //     loading: false
  //   });
  // }
  // this.setState({ page: this.state.page + 1 });
  // this.UpdateNews();
  // };

  // HandlePrevClick = async () => {
  // let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cba6d68c52e54231aeff4285ef8d31e4&page=${
  //   this.state.page - 1
  // }&pageSize=${this.props.pageSize}`;
  // this.setState({loading: true})
  // let data = await fetch(Url);
  // let ParsedData = await data.json();
  // console.log(ParsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: ParsedData.articles,
  //   loading: false
  // });
  // this.setState({ page: this.state.page - 1 });
  // this.UpdateNews();
  // };
  // cba6d68c52e54231aeff4285ef8d31e4

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cba6d68c52e54231aeff4285ef8d31e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(Url);
    let ParsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(ParsedData.articles),
      totalResults: ParsedData.totalResults,
      // loading: false,
    })
  };
  render() {
    return (
      <>
      {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{ margin: "35px" }}>
          NEWS APP - Top {this.CapitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner/>} 
        {/* we do'nt require spinner component for infinite loading  */}
        {/*  <div className="row"> */}
        {/* {" "} */}
        {/* {!this.state.loading && this.state.articles.map((element) => {
            // return (
              // <div className="col-md-4" key={element.url}>
                // <NewsItems 
                  // title={element.title ? element.title.slice(0, 40) : ""}
                  // description={
                    // element.description ? element.description.slice(0, 88) : ""
                  // } */}
        {/* we will not use this code as we will be using infinite loading done below */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading &&  we do'nt require this in infinite scroll*/}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                  
                    <NewsItems
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      ImageUrl={element.urlToImage}
                      NewsUrl={element.url}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                   </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* </div> */}
        {/* // We do'nt require next and previous buttons as we are using infinite scrolling */}
        {/* // <div className="container d-flex justify-content-between"> */}
          {/* // <button */}
            {/* // disabled={this.state.page <= 1} */}
            {/* // type="button" */}
            {/* // className="btn btn-dark" */}
            {/* // onClick={this.HandlePrevClick} */}
          {/* // > */}
            {/* // &larr; Previous */}
          {/* // </button> */}
          {/* // <button */}
            {/* // disabled={ */}
              {/* // this.state.page + 1 > */}
              {/* // Math.ceil(this.state.totalResults / this.props.pageSize) */}
            {/* // } */}
            {/* // type="button" */}
            {/* // className="btn btn-dark" */}
            {/* // onClick={this.HandleNextClick} */}
          {/* // > */}
            {/* // Next &rarr; */}
          {/* // </button> */}
        {/* // // </div> */ }
      
      </>
    )
  }
}

export default News;
