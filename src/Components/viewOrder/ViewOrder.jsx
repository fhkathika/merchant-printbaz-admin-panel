import React from 'react';
import { Link } from 'react-router-dom';

const ViewOrder = () => {
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n        }\n\n        /* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .all-content {\n            margin: 50px;\n        }\n\n        .all-title {\n            font-weight: 700;\n            margin-bottom: 30px;\n        }\n\n        .rec-title h5 {\n            margin-top: 40px;\n            font-weight: 600;\n        }\n\n        .rec-title p {\n            font-size: 18px;\n        }\n\n        .amu-title h3 {\n            margin-bottom: 15px !important;\n        }\n\n        .amu-title h6 {\n            display: inline-block;\n            width: 75%;\n            font-weight: 600;\n            margin: 0;\n            margin-top: 10px;\n        }\n\n        .amu-title p {\n            display: inline-block;\n            width: 20%;\n            margin: 0;\n        }\n\n        .trak-info h3 {\n            font-weight: 700;\n        }\n\n        .trak-status .col-3 {\n            text-align: center;\n        }\n\n        .trak-status p {\n            font-weight: 600;\n            margin-top: 10px;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n            border: none;\n        }\n\n        .view-client-title a {\n            font-weight: 700;\n            font-size: 30px;\n            text-decoration: none;\n            color: #000;\n        }\n\n        .order-details {\n            background-color: #fff;\n        }\n\n        .card {\n            border: 0;\n            margin-bottom: 5px;\n            border-radius: 4px\n        }\n\n        .card.card-transparent {\n            background: 0 0 !important;\n            box-shadow: none\n        }\n\n        .file-options {\n            position: absolute;\n            right: 0;\n            top: 0;\n            visibility: hidden;\n            opacity: 0;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n            z-index: 999;\n        }\n\n        .file:hover .file-options,\n        .folder:hover .file-options {\n            visibility: visible;\n            opacity: 1\n        }\n\n        .file-options>a {\n            margin: 15px 10px;\n            display: block;\n            color: #384c6d;\n            opacity: .6;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n        }\n\n        .file-options>a i {\n            font-size: 19px\n        }\n\n        .file-options>a:hover {\n            opacity: 1\n        }\n\n        .file-options>a::after {\n            display: none\n        }\n\n        .file .file-info p {\n            font-weight: 500;\n            margin-bottom: 0;\n        }\n\n        .file .file-info span.file-size {\n            color: rgba(0, 0, 0, .4)\n        }\n\n        .file .file-info span.file-date {\n            font-size: 12px;\n            color: rgba(0, 0, 0, .4);\n            margin-top: 10px;\n            display: block\n        }\n\n        .card-body {\n            flex: 1 1 auto;\n            padding: 0;\n        }\n\n        .order-list-title {\n            margin-bottom: 20px;\n        }\n\n        .order-list-title h4 {\n            font-size: 24px;\n            font-weight: 500;\n        }\n\n        .order-tab {\n            padding: 10px 0 10px 0;\n        }\n\n        .admin-dis-a {\n    color: #000000 !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 !important;\n}\n\n.admin-dis {\n    width: 100%;\n    margin: 0 auto;\n    padding: 20px;\n    box-sizing: border-box;\n    list-style-type: none;\n    padding: 0;\n}\n\n.admin-dis-tab {\n    margin-bottom: 20px;\n}\n\n.admin-dis-li {\n    display: inline-block;\n}\n\n.admin-dis-a {\n    padding: 10px 20px;\n    display: block;\n    text-decoration: none;\n    color: #000;\n}\n\n.admin-dis-a.active {\n    background-color: #f2f2f2;\n    color: #000;\n}\n\n.admin-dis-chat {\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);\n}\n\n.admin-dis-chat form {\n    display: flex;\n    align-items: center;\n}\n\n.admin-dis-chat form input[type=\"text\"] {\n    flex: 1;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    margin-right: 10px;\n}\n\n.admin-dis-chat form button {\n    padding: 10px 20px;\n    background-color: #007BFF;\n    color: #fff;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.admin-dis-chat form button:hover {\n    background-color: #0056b3;\n}\n\n.dis-post {\n    display: flex;\n    flex-shrink: 0\n}\n\n.admin-dis-post {\n    margin-top: 20px;\n    background: #fff;\n    padding: 20px;\n}\n\n    " }} />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Merchants
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item nav-dropdown-item"to="/allMerchants">All Merchants</Link></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="client-list.html">Request Merchants</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="client-list.html">Aproved Merchants</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="client-list.html">Ban Merchants</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Orders
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item nav-dropdown-item"to="/orderList">All Order</Link></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="order-list.html">Pending Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="order-list.html">On Hold Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="order-list.html">Aproved Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="order-list.html">Delivery Order</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Analytics
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Merchants</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Transaction</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
                </li>
                <li className="nav-item">
              
                  <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
               
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
          
                </li>
              </ul>
            </div>
          </div>
        </nav>
          <div className="all-content">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="view-client-title my-3">
                  <a href="order-list.html"><span style={{fontSize: '30px'}}>
                      &lt; </span> View Order Details</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-4  shadow-sm">
                  <h3 className="d-inline-block font-weight-bold">ORDER #DQ130323GKKW22 &nbsp;</h3>
                  <button className="status-btn d-inline-block py-2 px-3 font-weight-bold">Delivered</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="trak-info bg-white p-4 my-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title mb-4">Tracking Details</h3>
                    </div>
                  </div>
                  <div className="row trak-status">
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453112680478/ic-confirmed-red.f41e73a9.png" alt="" />
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      <p>Product Ready</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453691494400/ic-inTransit-red.fc3e88dd.png" alt="" />
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      <p>Out for Delivery</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453402103818/ic-delivered-red.2e305d4e.png" alt="" />
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />
                      <p>Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Client Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>Ridwan Rafi</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Brand Name</h5>
                      <p>Artistic ABIR</p>
                    </div>
                    <div className="col-12">
                      <h5>Email</h5>
                      <p>abiralikhan098@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>Ridwan Rafi</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>01782159720</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>Shonir Akhra (Kacchi Bhai Er Goli, Nurpur)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="bg-white p-4 shadow-sm">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <h6>Printbaz Cost</h6>
                      <p>100 BDT</p>
                      <h6>Delivery Fee</h6>
                      <p>100 BDT</p>
                      <h6>Collect Amount</h6>
                      <p>100 BDT</p>
                      <h6>Cash Handling Fee</h6>
                      <p>100 BDT</p>
                      <h6>Receivable Amount</h6>
                      <p>100 BDT</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Order Details</h3>
                    </div>
                  </div>
                  <div className="row order-list-title">
                    <div className="col-2">
                      <h4>Color</h4>
                    </div>
                    <div className="col-2">
                      <h4>Size</h4>
                    </div>
                    <div className="col-2">
                      <h4>Quantity</h4>
                    </div>
                    <div className="col-2">
                      <h4>Print Size</h4>
                    </div>
                    <div className="col-2">
                      <h4>Main File</h4>
                    </div>
                    <div className="col-2">
                      <h4>Picture</h4>
                    </div>
                  </div>
                  <div className="row order-tab">
                    <div className="col-2">
                      <p>Black</p>
                    </div>
                    <div className="col-2">
                      M
                    </div>
                    <div className="col-2">
                      5
                    </div>
                    <div className="col-2">
                      10"X10"
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>Printbaz Logo.ai</p>
                          <span className="file-size">1009.2kb</span><br />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>Printbaz T-Shirt.jpg</p>
                          <span className="file-size">200.0kb</span><br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row order-tab">
                    <div className="col-2">
                      <p>Black</p>
                    </div>
                    <div className="col-2">
                      L
                    </div>
                    <div className="col-2">
                      10
                    </div>
                    <div className="col-2">
                      5"X5"
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>Typography.eps</p>
                          <span className="file-size">1009.2kb</span><br />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>T-Shirt Picture.png</p>
                          <span className="file-size">200.0kb</span><br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row order-tab">
                    <div className="col-2">
                      <p>Black</p>
                    </div>
                    <div className="col-2">
                      XL
                    </div>
                    <div className="col-2">
                      1
                    </div>
                    <div className="col-2">
                      10"X14"
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>Digital Art.ai</p>
                          <span className="file-size">1009.2kb</span><br />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="card file">
                        <ul className="file-options dropdown">
                          <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="dropdown-item" href="#">View Details</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Download</a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">Copy Link</a>
                            </li>
                          </ul>
                        </ul>
                        <div className="card-body file-info">
                          <p>Demo Image.jpeg</p>
                          <span className="file-size">200.0kb</span><br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="admin-dis section">
                  <div className="row admin-dis-tab">
                    <div className="col-12">
                      <ul className="nav nav-tabs admin-dis">
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a active" aria-current="page" href="#">Discussion</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">Support Tickets</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">File Manager</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="admin-dis-chat">
                    <div className="col-12">
                      <form action>
                        <input type="text" placeholder="Write Your Message....." />
                        <button type="submit">Post</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-12 admin-dis-post">
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">3:04 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Shuvro Haque <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(255, 38, 38)', color: 'white', padding: '5px', borderRadius: '5px'}}>Admin</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Abir Ali Khan <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(38, 139, 255)', color: 'white', padding: '5px', borderRadius: '5px'}}>Designer</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:15 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Tashfin Rahaman <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(255, 38, 38)', color: 'white', padding: '5px', borderRadius: '5px'}}>Admin</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ViewOrder;


