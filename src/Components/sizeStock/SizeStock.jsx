import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Navigationbar from '../navigationBar/Navigationbar';

const SizeStock = () => {
    return (
        <div>
            <Navigationbar/>
            <Container>
            <Table responsive>
      <thead>
        <tr>
          <th>Size</th>
          <th>Blank Round Neck</th>
          <th>Blank Drop Sholder</th>
          <th>Blank Hoodie</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>M</td>
          {/* <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td> */}
        </tr>
        <tr>
          <td>L</td>
          {/* <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td> */}
        </tr>
        <tr>
          <td>XL</td>
          {/* <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td> */}
        </tr>
        <tr>
          <td>XXL</td>
          {/* <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td> */}
        </tr>
        <tr>
          <td>3XL</td>
          {/* <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td> */}
        </tr>
      
      </tbody>
    </Table> 
            </Container>
            
        </div>
    );
};

export default SizeStock;