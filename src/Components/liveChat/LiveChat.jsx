import React from 'react';
import { Link } from 'react-router-dom';
import Navigationbar from '../navigationBar/Navigationbar';

const LiveChat = () => {
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\nbackground: #001846 !important;\npadding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\nwidth: 120px;\n}\n\n.nav-link {\ncolor: #ffffff !important;\nfont-size: 18px;\nfont-weight: 500;\ntext-align: center;\ntext-transform: uppercase;\npadding: 20px 20px 20px 20px;\nmargin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\nbackground-color: #ffffff;\ncolor: #001846 !important;\ntransition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\nbackground-color: #001846;\n}\n\n.nav-dropdown-item {\ncolor: #ffffff;\ntext-transform: uppercase;\n}\n\n.navbar-toggler {\nbackground-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n.chat-page {\n    margin: 20px !important;\n}\n\n}\n.chat-page {\n    margin: 20px 50px 50px 50px;\n}\n\n.chat-list-tab2 {\n    color: #001846 !important;\n    padding: 10px 25px 10px 25px;\n    margin: 0;\n}\n\n.chat-online {\n    color: #34ce57\n}\n\n.chat-offline {\n    color: #e4606d\n}\n\n.chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-message-left,\n.chat-message-right {\n    display: flex;\n    flex-shrink: 0\n}\n\n.chat-message-left {\n    margin-right: auto\n}\n\n.chat-message-right {\n    flex-direction: row-reverse;\n    margin-left: auto\n}\n.py-3 {\n    padding-top: 1rem!important;\n    padding-bottom: 1rem!important;\n}\n.px-4 {\n    padding-right: 1.5rem!important;\n    padding-left: 1.5rem!important;\n}\n.flex-grow-0 {\n    flex-grow: 0!important;\n}\n.border-top {\n    border-top: 1px solid #dee2e6!important;\n}\n\n    " }} />
        <Navigationbar/>
        <main className="chat-page">
          <h1 className="h3 mb-3">Live Chat</h1>
          <div className="card">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <input type="text" className="form-control my-3" placeholder="Search..." />
                    </div>
                  </div>
                </div>
                <ul className="nav nav-tabs chat-list-tab">
                  <li className="nav-item chat-list-tab1">
                    <a className="nav-link chat-list-tab2 active" aria-current="page" href="#">Chat</a>
                  </li>
                  <li className="nav-item chat-list-tab1">
                    <a className="nav-link chat-list-tab2" href="#">Archive</a>
                  </li>
                  <li className="nav-item chat-list-tab1">
                    <a className="nav-link chat-list-tab2" href="#">Trash</a>
                  </li>
                </ul>
                <div className="chat-user-list">
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="badge bg-success float-right">5</div>
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Abir Ali Khan
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="badge bg-success float-right">2</div>
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Tashfin Rahaman
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Fariha Hasan
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="badge bg-success float-right">5</div>
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Abir Ali Khan
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="badge bg-success float-right">2</div>
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Tashfin Rahaman
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Fariha Hasan
                        <div className="small"><span className="fas fa-circle chat-online" /> Online</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle mr-1" alt="Christina Mason" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Shuvro Haque
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Fiona Green" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Ashraful Alom
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="Doris Wilder" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Kuddus Mia
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle mr-1" alt="Haley Kennedy" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Manik Khan
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Jennifer Chang" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Sanjida Khatun
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle mr-1" alt="Christina Mason" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Shuvro Haque
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Fiona Green" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Ashraful Alom
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-start">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="Doris Wilder" width={40} height={40} />
                      <div className="flex-grow-1 ml-3">
                        Kuddus Mia
                        <div className="small"><span className="fas fa-circle chat-offline" /> Offline</div>
                      </div>
                    </div>
                  </a>
                </div>
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>Parsha Priya</strong>
                      <div className="text-muted small"><em>Typing...</em></div>
                    </div>
                    <div>
                      <button className="btn btn-lg mr-1 px-3" style={{backgroundColor: '#00AEFF', border: 'none'}}><svg fill="#000000" height={24} width={24} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.011 512.011" xmlSpace="preserve">
                          <g>
                            <g>
                              <g>
                                <path d="M447.925,0.005H64.075c-35.382,0-64.064,28.692-64.064,64.085v191.703C0.01,255.865,0,255.934,0,256.005
                                                   c0,0.071,0.01,0.14,0.011,0.211V447.92c0,35.393,28.682,64.085,64.064,64.085h383.851c35.398,0,64.085-28.687,64.085-64.085
                                                   V64.091C512.011,28.693,483.323,0.005,447.925,0.005z M64.075,42.672h383.851c11.834,0,21.419,9.585,21.419,21.419v170.581
                                                   H42.677V64.091C42.677,52.258,52.26,42.672,64.075,42.672z M447.925,469.339H64.075c-11.814,0-21.397-9.586-21.397-21.419
                                                   V277.339h426.667V447.92C469.344,459.754,459.759,469.339,447.925,469.339z" />
                                <path d="M320,320.005c-11.782,0-21.333,9.551-21.333,21.333c0,11.791-9.542,21.333-21.333,21.333h-42.667
                                                   c-11.791,0-21.333-9.542-21.333-21.333c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333
                                                   c0,35.355,28.645,64,64,64h42.667c35.355,0,64-28.645,64-64C341.333,329.557,331.782,320.005,320,320.005z" />
                                <path d="M234.667,170.672h42.667c35.355,0,64-28.645,64-64c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333
                                                   c0,11.791-9.542,21.333-21.333,21.333h-42.667c-11.791,0-21.333-9.542-21.333-21.333c0-11.782-9.551-21.333-21.333-21.333
                                                   s-21.333,9.551-21.333,21.333C170.667,142.027,199.311,170.672,234.667,170.672z" />
                              </g>
                            </g>
                          </g>
                        </svg></button>
                      <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block" style={{backgroundColor: '#E70000', border: 'none'}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="Interface / Trash_Full">
                            <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        </svg></button>
                      <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg></button>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="chat-messages p-4">
                    <div className="chat-message-right pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                      </div>
                    </div>
                    <div className="chat-message-right mb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:35 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Cum ea graeci tractatos.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:36 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
                        Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:37 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.
                      </div>
                    </div>
                    <div className="chat-message-right mb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:38 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:39 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                      </div>
                    </div>
                    <div className="chat-message-right mb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:40 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Cum ea graeci tractatos.
                      </div>
                    </div>
                    <div className="chat-message-right mb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:41 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:42 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
                        Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
                      </div>
                    </div>
                    <div className="chat-message-right mb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:43 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div className="font-weight-bold mb-1">You</div>
                        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                      </div>
                    </div>
                    <div className="chat-message-left pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:44 am</div>
                      </div>
                      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div className="font-weight-bold mb-1">Parsha Priya</div>
                        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type your message" />
                    <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
                    <button className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};

export default LiveChat;




