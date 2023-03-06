import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { queryConfig } from 'src/pages/Productlist/Productlist'

interface Props {
  queryConfig: queryConfig
  pageSize: number
}
const RANGE = 2
function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let doAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!doAfter) {
        doAfter = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-trasparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex  flex-wrap justify-center'>
      {page === 1 ? (
        <span className='shadown-sm mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='shadown-sm mx-2 cursor-pointer rounded border bg-white px-3 py-2'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='shadown-sm mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2'>Next</span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='shadown-sm mx-2 cursor-pointer rounded border bg-white px-3 py-2'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
