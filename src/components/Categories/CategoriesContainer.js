/**
 * Copyright (c) 2018-present, TryHackMe, Ltd.
 * Categories component container
 */
import React, { useState, useEffect } from 'react'
import CategoriesComponent from './CategoriesComponent'
import { useHistory } from '@docusaurus/router'
import BeatLoader from 'react-spinners/BeatLoader'
import styles from './Categories.module.css'
import classNames from 'classnames'
import sourceCategories from '../../../homepage-categories'
import PropTypes from 'prop-types'


const CategoriesContainer = ({ homepageCategories }) => {
  const [limit, setLimit] = useState(8)
  const [isFetching, setIsFetching] = useState(false)
  const history = useHistory()
  let isFetchingTimeout

  useEffect(() => {
    return () => {
      clearTimeout(isFetchingTimeout)
    }
  }, [])

  const handleLoadMoreClick = e => {
    setIsFetching(true)
    isFetchingTimeout = setTimeout(() => {
      setLimit(limit + 9)
      setIsFetching(false)
    }, 1000)
  }

  const handleCategoryClick = (e, uri) => {
    e.preventDefault()
    history.push(uri)
  }

  return (
    homepageCategories && homepageCategories.length ? (
      <section className={styles.categories}>
        <div className={classNames('container')}>
          <div className="row">
            {homepageCategories.filter((e,i) => i >= 0 && i <= limit)
              .map((props, idx) => (
                <CategoriesComponent key={idx} handleClick={handleCategoryClick} {...props} />
            ))}
          </div>
          {isFetching ? (
            <div className={styles.postCategoryAction}>
              <BeatLoader color='#000' />
            </div>
          ) : limit < homepageCategories.length ? (
            <div className={classNames(styles.postCategoryAction, styles.loadMoreBtn, styles.loadMoreBtnDark)}
                 onClick={handleLoadMoreClick}>
              <div>
                Load more...
              </div>
            </div>
          ) : (
            <div className={styles.postCategoryAction}>
              Total of {homepageCategories.length} categories loaded.
            </div>
          )}
        </div>
      </section>
    ) : (
      <div className={styles.postCategoryAction}>
        <h3>No categories to load</h3>
      </div>
    )
  )
}

CategoriesContainer.defaultProps = {
  homepageCategories: sourceCategories
}

CategoriesContainer.propTypes = {
  homepageCategories: PropTypes.array.isRequired
}

export default CategoriesContainer