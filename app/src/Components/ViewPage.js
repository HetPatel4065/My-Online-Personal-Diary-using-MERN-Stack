import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import pageContext from '../Context/pages/pageContext';

export default function ViewPage() {
    const { view, pages, setView } = useContext(pageContext);
    const handleClick1 = (e) => {
        const index = view.index;
        setView({ title: pages[index + 1].title, description: pages[index + 1].description, tag: pages[index + 1].tag, date: pages[index + 1].date.toString().substring(0, 10), index: index + 1 })
    }

    const handleClick2 = (e) => {
        const index = view.index;

        setView({ title: pages[index - 1].title, description: pages[index - 1].description, tag: pages[index - 1].tag, date: pages[index - 1].date.toString().substring(0, 10), index: index - 1 })
    }

    return (
        <div className='container view-page'>
            <div className='view-details-box'>
                <h4 className='view-details'>Date: {view.date}</h4>
                <h4 className='view-details'>Tag :  {view.tag}</h4>
            </div>
            <div className="conatiner my-5 mx-2 view-div">
                <h2 id="view-title">
                    <strong>{view.title}</strong>
                </h2>

                <div className="conatiner my-4 mx-5 preLine">
                    {view.description}
                </div>
            </div>
            <button id="prev" type="button" className="btn btn-outline-dark" onClick={handleClick1} disabled={view.index === pages.length - 1}><i className="fa-solid fa-angles-left"></i><strong> Prev Page</strong></button>
            <button id="next" type="button" className="btn btn-outline-dark" onClick={handleClick2} disabled={view.index === 0}><strong>Next Page </strong><i className="fa-solid fa-angles-right"></i></button>
        </div>

    )
}