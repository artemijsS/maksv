import React, { useState } from 'react'

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [activePage, setActivePage] = useState(currentPage)
    const pagesToShow = 5

    const handleClick = (page) => {
        setActivePage(page)
        onPageChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }

        const middleIndex = Math.ceil(pagesToShow / 2) - 1
        const startPage = Math.max(1, activePage - middleIndex)
        const endPage = Math.min(totalPages, activePage + middleIndex)

        return pageNumbers.slice(startPage - 1, endPage).map((page) => (
            <button
                key={page}
                className={`mx-1 rounded-md py-2 px-4 ${
                    activePage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => handleClick(page)}
            >
                {page}
            </button>
        ))
    }

    if (!totalPages) {
        return null
    }

    return (
        <div className="flex justify-center">
            <div className="flex items-center">
                <button
                    className={`mx-1 rounded-md py-2 px-4 ${
                        activePage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                    }`}
                    disabled={activePage === 1}
                    onClick={() => handleClick(activePage - 1)}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    className={`mx-1 rounded-md py-2 px-4 ${
                        activePage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                    }`}
                    disabled={activePage === totalPages}
                    onClick={() => handleClick(activePage + 1)}
                >
                    Next
                </button>
                <div className="ml-2 text-gray-500">
                    Page {activePage} of {totalPages}
                </div>
            </div>
        </div>
    )
}
