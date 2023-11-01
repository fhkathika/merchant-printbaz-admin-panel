
import React, { useEffect, useState } from 'react';
import '../../css/blogStyle.css';
import { Accordion, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigationbar from '../navigationBar/Navigationbar';
import UpdateBlogPopUp from '../updateBlogPopUp/UpdateBlogPopUp';
import DeleteRoleAlert from '../alert/DeleteRoleAlert';
const AllBlogs = () => {
  const [allBlogs,setAllBlogs]=useState([])
  const [isOpenUpdatePopUp,setIsOpenUpdatePopUp]=useState(false)
  const [deletepopUp, setDeletepopUp] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [getBlogById, setGetBlogById] = useState();
  const getBlogs = async () => {
     await fetch('https://mserver.printbaz.com/getAllBlogs') //for main site
    //  await fetch('http://localhost:5000/getAllBlogs') //for testing site
    // testing site
    .then(res=>res.json())
    .then(data => setAllBlogs(data))
    }
  useEffect(()=>{
   
    getBlogs()
},[])

// Sort the blogs by createdAt in descending order
const sortedBlogs = allBlogs.sort((a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);

  return dateB - dateA;  // Return a positive number for descending order
});

// Get the two latest blogs
const latestBlogs = sortedBlogs.slice(0, 2);
const blogsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

useEffect(() => {
  window.scrollTo(0, 0); // To scroll to the top whenever the page changes
}, [currentPage]);

// Get current blogs
const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

const [showFullDescription, setShowFullDescription] = useState(false);
const toggleDescription = (blogId) => {
    setShowFullDescription(prevState => ({
        ...prevState,
        [blogId]: !prevState[blogId]
    }));
}

const handleOpenUpdatePopUp=(id)=>{
    setIsOpenUpdatePopUp(true)
   
        // Fetch the updated order details
       fetch(`https://mserver.printbaz.com/getBlogById/${id}`)
    //    fetch(`http://localhost:5000/getBlogById/${id}`)
      
      .then(res=>res.json())
      .then(data => {setGetBlogById(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
      
}
//delete pop up 
const handleDeletePopUp=(id)=>{
    // e.stopPropagation();
    console.log("Received id:", id);
    setDeletepopUp(true)
    setDeleteId(id)
  }
const handleDeleteItem =(id)=>{
    // e.preventDefault()
    // e.stopPropagation();
    setDeletepopUp(true)
  
  
    // const proceed= window.confirm('Do you want to remove?')
    if(deletepopUp){
    //   fetch(`http://localhost:5000/deleteBlog/${id}`,{
      fetch(`https://mserver.printbaz.com/deleteBlog/${id}`,{
        method : 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
      
        if(data?.deletedCount>0){
        
          // convert object into array
          // const asArray = Object.entries(getAllRoles);
          getBlogs()
          setDeletepopUp(false)
         
        }
        
      })
    }
   
    
  }
  const handleDeleteModalClose=()=>{
    setDeletepopUp(false)
  }
      return (
        <>

        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Merchant Printbaz</title>
        <meta content="" name="description" />
        <meta content="" name="keywords" />

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
    integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />

  <Navigationbar/>

  <div className="main-wrapper ">
          <section className="page-title">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block text-center">
                    <h1 className="text-capitalize mb-4 text-lg">Blog articles</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section blog-wrap">
            <div className="">
              <div className="row">
                <div className="col-lg-12 p-5">
                  <div className="row ">
                 {
                  currentBlogs?.map(blogs=>{
                 
                    return(
                      <div className="col-lg-3 col-md-3 mb-5" key={blogs._id}>
                      <div className="blog-item">
                        <img src={blogs?.imageUrl} alt="" className="img-fluid rounded" />
                        <div className="blog-item-content bg-white p-4">
                          <div className="blog-item-meta py-1 px-2 flex">
                            <span className="text-muted text-capitalize mr-3">{blogs?.productType}</span>
                           <div className=''>
                           <button  onClick={()=>handleOpenUpdatePopUp(blogs?._id)}  style={{borderRadius:"5px", border: 'none', color: 'white',background:"none",marginLeft:"5px"}}>
                            <img style={{width:"20px",height:"20px",marginRight:"20px"}} src='/images/edit.png' alt="edit"/></button>
                            <button onClick={()=>{console.log("Button clicked with id:", blogs._id); handleDeletePopUp(blogs?._id)}} style={{borderRadius:"5px", border: 'none', color: 'white',background:"none"}}>
                            <img style={{width:"20px",height:"20px"}} src='/images/delete.png' alt="delete"/></button>
                            <DeleteRoleAlert isOpen={ deletepopUp} deleteId={deleteId} onClose={handleDeleteModalClose} onConfirm={()=>handleDeleteItem(deleteId)} />
                           </div>

                          </div>
  
                           {/* <p>   {viewTick.content}</p> */}
                           <div  />
                       
                          <h4 className="mt-3 mb-3" style={{fontWeight:"700",color:"#1e194a"}}>{blogs?.title}</h4>
                          <p className="mb-4" dangerouslySetInnerHTML={{ __html: showFullDescription[blogs._id] ? blogs.description : blogs.description.slice(0, 300) }} />
        
        <h5 
            className="btn btn-small btn-main btn-round-full"
            onClick={() => toggleDescription(blogs._id)}
        >
            {showFullDescription[blogs._id] ? "Show Less" : "Show More"}
        </h5>         </div>
                      </div>
                    </div>
                    )
                  }
                  
                    )
                 }
                   
                  
                  </div>
                </div>
                
              </div>
              

                {/* Pagination */}
      <div className="row">
        <div className="col-lg-8 m-auto">
          <nav className="navigation pagination py-2 d-inline-block">
            <div className="nav-links">
              <button className='prev page-numbers' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              <button className="next page-numbers" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button 
                style={{background:"none",border:"none"}}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'current page-numbers' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
            </div>
            {
               isOpenUpdatePopUp===true &&
               <UpdateBlogPopUp
               getBlogById={getBlogById}
               getBlogs={getBlogs}
               isOpenUpdatePopUp={isOpenUpdatePopUp}
               setIsOpenUpdatePopUp={setIsOpenUpdatePopUp}
               message="Item has been updated successfully."
               onClose={() => setIsOpenUpdatePopUp(false)}
             
               
               
               />
            }
          </section>
          {/* Main jQuery */}
        </div>
  


        </>
        
      );
    }
    
      
  export default AllBlogs;
  