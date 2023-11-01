import React, { useEffect, useState } from 'react';
import BlotFormatter from 'quill-blot-formatter';
import { useQuill } from 'react-quilljs';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import CustomAlert from '../alert/CustomAlert';
const UpdateBlogPopUp = ({getBlogById,getBlogs,
    isOpenUpdatePopUp,
setIsOpenUpdatePopUp,
    message,
    onClose}) => {
    console.log("getBlogById",getBlogById)
  
       const [formData, setFormData] = useState({
        title: '',
        description: '',
     
        updateTime:'',
        productType: '' 
    });

    useEffect(() => {
        if (getBlogById) {
            setFormData({
                title: getBlogById.title || '',
                description: getBlogById.description || '',
              
                updateTime:new Date(),
                productType: getBlogById.productType || ''
            });
        }
    }, [getBlogById]);  // <-- This makes sure the effect runs whenever getBlogById changes
    
    
          console.log("formData",formData)
          const [blogImage, setBlogImage] = useState(null);
          const [blogImagePreviewURL, setBlogImagePreviewURL] = useState(null);  // For the Blob URL preview
          const [isLoading, setIsLoading] = useState(false);
          const [showAlert, setShowAlert] = useState(false);
    console.log("blogImage",blogImage)
    useEffect(() => {
        if (getBlogById && getBlogById.imageUrl) {
            setBlogImage(getBlogById?.imageUrl);
            setBlogImagePreviewURL(getBlogById?.imageUrl);
        }
    }, [getBlogById]);
    
          const { quill, quillRef, Quill } = useQuill({
            modules: { blotFormatter: {} }
          });
          if (Quill && !quill) {
            // const BlotFormatter = require('quill-blot-formatter');
            Quill.register('modules/blotFormatter', BlotFormatter);
          }
        
          const handleQuillChange = () => {
            if (quill) {
                const content = quill.root.innerHTML;
                setFormData(prev => ({ ...prev, description: content }));
            }
        };
        
        useEffect(() => {
            if (quill) {
                // Set initial content
                quill.root.innerHTML = getBlogById?.description || '';
        
                // Add text-change listener
                quill.on('text-change', handleQuillChange);
        
                // Cleanup the event listener on component unmount
                return () => quill.off('text-change', handleQuillChange); 
            }
        }, [quill, getBlogById]);
        
        
          const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevData => ({
              ...prevData,
              [name]: value
            }));
          };
        
          const handleFileChange = (event) => {
            const file = event.target.files[0];
            // setBlogImage(URL.createObjectURL(file));
            setBlogImage(file);
            setBlogImagePreviewURL(URL.createObjectURL(file));  
          };
        
          const handleSubmit = async (event) => {
            event.preventDefault();
            setIsLoading(true)
        
            const form = new FormData();
            for (let key in formData) {
              form.append(key, formData[key]);
            }
            
            form.append('blogImage', blogImage);

        
            try {
              const response = await axios.put(`https://mserver.printbaz.com/updateBlog/${getBlogById?._id}`, form);
            //   const response = await axios.put(`http://localhost:5000/updateBlog/${getBlogById?._id}`, form);
              console.log('Blog added:', response.data);
              setShowAlert(true);
     
    
              // You may want to reset form or navigate away after successful submission
              if (response.status === 200) {
                console.log('Blog updated:', response.data);
                setShowAlert(true);
                // Reset form data
                setFormData({
                    title: '',
                    description: '',
                    postTime: '',
                    productType: ''
                });
                setBlogImage(null);
                getBlogs()
                setIsOpenUpdatePopUp(false)
            } else {
                throw new Error('API error: ' + response.status);
            }
            } catch (error) {
              console.error('Error:', error);
              // Handle error UI, maybe show an error message to the user
            }
            finally {
                setIsLoading(false); // Set loading status to false
              }
          };
        
    return (
        <div>
            <div className="alert-overlay"  >
                <div className="alert-box-blog">
             <div style={{height:"10px"}}></div>
                <form onSubmit={handleSubmit}> 
            
            <Row className="g-2 m-auto">
             
              <Col xs={12} md={8} className='m-auto '>
             
               <Card className='scrollable-card' style={{ position: 'relative' }}>
               <div style={{ 
                cursor:"pointer",
        position: 'absolute', 
        top: '10px',   // Adjust as needed
        right: '10px'  // Adjust as needed
    }}>  
        <span id="popupclose" onClick={onClose}>X</span>     
    </div>
                   <Card.Body className='scrollable-card-body' style={{paddingBottom:"2px"}} >
                  
                           <Form.Group controlId="formFile" className="mb-3">
                             <Form.Label>Product Title</Form.Label>
                             
                             <Form.Control
                              type="text" name="title" value={formData?.title} onChange={handleInputChange}
                               required
                             
                               
                             />
                           </Form.Group>
                      
                           <Form.Group controlId="formFile" className="mb-3">
                             <Form.Label>Type</Form.Label>
                             <Form.Control
                             type="text" name="productType" 
                             
                             value={formData.productType}
                              onChange={handleInputChange}
                              required  
                             />
                           </Form.Group>
                           
            
                           <div className="flex-grow-0 py-3 px-2  border-top phone-py-0 " >
                                <div >
                             
                                <div   ref={quillRef}  />
                         <div style={{display:"flex"}}>
                         <div >
                         {blogImagePreviewURL && <img src={blogImagePreviewURL} alt="Blog Preview" style={{ maxWidth: '100px', height: "100px", marginTop: "5px" }} />}

                 </div>     
                         <div style={{ position:"relative"}} >
              
                                  <input
                              className="btn "
                              type="file"
                              name="image"
                         
                            style={{height:"auto",weight:"80%",marginTop:"30px",padding:"8px",}}
                              
                              
                              onChange={handleFileChange}
                           
                            />
                         
                             
                            </div>
                
                           
                  </div>    
                                 
                                </div>
                              </div>
                       
               
                   </Card.Body>
                   <Button  className='m-auto p-3' style={{backgroundColor:"#001846",color:"white",width:"100%",textAlign:"center"}} type="submit">
            Update Blog
                  </Button>
               </Card>
            
              
               </Col>
            
            
            
            </Row>
                 </form>
            
                      {
              isLoading===true &&(
                <>
                 <div className="alert-overlay"  />
                   <div className="alert-box" >
                 
                     <Spinner style={{padding:"20px"}} animation="grow" variant="warning" />
                     
                     <h2>Please wait!</h2>
                   </div>
                </>
              )
              
            }
            
            {showAlert===true && (
                      
                      <CustomAlert
                      message="Your blog has been updated"
                      onClose={() => setShowAlert(false)}
                      
                      
                      />
                      
                      
                      )}
                </div>

            </div>
        </div>
    );
};

export default UpdateBlogPopUp;