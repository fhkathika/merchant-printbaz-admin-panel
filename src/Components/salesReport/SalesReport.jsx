import React from 'react';
import Navigationbar from '../navigationBar/Navigationbar';

const SalesReport = () => {
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 48%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    left: 25%;\n    background: #fff;\n    width: 50%;\n    height: 50%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n    margin-bottom: 20px;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
          <Navigationbar/>
          <section className="sales_report">
            <div className="row">
              <div className="col-12">
                <div className="seals_report_title">
                  <h1>Sales Report</h1>
                </div>
              </div>
            </div>
            <div className="row non-input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Total Sales</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">11,350</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3> Amount Receivable From Courier</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">6,750</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Brand Cost</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">21,560</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Amount Payable</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">8,550</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Total Number Of Tee Shirts Sold <span style={{float: 'right'}}>204 PCS</span></h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>T-Shirt Color</th>
                          <th>Size: S</th>
                          <th>Size: M</th>
                          <th>Size: L</th>
                          <th>Size: XL</th>
                          <th>Size: XXL</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="info">
                          <td>Black</td>
                          <td>0</td>
                          <td>15</td>
                          <td>34</td>
                          <td>9</td>
                          <td>5</td>
                          <td>15th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>White</td>
                          <td>0</td>
                          <td>10</td>
                          <td>24</td>
                          <td>5</td>
                          <td>0</td>
                          <td>15th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>Black</td>
                          <td>0</td>
                          <td>15</td>
                          <td>34</td>
                          <td>9</td>
                          <td>5</td>
                          <td>14th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>White</td>
                          <td>0</td>
                          <td>10</td>
                          <td>24</td>
                          <td>5</td>
                          <td>0</td>
                          <td>14th June 2023 - 5.00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button">Update</button>
                    <button style={{float: 'right'}}>View More</button>
                  </div>
                  <div id="overlay" />
                  <div id="popup">
                    <div className="popupcontrols">
                      <span id="popupclose">X</span>
                    </div>
                    <div className="popupcontent">
                      <div className="row">
                        <div className="col-12">
                          <div className="popup-title-01">
                            <h2>Total Number Of Tee Shirts Sold</h2>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Color</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Size: S</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Size: M</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Size: L</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Size: XL</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <h3>Size: XXL</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <div className="popup-title-03">
                            <h4>Black</h4>
                          </div>
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <div className="popup-title-03">
                            <h4>White</h4>
                          </div>
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                        <div className="col-2">
                          <input type="text" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <button>Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Total Received<span style={{float: 'right'}}>10,600 ৳</span></h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="info">
                          <td>1,500 ৳</td>
                          <td>15th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>4,000 ৳</td>
                          <td>13th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>2,300 ৳</td>
                          <td>10th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>500 ৳</td>
                          <td>7th June 2023 - 5.00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button-tr">
                    <input type="text" placeholder="Type ammount & update" style={{paddingLeft: '5px'}} />
                    <button id="button" style={{float: 'right'}}>View More</button>
                    <button style={{float: 'right'}}>Update</button>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Brand Payment released<span style={{float: 'right'}}>7,600 ৳</span></h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="info">
                          <td>1,500 ৳</td>
                          <td>15th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>4,000 ৳</td>
                          <td>13th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>2,300 ৳</td>
                          <td>10th June 2023 - 5.00 AM</td>
                        </tr>
                        <tr>
                          <td>500 ৳</td>
                          <td>7th June 2023 - 5.00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button-tr">
                    <input type="text" placeholder="Type ammount & update" style={{paddingLeft: '5px'}} />
                    <button id="button" style={{float: 'right'}}>View More</button>
                    <button style={{float: 'right'}}>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
};

export default SalesReport;
