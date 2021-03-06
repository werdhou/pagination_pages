import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage, setPerPage, setPostsPerPage } from '../redux/paginationReducer'

import rightArrow from '../assets/img/right-arrow.svg'
import leftArrow from '../assets/img/left-arrow.svg'
import prev from '../assets/img/prev.svg'
import next from '../assets/img/next.svg'

function Pagination() {
    const { totalCount, perPage, activePage, postsPerPage, postsCount } = useSelector(({ pagination }) =>  pagination)
    const dispatch = useDispatch()
    const [portionNumber, setPortionNumber] = useState(1)
    const [portionSize, setPortionSize] = useState(1)

    useEffect(() => {
        localStorage.getItem('activePage') && dispatch(setActivePage(Number(localStorage.getItem('activePage'))))
        localStorage.getItem('portionNumber') && setPortionNumber(Number(localStorage.getItem('portionNumber')))
    }, [])

    useEffect(() => {
        setPortionSize(Math.ceil((postsCount/postsPerPage) / 10))

    }, [dispatch, postsCount])
    useEffect(() => {
        if (activePage > rightPortionPageNumber) {
            return setPortionNumber(portionNumber + 1)
        }
        if (activePage < leftPortionNumbers) {
            return setPortionNumber(portionNumber - 1)
        }
    }, [activePage])

    useEffect(() => {
        if (perPage === 10) {
            setPortionNumber(Math.ceil(activePage / 10))
        }
        if (perPage === 50) {
            setPortionNumber(Math.ceil(activePage / 50))
        }
        if (perPage === 100) {
            setPortionNumber(Math.ceil(activePage / 100))
        }
    }, [onSetCountPages])

    useEffect(() => {
        console.log(postsPerPage)
        if (postsPerPage === 10) {
            dispatch(setPerPage(10))
            setPortionSize(Math.ceil((postsCount/postsPerPage) / 10))
        }
        if (postsPerPage === 50) {
            dispatch(setPerPage(2))
            dispatch(setActivePage(Math.ceil(postsCount / 50)))
            setPortionSize(Math.ceil((postsCount/postsPerPage) / 10))

        }
        if (postsPerPage === 100) {
            dispatch(setPerPage(1))
            dispatch(setActivePage(Math.ceil(postsCount / 100)))
            setPortionSize(Math.ceil((postsCount/postsPerPage) / 10))

        }
    }, [postsPerPage])

    useEffect(() => {
        localStorage.setItem('activePage', activePage)
        localStorage.setItem('portionNumber', portionNumber)
    }, [activePage])


    let pages = totalCount
    let leftPortionNumbers = (portionNumber - 1) * perPage + 1
    let rightPortionPageNumber = portionNumber * perPage

    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    const pressRightArrow = () => dispatch(setActivePage(activePage + 1))
    const pressLeftArrow = () => dispatch(setActivePage(activePage - 1))
    const pressPrev = () => {
        setPortionNumber(portionNumber - 1)
        dispatch(setActivePage(leftPortionNumbers - perPage))
    }
    const pressNext = () => {
        setPortionNumber(portionNumber + 1)
        dispatch(setActivePage(rightPortionPageNumber + 1))
    }

    function onSetCountPages(e) {
        dispatch(setPerPage(Number(e.target.value)))
    }
    const chaneActivePage = (i) => dispatch(setActivePage(i))

    function onSetCountPosts(e) {
        dispatch(setPostsPerPage(Number(e.target.value)))
    }
    return (
        <>
            <div className="pagination-container">
                <button onClick={pressPrev} disabled={portionNumber === 1 ? true : false}>
                    <img src={prev} alt="prev" />
                </button>
                <button onClick={pressLeftArrow} disabled={activePage === 1 ? true : false}>
                    <img src={leftArrow} alt="left" />
                </button>

                {numberOfPages
                    .filter(p => p >= leftPortionNumbers && p <= rightPortionPageNumber)
                    .map(i => (
                        <a onClick={() => chaneActivePage(i)} className={activePage === i ? "active" : ""} key={i} href="!#">{i}</a>)
                    )}
                <button onClick={pressRightArrow} disabled={activePage === perPage ? true : false} >
                    <img src={rightArrow} alt="right" />
                </button>
                <button onClick={pressNext} disabled={portionNumber === portionSize ? true : false}>
                    <img src={next} alt="next" />

                </button>
            </div>
            <div className="select">
                <select onChange={onSetCountPages}>
                    <option disabled>???????????????? ???????????????????? ???????????????????????? ??????????????</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <select onChange={onSetCountPosts}>
                    <option disabled>???????????????? ???????????????????? ???????????????????????? ????????????</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

            </div>
        </>
    )
}

export default Pagination
