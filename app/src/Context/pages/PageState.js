import PageContext from './pageContext';
import React, { useState } from 'react';

const PageState = (props)=>{
    const host="localhost:5000";
    const pageInit=[];
    const [pages,setPages]= useState(pageInit);
    //to get all pages
    const fetchPages=async ()=>{
        const response= await fetch(`http://${host}/api/page/fetch/all/pages`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json= await response.json();
        //console.log(json);
        setPages(json.reverse());
     }
     //Add a page
     const createPage=async (title,description,tag)=>{
        const response= await fetch(`http://${host}/api/page/add/page`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        const json= await response.json();
        
        setPages((pages.reverse().concat(json)).reverse());
     }

     //Delete a page
     const deletePage=async(id)=>{
        const response= await fetch(`http://${host}/api/page/delete/page/${id}`,
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        })
        const newPages = pages.filter((page)=>{
            return page._id!==id
        })
        setPages(newPages);
    }

     //Edit a page 
     const updatePage=async(id,title,description,tag)=>{
        const response= await fetch(`http://${host}/api/page/update/page/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
            
        })
        const json= await response.json();

        let newPages=JSON.parse(JSON.stringify(pages));

        for (let index = 0; index < newPages.length; index++) {
            const element = newPages[index];
            if(element._id===id)
            {
                newPages[index].title=title;
                newPages[index].description=description;
                newPages[index].tag=tag;
                break;
            }   
        }
        setPages(newPages);  
    }

    const [view,setView]=useState({title:"",description:"Error:404 Not Found..\nEither you are not authorize to view this page\nOr you must have reloaded it\nTry by going back home and reviewing this page",tag:"",date:"",index:-1});
    const[alert,setAlert]= useState(null);
    const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }

    return (
        <PageContext.Provider value={{pages,createPage,fetchPages,deletePage,updatePage,view,setView,alert,showAlert}}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageState;