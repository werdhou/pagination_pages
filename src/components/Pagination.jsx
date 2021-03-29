import React, { useEffect, useState } from 'react'

import rightArrow from '../assets/img/right-arrow.svg'
import leftArrow from '../assets/img/left-arrow.svg'
import prev from '../assets/img/prev.svg'
import next from '../assets/img/next.svg'

function Pagination() {
    const [activePage, setActivePage] = useState(1)
    const [portionNumber, setPortionNumber] = useState(1)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        localStorage.getItem('activePage') && setActivePage(Number(localStorage.getItem('activePage')))
        localStorage.getItem('portionNumber') && setPortionNumber(Number(localStorage.getItem('portionNumber')))
    }, [])

    useEffect(() => {
        if (activePage > rightPortionPageNumber) {
            return setPortionNumber(portionNumber + 1)
        }
        if (activePage < leftPortionNumbers) {
            return setPortionNumber(portionNumber - 1)
        }
    }, [activePage])

    useEffect(() => {
        localStorage.setItem('activePage', activePage)
        localStorage.setItem('portionNumber', portionNumber)
    }, [activePage])

    const pages = 101

    let portionSize = Math.ceil(pages / perPage)
    let leftPortionNumbers = (portionNumber - 1) * perPage + 1
    let rightPortionPageNumber = portionNumber * perPage

    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    const pressRightArrow = () => setActivePage(activePage + 1)
    const pressLeftArrow = () => setActivePage(activePage - 1)
    const pressPrev = () => {
        setPortionNumber(portionNumber - 1)
        setActivePage(leftPortionNumbers - perPage)
    }
    const pressNext = () => {
        setPortionNumber(portionNumber + 1)
        setActivePage(rightPortionPageNumber + 1)
    }

    const foo = (e) => {
        let a = e.target.value
        debugger;
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
                        <a onClick={() => setActivePage(i)} className={activePage === i ? "active" : ""} key={i} href="!#">{i}</a>)
                    )}
                <button onClick={pressRightArrow} disabled={activePage === pages ? true : false} >
                    <img src={rightArrow} alt="right" />
                </button>
                <button onClick={pressNext} disabled={portionNumber === portionSize ? true : false}>
                    <img src={next} alt="next" />

                </button>
            </div>
            <div className="select">
                <select onChange={foo}>
                    <option disabled>Выберите количество отображаемых страниц</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </>
    )
}

export default Pagination
