import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import pageContext from '../Context/pages/pageContext'
import AddPage from './AddPage';
import PageItem from './PageItem';

export default function Pages() {
    const context = useContext(pageContext);
    const { pages, fetchPages, setView, updatePage, showAlert } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchPages();
            setView({ title: "", description: "Error:404 Not Found..\nEither you are not authorize to view this page\nOr you must have reloaded it\nTry by going back home and reviewing this page", tag: "", date: "", index: -1 });
        }
        else {
            navigate("/login");
        }
    }, [])

    const editPage = (currentPage) => {
        ref.current.click();
        setPage({ id: currentPage._id, title: currentPage.title, description: currentPage.description, tag: currentPage.tag })
    }

    const ref = useRef(null);
    const closeRef = useRef(null);

    const [page, setPage] = useState({ id: "", title: "My Day Today", description: "Dear Dairy", tag: "General" });


    const handleChange = (e) => {
        setPage({ ...page, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        updatePage(page.id, page.title, page.description, page.tag)
        closeRef.current.click();
        showAlert("Page Updated", "Note");
    }

    return (


        <div>
            <AddPage />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> Launch demo modal</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Page</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="my-3 create-form">
                                <form >
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label ">Title* (Atleast 3 charcter long)</label>
                                        <input type="text" className="form-control" id="title" name="title" value={page.title} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description* (Atleast 10 characters long)</label>
                                        <textarea rows="3" cols="20" wrap="hard" className="form-control" id="description" name="description" value={page.description} minLength={10} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name="tag" value={page.tag} onChange={handleChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={page.description.length < 10 || page.title.length < 3} onClick={handleClick}>Update Page</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5 cards">
                <h2 id="cards-header"><strong>Your feelings saved with me...</strong></h2>

                {pages.length === 0 && <div className="container mx-2"> Your Dairy is Empty......</div>}

                <div className='row my-5'>
                    {pages.map((page) => {
                        return <PageItem key={page._id} page={page} editPage={editPage} />
                    })}
                </div>
            </div>
        </div>

    )
}
