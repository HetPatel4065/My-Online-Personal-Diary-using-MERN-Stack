import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import pageContext from '../Context/pages/pageContext';
import ppr from "../images/paper.jpg";

export default function PageItem(props) {
  const { page, editPage } = props;
  const { setView, deletePage, showAlert, pages } = useContext(pageContext);

  const handleClick = (e) => {
    setView({ title: page.title, description: page.description, tag: page.tag, date: page.date.toString().substring(0, 10), index: pages.indexOf(page) });
  }
  return (

    <div className='col-md-3'>
      <div className="card my-3">
        <img src={ppr} className="card-img-top" alt="emojis" />
        <div className="card-body">
          <h5 className="card-title"><strong>{page.date.toString().substring(0, 10)}</strong></h5>
          <h5 className="card-title"><strong>{page.title.toString().substring(0, 15)}</strong>
          </h5>
          <p className="card-text preLine">{page.description.toString().substring(0, 65) + "..."}</p>
          <Link to="/view" onClick={handleClick}><i className="fa-solid fa-eye mx-1"></i></Link>
          <i className="fa-solid fa-file-pen mx-1" onClick={() => { editPage(page) }}></i>
          <i className="fa-solid fa-trash-can mx-1" onClick={() => { deletePage(page._id); showAlert("Diary entry successfully deleted", "success") }}></i>
        </div>
      </div>
    </div>
  )
}


