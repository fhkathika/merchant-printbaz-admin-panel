import React from 'react';
import { Link } from 'react-router-dom';

const Filemanager = () => {
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
        <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n\n.file-manager-container {\n    display: block;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.header-fixed .file-manager-container {\n    margin-top: 129px\n}\n\n.sidebar-show .file-manager-container {\n    transform: translateX(300px)\n}\n\n.file-manager-container .file-manager-body .container-fluid,\n.file-manager-container .file-manager-footer .container-fluid {\n    padding-left: 50px;\n    padding-right: 50px\n}\n\n.page-title h2 {\n    margin: 50px 0 10px 25px;\n}\n\n.file-manager-footer .footer-text {\n    display: block;\n    padding: 10px 25px 30px\n}\n\n.card {\n    border: 0;\n    box-shadow: 0 3px 10px rgba(62, 85, 120, .045);\n    margin-bottom: 25px;\n    border-radius: 4px\n}\n\n.card .card-body {\n    padding: 25px\n}\n\n.card .card-body .card-title {\n    font-size: 14px;\n    margin-bottom: 20px;\n    color: #000\n}\n\n.card-img-top {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px\n}\n\n.card-header {\n    padding: 10px 15px;\n    margin-bottom: 0;\n    background-color: #f2f2f2;\n    border-bottom: 1px solid #e6e6e6;\n    border-top-left-radius: 4px !important;\n    border-top-right-radius: 4px !important\n}\n\n.card-header-pills {\n    margin-right: 0;\n    margin-left: 0\n}\n\n.card-header-tabs {\n    margin-right: 0;\n    margin-bottom: -10px;\n    margin-left: 0;\n    border-bottom: 0\n}\n\n.card-footer {\n    padding: 10px 15px;\n    background-color: #f2f2f2;\n    border-top: 1px solid #e6e6e6\n}\n\n.card.text-white .card-title {\n    color: #fff\n}\n\n.card.card-transparent {\n    background: 0 0 !important;\n    box-shadow: none\n}\n\n.file-manager-menu {\n    margin-top: 20px\n}\n\n.file-manager-menu .fmm-title {\n    padding: 10px 15px;\n    text-transform: uppercase;\n    font-size: 12px;\n    font-weight: 600;\n    opacity: .4\n}\n\n.file-manager-menu ul li a {\n    margin: 10px 15px;\n    display: block;\n    color: #384c6d;\n    opacity: .6;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.file-manager-menu ul li a.active,\n.file-manager-menu ul li a:hover {\n    color: #037afb;\n    opacity: 1\n}\n\n.file-manager-menu ul li a i {\n    font-size: 18px;\n    vertical-align: top;\n    margin-right: 10px\n}\n\n.file-manager-menu.label-menu ul li a i {\n    width: 6px;\n    height: 6px;\n    border-radius: 6px;\n    background: #000;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 0 16px 0 6px\n}\n\n.search-box-info .storage-info-title {\n    text-transform: uppercase;\n    font-size: 12px;\n    font-weight: 600;\n    opacity: .4;\n    display: block;\n    margin-bottom: 15px\n}\n\n.storage-info {\n    display: block;\n}\n\n.storage-info .storage-info-title {\n    text-transform: uppercase;\n    font-size: 12px;\n    font-weight: 600;\n    opacity: .4;\n    display: block;\n    margin-bottom: 15px\n}\n\n.storage-info .storage-info-text {\n    margin-bottom: 10px;\n    display: block;\n    font-weight: 500;\n    font-size: 12px\n}\n\n.file-list,\n.recent-files .file {\n    margin-bottom: 0\n}\n\n.file-options {\n    position: absolute;\n    right: 0;\n    top: 0;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out;\n    z-index: 999;\n}\n\n.file:hover .file-options,\n.folder:hover .file-options {\n    visibility: visible;\n    opacity: 1\n}\n\n.file-options > a {\n    margin: 15px 10px;\n    display: block;\n    color: #384c6d;\n    opacity: .6;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out;\n}\n\n.file-options > a i {\n    font-size: 19px\n}\n\n.file-options > a:hover {\n    opacity: 1\n}\n\n.file-options > a::after {\n    display: none\n}\n\n.file .file-icon {\n    vertical-align: middle;\n    font-size: 48px;\n    text-align: center;\n    line-height: 100px\n}\n\n.file .file-icon i {\n    vertical-align: middle;\n    font-size: 48px\n}\n\n.file.photo .file-icon i {\n    color: #5780f7\n}\n\n.file.pdf .file-icon i {\n    color: #eb463f\n}\n\n.file .file-info p {\n    font-weight: 500;\n    margin-bottom: 0\n}\n\n.file .file-info span.file-size {\n    color: rgba(0, 0, 0, .4)\n}\n\n.file .file-info span.file-date {\n    font-size: 12px;\n    color: rgba(0, 0, 0, .4);\n    margin-top: 10px;\n    display: block\n}\n\n.folder .folder-icon {\n    float: left\n}\n\n.folder .folder-icon i {\n    font-size: 36px\n}\n\n.folder .folder-info {\n    display: block;\n    margin-left: 20px;\n    float: left\n}\n\n.folder .folder-info a {\n    font-weight: 500;\n    margin-bottom: 0;\n    color: #384c6d;\n    display: block\n}\n\n.folder .folder-info span {\n    font-size: 12px;\n    color: rgba(0, 0, 0, .4)\n}\n\n@media (max-width:1200px) {\n    .file {\n        margin-bottom: 20px !important\n    }\n}\n    " }} />
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
        <div className="file-manager-container">
          <div className="file-manager-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-title">
                    <h2>File Manager</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <div className="card card-transparent">
                    <div className="card-body">
                      <a href="#" className="btn btn-primary btn-block">Upload File</a>
                      <div className="file-manager-menu">
                        <ul className="list-unstyled">
                          <li className="fmm-title">My Drive</li>
                          <li>
                            <a href="#"><i className="material-icons">folder_open</i>All Files</a>
                          </li>
                          <li>
                            <a href="#"><i className="material-icons">access_time</i>Recents</a>
                          </li>
                          <li>
                            <a href="#"><i className="material-icons">laptop</i>Admin Devices</a>
                          </li>
                          <li>
                            <a href="#"><i className="material-icons">laptop</i>Client Devices</a>
                          </li>
                          <li>
                            <a href="#"><i className="material-icons">star_border</i>Important</a>
                          </li>
                          <li>
                            <a href="#"><i className="material-icons">delete_outline</i>Deleted</a>
                          </li>
                        </ul>
                      </div>
                      <div className="search-box-info mb-5 mt-5">
                        <span className="storage-info-title">Search</span>
                        <input className="form-control me-2 mb-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                      </div>
                      <div className="storage-info">
                        <span className="storage-info-title">Storage</span>
                        <span className="storage-info-text">125.4GB used of 500GB</span>
                        <div className="progress m-b-sm">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="card card-transparent file-list recent-files">
                    <div className="card-body">
                      <h5 className="card-title">RECENT FILES</h5>
                      <div className="row">
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file photo">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">photo</i>
                            </div>
                            <div className="card-body file-info">
                              <p>IMG_08719.jpg</p>
                              <span className="file-size">657.9kb</span><br />
                              <span className="file-date">Last Accessed: 17min ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file pdf">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">description</i>
                            </div>
                            <div className="card-body file-info">
                              <p>Lease_05.pdf</p>
                              <span className="file-size">17.5kb</span><br />
                              <span className="file-date">Last Accessed: 2 hours ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file code">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">code</i>
                            </div>
                            <div className="card-body file-info">
                              <p>user_info.java</p>
                              <span className="file-size">12.7kb</span><br />
                              <span className="file-date">Last Accessed: 6 hours ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file audio">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">volume_up</i>
                            </div>
                            <div className="card-body file-info">
                              <p>music_1.mp3</p>
                              <span className="file-size">37.4mb</span><br />
                              <span className="file-date">Last Accessed: 7 hours ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-transparent file-list">
                    <div className="card-body">
                      <h5 className="card-title">FOLDERS</h5>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card folder">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-body">
                              <div className="folder-icon">
                                <i className="material-icons">folder_open</i>
                              </div>
                              <div className="folder-info">
                                <a href="#">Abir Ali Khan</a>
                                <span>20 files, 156mb</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card folder">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-body">
                              <div className="folder-icon">
                                <i className="material-icons">folder_open</i>
                              </div>
                              <div className="folder-info">
                                <a href="#">Ai</a>
                                <span>87 files, 417mb</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card folder">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-body">
                              <div className="folder-icon">
                                <i className="material-icons">folder_open</i>
                              </div>
                              <div className="folder-info">
                                <a href="#">Picture</a>
                                <span>87 files, 56mb</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-transparent file-list">
                    <div className="card-body">
                      <h5 className="card-title">FILES</h5>
                      <div className="row">
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file pdf">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">description</i>
                            </div>
                            <div className="card-body file-info">
                              <p>users.txt</p>
                              <span className="file-size">14.2kb</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file audio">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">volume_up</i>
                            </div>
                            <div className="card-body file-info">
                              <p>group_project.mp3</p>
                              <span className="file-size">1.2mb</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file code">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">code</i>
                            </div>
                            <div className="card-body file-info">
                              <p>upload.php</p>
                              <span className="file-size">12.7kb</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file code">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">code</i>
                            </div>
                            <div className="card-body file-info">
                              <p>check_status.php</p>
                              <span className="file-size">23.8kb</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file photo">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">photo</i>
                            </div>
                            <div className="card-body file-info">
                              <p>friends_09.jpg</p>
                              <span className="file-size">389.2kb</span><br />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-3">
                          <div className="card file photo">
                            <ul className="file-options dropdown">
                              <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">more_vert</i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a className="dropdown-item" href="#">View Details</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Mark as Important</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Move To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy To</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Rename</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Download</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Copy Link</a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">Delete</a>
                                </li>
                              </ul>
                            </ul>
                            <div className="card-header file-icon">
                              <i className="material-icons">photo</i>
                            </div>
                            <div className="card-body file-info">
                              <p>friends_08.jpg</p>
                              <span className="file-size">436.6kb</span><br />
                            </div>
                          </div>
                        </div>
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

export default Filemanager;


