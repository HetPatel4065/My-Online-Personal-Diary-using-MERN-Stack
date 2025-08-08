import React, { useContext, useState } from 'react'
import pageContext from '../Context/pages/pageContext';

export default function AddPage() {
    const context = useContext(pageContext);
    const { createPage, showAlert } = context;

    const [page, setPage] = useState({ title: "My Day Today", description: "Dear Diary", tag: "General" });

    const handleClick = (e) => {
        e.preventDefault();
        createPage(page.title, page.description, page.tag);
        setPage({ title: "My Day Today", description: "Dear Diary", tag: "General" })
        showAlert("Page Added To Dairy", "success");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setPage({ ...page, [e.target.name]: e.target.value })

    }

    return (
        <div className='container my-3 addPage'>
            <h2 id="addPage-header">My dear, how are you feeling today?</h2>
            <div className="create-form my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><strong>Title*</strong> (Atleast 3 characters long)</label>
                        <input type="text" className="form-control" id="title" name="title" value={page.title} onChange={handleChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label "><strong>Description*</strong> (Atleast 10 characters long)</label>
                        <textarea rows="3" cols="20" wrap="hard" className="form-control desc" id="description" name="description" value={page.description} minLength={10} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
                        <input type="text" className="form-control" id="tag" name="tag" value={page.tag} onChange={handleChange} />
                    </div>

                    <button disabled={page.description.length < 10 || page.title.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Add To Diary</button>
                </form>
            </div>
        </div>
    )
}