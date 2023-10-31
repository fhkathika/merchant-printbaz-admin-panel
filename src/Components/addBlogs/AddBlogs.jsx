import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import Navigationbar from '../navigationBar/Navigationbar';
import CustomAlert from '../alert/CustomAlert';
import BlotFormatter from 'quill-blot-formatter';
import { useQuill } from 'react-quilljs';
function Tag({ label, onRemove }) {
  return (
      <span className="tag">
          {label}
          <button onClick={() => onRemove(label)}>X</button>
      </span>
  );
}

const AddBlogs = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        postTime: new Date(), // You may want to use a date picker for better UX
        productType: [],
      });
      console.log("formData?.description")
      const [blogImage, setBlogImage] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [showAlert, setShowAlert] = useState(false);

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
            quill.on('text-change', handleQuillChange);
            return () => quill.off('text-change', handleQuillChange); // Cleanup the event listener on component unmount
        }
    }, [quill]);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleFileChange = (event) => {
        setBlogImage(event.target.files[0]);
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
          const response = await axios.post('https://mserver.printbaz.com/addBlog', form);
          // const response = await axios.post('http://localhost:5000/addBlog', form);
          console.log('Blog added:', response.data);
          setShowAlert(true);
             // Reset form data
      setFormData({
        title: '',
        description: '',
        postTime: '',
        productType: ''
      });
      setBlogImage(null);

          // You may want to reset form or navigate away after successful submission
          if (response.ok) {
            await response.json();
          
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
        <Navigationbar/>
        
          <form onSubmit={handleSubmit}> 
            
<Row className="g-2 m-auto">
<h2 style={{textAlign:"center"}}>Add Blog</h2>   
  <Col xs={12} md={8} className='m-auto'>
  
   <Card  className="">
      
 
       <Card.Body>
         
                   
   
               <Form.Group controlId="formFile" className="mb-3">
                 <Form.Label>Product Title</Form.Label>
                 <Form.Control
                  type="text" name="title" value={formData.title} onChange={handleInputChange}
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
             <div style={{ position:"relative"}} >
  
                      <input
                  className="btn "
                  type="file"
                  name="image"
                  required
                style={{height:"100%",weight:"100%",marginRight:"15px",padding:"8px 0px"}}
                  
                  
                  onChange={handleFileChange}
                />
                 
                </div>
      
     
             
                     
                    </div>
                  </div>
           
   
       </Card.Body>
   </Card>

   <Button  className='m-auto p-3' style={{backgroundColor:"#001846",color:"white",width:"100%",textAlign:"center"}} type="submit">
Add Blog
      </Button>
   </Col>



</Row>
     </form>

          {
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )
  
}

{showAlert===true && (
          
          <CustomAlert
          message="Your blog has been submitted"
          onClose={() => setShowAlert(false)}
          
          
          />
          
          
          )}
        </div>
      );
};

export default AddBlogs;
