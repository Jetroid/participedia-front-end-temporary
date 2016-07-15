import React, { PropTypes } from 'react'
import SearchHit from '../components/SearchHit'
import SearchHitCategory from '../components/SearchHitCategory'
import styles from './SearchResultsView.css'
import CSSModules from 'react-css-modules'

class SearchResultsView extends React.Component {
  render () {
    let caseData = this.props.caseData
    let results = []
    let categories = {'Case': [], 'Organization': [], 'Method': [], 'News': []}

    caseData.forEach(function (caseDatum) {
      let category = categories[caseDatum._source.type]
      let index = category.length
      category.push(<SearchHit key={index} case={caseDatum} />)
    })

    let includeCases = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Cases'
    let includeMethods = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Methods'
    let includeNews = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'News'
    let includeOrgs = this.props.selectedCategory === 'All' || this.props.selectedCategory === 'Orgs'

    let cases = includeCases ? categories['Case'] : []
    let methods = includeMethods ? categories['Method'] : []
    let orgs = includeOrgs ? categories['Organization'] : []
    let news = includeNews ? categories['News'] : []

    let resultsCount = cases.length + methods.length + orgs.length + news.length
    let query = this.props.query
    if (this.props.searching) {
      return (
        <div>
          <h3>Searching for {query}</h3>
        </div>
      )
    } else {
      if (results) {
        return (
          <div styleName="main-contents">
            <div styleName="search-results-component">
              <div styleName="sidebar">
                <div styleName="sorting-options">
                  <a href="#" onClick={this.props.onSortingChange.bind(this,
                      this.props.query, this.props.selectedCategory, 'featured')}
                    className={(this.props.sortingMethod === 'featured') ? 'selected' : ''}>Featured</a>
                  <a href="#" onClick={this.props.onSortingChange.bind(this,
                      this.props.query, this.props.selectedCategory, 'chronological')}
                    className={(this.props.sortingMethod === 'chronological') ? 'selected' : ''}>Most Recent</a>
                  <a href="#" onClick={this.props.onSortingChange.bind(this,
                      this.props.query, this.props.selectedCategory, 'alphabetical')}
                    className={(this.props.sortingMethod === 'alphabetical') ? 'selected' : ''}>Alphabetical</a>
                </div>
              </div>
              <div styleName="main-area">
                <div styleName="search-actions-area">
                  <div styleName="filters">
                    <a href="#" onClick={this.props.onCategoryChange.bind(this, 'All')}
                      styleName={(this.props.selectedCategory === 'All') ? 'selected' : ''}>All</a>
                    <a href="#" onClick={this.props.onCategoryChange.bind(this, 'News')}
                      styleName={(this.props.selectedCategory === 'News') ? 'selected' : ''}>News</a>
                    <a href="#" onClick={this.props.onCategoryChange.bind(this, 'Cases')}
                      styleName={(this.props.selectedCategory === 'Cases') ? 'selected' : ''}>Cases</a>
                    <a href="#" onClick={this.props.onCategoryChange.bind(this, 'Methods')}
                      styleName={(this.props.selectedCategory === 'Methods') ? 'selected' : ''}>Methods</a>
                    <a href="#" onClick={this.props.onCategoryChange.bind(this, 'Organizations')}
                      styleName={(this.props.selectedCategory === 'Organizations') ? 'selected' : ''}>Organizations</a>
                  </div>
                  <div styleName="view-types">
                    <a href="#" onClick={this.props.onLayoutChange.bind(this, 'grid')}
                      styleName={(this.props.selectedViewType === 'grid') ? 'selected' : ''}>
                      <img src="/img/pp-search-grid-icon.png" className="grid-icon" alt="" />
                      <img src="/img/pp-search-grid-icon-active.png" className="grid-icon" alt="" />
                    </a>
                    <a href="#" onClick={this.props.onLayoutChange.bind(this, 'list')}
                      styleName={(this.props.selectedViewType === 'list') ? 'selected' : ''}>
                      <img src="/img/pp-search-list-icon.png" className="list-icon" alt="" />
                      <img src="/img/pp-search-list-icon-active.png" className="list-icon" alt="" />
                    </a>
                    <a href="#" onClick={this.props.startDownload.bind(this)}>
                      <img src="/img/pp-search-dl-icon.png" className="dl-icon" alt=""></img>
                    </a>
                  </div>
                </div>
                <div styleName="result-count">
                  <p>
                    {resultsCount} Result
                    {(resultsCount === 1) ? '' : 's'}
                  </p>
                </div>
                <div styleName="results-box">
                  <SearchHitCategory title="News" results={news} />
                  <SearchHitCategory title="Cases" results={cases} />
                  <SearchHitCategory title="Methods" results={methods} />
                  <SearchHitCategory title="Organizations" results={orgs} />
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div styleName="main-contents">
            <div styleName="detailed-case-component">
              <div styleName="sidebar">
                <div styleName="sorting-options">
                </div>
              </div>
              <div styleName="main-area">
                <div styleName="case-box">
                  <div styleName="category">
                    Search Results
                  </div>
                  <p styleName="case-title">
                    No search specified
                  </p>
                </div>
              </div>
            </div>
          </div>)
      }
    }
  }
}

SearchResultsView.propTypes = {
  caseData: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  startDownload: PropTypes.func.isRequired
}

export default CSSModules(SearchResultsView, styles)