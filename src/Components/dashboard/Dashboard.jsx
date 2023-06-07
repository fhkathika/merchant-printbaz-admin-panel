import React from 'react';
import ApexCharts from 'apexcharts'
import { Link } from 'react-router-dom';
const Dashboard = () => {
  
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        \n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n\n.dashboard-container {\n    margin: 50px;\n    display: block;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.card {\n    border: 0;\n    box-shadow: 0 3px 10px rgba(62, 85, 120, .045);\n    margin-bottom: 25px;\n    border-radius: 4px\n}\n\n.card .card-body {\n    padding: 25px\n}\n\n.card .card-body .card-title {\n    font-size: 14px;\n    margin-bottom: 20px;\n    color: #000\n}\n\n.card-img-top {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px\n}\n\n.card-header {\n    padding: 10px 15px;\n    margin-bottom: 0;\n    background-color: #f2f2f2;\n    border-bottom: 1px solid #e6e6e6;\n    border-top-left-radius: 4px !important;\n    border-top-right-radius: 4px !important\n}\n\n.card-header-pills {\n    margin-right: 0;\n    margin-left: 0\n}\n\n.card-header-tabs {\n    margin-right: 0;\n    margin-bottom: -10px;\n    margin-left: 0;\n    border-bottom: 0\n}\n\n.card-footer {\n    padding: 10px 15px;\n    background-color: #f2f2f2;\n    border-top: 1px solid #e6e6e6\n}\n\n.card.text-white .card-title {\n    color: #fff\n}\n\n.card.card-transparent {\n    background: 0 0 !important;\n    box-shadow: none\n}\n\n.client-list {\n    cursor: pointer;\n    padding-top: 20px;\n}\n\n.client-list-title h4 {\n    text-transform: uppercase;\n    font-weight: bold;\n}\n\n.client-list p {\n    margin-bottom: 10px;\n}\n\n.client-list:hover {\n    background-color: aliceblue;\n    border-radius: 15px;\n    transition: linear 0.2s;\n}\n\n\n.p-status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #00aeff;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n\n}\n\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n}\n    " }} />
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
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
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
        <div className="dashboard-container">
          <div className="dashboard-body">
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-warning m-b-lg" role="alert">
                  Data has been updated 23 min ago.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card stat-card">
                  <div className="card-body">
                    <h5 className="card-title">New Merchant</h5>
                    <h2 className="float-right">1000</h2>
                    <p>From last week</p>
                    <div className="progress" style={{height: '10px'}}>
                      <div className="progress-bar bg-warning" role="progressbar" style={{width: '45%'}} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card stat-card">
                  <div className="card-body">
                    <h5 className="card-title">Orders</h5>
                    <h2 className="float-right">500</h2>
                    <p>Orders in Progress</p>
                    <div className="progress" style={{height: '10px'}}>
                      <div className="progress-bar bg-info" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card stat-card">
                  <div className="card-body">
                    <h5 className="card-title">Monthly Profit</h5>
                    <h2 className="float-right">1,00000.0TK</h2>
                    <p>For last 30 days</p>
                    <div className="progress" style={{height: '10px'}}>
                      <div className="progress-bar bg-success" role="progressbar" style={{width: '45%'}} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Earnings</h5>
                    <div id="earnings" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Last Orders</h5>
                    <div className="row" style={{marginBottom: '30px'}}>
                      <div className="col-lg-2 col-sm-12">
                        <h4>Name</h4>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <h4>Order Id</h4>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <h4>Recipient Info</h4>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <h4>Payment</h4>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <h4>Amount</h4>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <h4>Status</h4>
                      </div>
                    </div>
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div>   
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
                    </div> 
                    <div className="row client-list">
                      <div className="col-lg-2 col-sm-12">
                        <p>Abir Ali Khan</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>1684051962640</p>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <p>Abir Ali Khan</p>
                        <p>Tara Medical Center, Mirpur 11, Dhaka, Bangladesh</p>
                        <p>01956821703</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p className="p-status-btn">Paid</p>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <p>137.2 TK</p>
                      </div>
                      <div className="col-lg-1 col-sm-12">
                        <p className="status-btn">Delivery</p>
                        <p style={{fontSize: '14px'}}>05 May 2023</p>
                      </div>
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

export default Dashboard;

