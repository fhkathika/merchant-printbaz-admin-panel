import React from 'react';
import { Link } from 'react-router-dom';

const Mailbox = () => {
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n        .page-content {\n            margin: 50px;\n        }\n\n        .page-title-box {\n            margin-bottom: 20px;\n        }\n\n        .email-leftbar {\n            width: 236px;\n            float: left;\n            padding: 20px;\n            border-radius: 5px\n        }\n\n        .email-rightbar {\n            margin-left: 260px\n        }\n\n        .chat-user-box p.user-title {\n            color: #343a40;\n            font-weight: 600\n        }\n\n        .chat-user-box p {\n            font-size: 12px\n        }\n\n        @media (max-width:767px) {\n            .email-leftbar {\n                float: none;\n                width: 100%\n            }\n\n            .email-rightbar {\n                margin: 0\n            }\n        }\n\n        .mail-list a {\n            display: block;\n            color: #74788d;\n            line-height: 24px;\n            padding: 8px 5px\n        }\n\n        .mail-list a.active {\n            color: #ff3d60;\n            font-weight: 500\n        }\n\n        .message-list {\n            display: block;\n            padding-left: 0\n        }\n\n        .message-list li {\n            position: relative;\n            display: block;\n            height: 50px;\n            line-height: 50px;\n            cursor: default;\n            -webkit-transition-duration: .3s;\n            transition-duration: .3s\n        }\n\n        .message-list li a {\n            color: #74788d\n        }\n\n        .message-list li:hover {\n            background: #f1f5f7;\n            -webkit-transition-duration: .05s;\n            transition-duration: .05s\n        }\n\n        .message-list li .col-mail {\n            float: left;\n            position: relative\n        }\n\n        .message-list li .col-mail-1 {\n            width: 320px\n        }\n\n        .message-list li .col-mail-1 .checkbox-wrapper-mail,\n        .message-list li .col-mail-1 .dot,\n        .message-list li .col-mail-1 .star-toggle {\n            display: block;\n            float: left\n        }\n\n        .message-list li .col-mail-1 .dot {\n            border: 4px solid transparent;\n            border-radius: 100px;\n            margin: 22px 26px 0;\n            height: 0;\n            width: 0;\n            line-height: 0;\n            font-size: 0\n        }\n\n        .message-list li .col-mail-1 .checkbox-wrapper-mail {\n            margin: 15px 10px 0 20px\n        }\n\n        .message-list li .col-mail-1 .star-toggle {\n            margin-top: 18px;\n            margin-left: 5px\n        }\n\n        .message-list li .col-mail-1 .title {\n            position: absolute;\n            top: 0;\n            left: 110px;\n            right: 0;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            white-space: nowrap;\n            margin-bottom: 0\n        }\n\n        .message-list li .col-mail-2 {\n            position: absolute;\n            top: 0;\n            left: 320px;\n            right: 0;\n            bottom: 0\n        }\n\n        .message-list li .col-mail-2 .date,\n        .message-list li .col-mail-2 .subject {\n            position: absolute;\n            top: 0\n        }\n\n        .message-list li .col-mail-2 .subject {\n            left: 0;\n            right: 200px;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            white-space: nowrap\n        }\n\n        .message-list li .col-mail-2 .date {\n            right: 0;\n            width: 170px;\n            padding-left: 80px\n        }\n\n        .message-list li.active,\n        .message-list li.active:hover {\n            -webkit-box-shadow: inset 3px 0 0 #5664d2;\n            box-shadow: inset 3px 0 0 #5664d2\n        }\n\n        .message-list li.unread {\n            background-color: #f1f5f7;\n            font-weight: 500;\n            color: #292d32\n        }\n\n        .message-list li.unread a {\n            color: #292d32;\n            font-weight: 500\n        }\n\n        .message-list .checkbox-wrapper-mail {\n            cursor: pointer;\n            height: 20px;\n            width: 20px;\n            position: relative;\n            display: inline-block;\n            -webkit-box-shadow: inset 0 0 0 1px #ced4da;\n            box-shadow: inset 0 0 0 1px #ced4da;\n            border-radius: 1px\n        }\n\n        .message-list .checkbox-wrapper-mail input {\n            opacity: 0;\n            cursor: pointer\n        }\n\n        .message-list .checkbox-wrapper-mail input:checked~label {\n            opacity: 1\n        }\n\n        .message-list .checkbox-wrapper-mail label {\n            position: absolute;\n            height: 20px;\n            width: 20px;\n            left: 0;\n            cursor: pointer;\n            opacity: 0;\n            margin-bottom: 0;\n            -webkit-transition-duration: .05s;\n            transition-duration: .05s;\n            top: 0\n        }\n\n        .message-list .checkbox-wrapper-mail label:before {\n            content: \"\\F012C\";\n            font-family: \"Material Design Icons\";\n            top: 0;\n            height: 20px;\n            color: #292d32;\n            width: 20px;\n            position: absolute;\n            margin-top: -16px;\n            left: 4px;\n            font-size: 13px\n        }\n\n        @media (max-width:575.98px) {\n            .message-list li .col-mail-1 {\n                width: 200px\n            }\n        }\n\n        .chat-leftsidebar {\n            background-color: #fff;\n            border-radius: .25rem 0 0 .25rem;\n            -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .08);\n            box-shadow: 0 2px 4px rgba(0, 0, 0, .08)\n        }\n\n        @media (min-width:992px) {\n            .chat-leftsidebar {\n                min-width: 360px\n            }\n        }\n\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n            .page-content {\n                margin: 10px;\n            }\n\n        }\n\n        /*# sourceMappingURL=app.min.css.map */\n\n    " }} />
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
        {/* Begin page */}
        <div id="layout-wrapper">
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 className="mb-sm-0">merchants@printbaz.com</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item"><a href="javascript: void(0);">Email</a></li>
                          <li className="breadcrumb-item active">Inbox</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                <div className="row">
                  <div className="col-12">
                    {/* Left sidebar */}
                    <div className="email-leftbar card">
                      <div className="d-grid">
                        <button type="button" className="btn btn-danger waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#composemodal">
                          Compose
                        </button>
                      </div>
                      <div className="mail-list mt-4">
                        <a href="#" className="active"><i className="mdi mdi-email-outline me-2" /> Inbox <span className="ms-1 float-end">(18)</span></a>
                        <a href="#"><i className="mdi mdi-star-outline me-2" />Starred</a>
                        <a href="#"><i className="mdi mdi-diamond-stone me-2" />Important</a>
                        <a href="#"><i className="mdi mdi-file-outline me-2" />Draft</a>
                        <a href="#"><i className="mdi mdi-email-check-outline me-2" />Sent Mail</a>
                        <a href="#"><i className="mdi mdi-trash-can-outline me-2" />Trash</a>
                      </div>
                    </div>
                    {/* End Left sidebar */}
                    {/* Right Sidebar */}
                    <div className="email-rightbar mb-3">
                      <div className="card">
                        <div className="btn-toolbar p-3" role="toolbar">
                          <div className="btn-group me-2 mb-2 mb-sm-0">
                            <button type="button" className="btn btn-primary waves-light waves-effect"><i className="fa fa-inbox" /></button>
                            <button type="button" className="btn btn-primary waves-light waves-effect"><i className="fa fa-exclamation-circle" /></button>
                            <button type="button" className="btn btn-primary waves-light waves-effect"><i className="far fa-trash-alt" /></button>
                          </div>
                          <div className="btn-group me-2 mb-2 mb-sm-0">
                            <button type="button" className="btn btn-primary waves-light waves-effect dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa fa-folder" /> <i className="mdi mdi-chevron-down ms-1" />
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">Updates</a>
                              <a className="dropdown-item" href="#">Social</a>
                              <a className="dropdown-item" href="#">Team Manage</a>
                            </div>
                          </div>
                          <div className="btn-group me-2 mb-2 mb-sm-0">
                            <button type="button" className="btn btn-primary waves-light waves-effect dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa fa-tag" /> <i className="mdi mdi-chevron-down ms-1" />
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">Updates</a>
                              <a className="dropdown-item" href="#">Social</a>
                              <a className="dropdown-item" href="#">Team Manage</a>
                            </div>
                          </div>
                          <div className="btn-group me-2 mb-2 mb-sm-0">
                            <button type="button" className="btn btn-primary waves-light waves-effect dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              More <i className="mdi mdi-dots-vertical ms-2" />
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">Mark as Unread</a>
                              <a className="dropdown-item" href="#">Mark as Important</a>
                              <a className="dropdown-item" href="#">Add to Tasks</a>
                              <a className="dropdown-item" href="#">Add Star</a>
                              <a className="dropdown-item" href="#">Mute</a>
                            </div>
                          </div>
                        </div>
                        <ul className="message-list">
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk19" />
                                <label className="form-label" htmlFor="chk19" />
                              </div>
                              <a href="#" className="title">Peter, me (3)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Hello – <span className="teaser">Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)</span>
                              </a>
                              <div className="date">Mar 6</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk20" />
                                <label className="form-label" htmlFor="chk20" />
                              </div>
                              <a href="#" className="title">me, Susanna (7)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-warning badge me-2">Freelance</span>Since you asked... and i'm
                                inconceivably bored at the train station –
                                <span className="teaser">Alright thanks. I'll have to re-book that somehow, i'll get back to you.</span>
                              </a>
                              <div className="date">Mar. 6</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk6" />
                                <label className="form-label" htmlFor="chk6" />
                              </div>
                              <a href="#" className="title">Web Support Dennis</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Re: New mail settings –
                                <span className="teaser">Will you answer him asap?</span>
                              </a>
                              <div className="date">Mar 7</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk7" />
                                <label className="form-label" htmlFor="chk7" />
                              </div>
                              <a href="#" className="title">me, Peter (2)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-info badge me-2">Support</span>Off on Thursday -
                                <span className="teaser">Eff that place, you might as well stay here with us instead! Sent from my iPhone 4 4 mar 2014 at 5:55 pm</span>
                              </a>
                              <div className="date">Mar 4</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk8" />
                                <label className="form-label" htmlFor="chk8" />
                              </div>
                              <a href="#" className="title">Medium</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-primary badge me-2">Social</span>This Week's Top Stories –
                                <span className="teaser">Our top pick for you on Medium this week The Man Who Destroyed America’s Ego</span>
                              </a>
                              <div className="date">Feb 28</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk9" />
                                <label className="form-label" htmlFor="chk9" />
                              </div>
                              <a href="#" className="title">Death to Stock</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Montly High-Res Photos –
                                <span className="teaser">To create this month's pack, we hosted a party with local musician Jared Mahone here in Columbus, Ohio.</span>
                              </a>
                              <div className="date">Feb 28</div>
                            </div>
                          </li>
                          <li className="unread">
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk3" />
                                <label className="form-label" htmlFor="chk3" />
                              </div>
                              <a href="#" className="title">Randy, me (5)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-success badge me-2">Family</span>Last pic over my village –
                                <span className="teaser">Yeah i'd like that! Do you remember the video you showed me of your train ride between Colombo and Kandy? The one with the mountain view? I would love to see that one again!</span>
                              </a>
                              <div className="date">5:01 am</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk4" />
                                <label className="form-label" htmlFor="chk4" />
                              </div>
                              <a href="#" className="title">Andrew Zimmer</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Mochila Beta: Subscription Confirmed
                                – <span className="teaser">You've been confirmed! Welcome to the ruling class of the inbox. For your records, here is a copy of the information you submitted to us...</span>
                              </a>
                              <div className="date">Mar 8</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk5" />
                                <label className="form-label" htmlFor="chk5" />
                              </div>
                              <a href="#" className="title">Infinity HR</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Sveriges Hetaste sommarjobb –
                                <span className="teaser">Hej Nicklas Sandell! Vi vill bjuda in dig till "First tour 2014", ett rekryteringsevent som erbjuder jobb på 16 semesterorter iSverige.</span>
                              </a>
                              <div className="date">Mar 8</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk10" />
                                <label className="form-label" htmlFor="chk10" />
                              </div>
                              <a href="#" className="title">Revibe</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-danger badge me-2">Friends</span>Weekend on Revibe –
                                <span className="teaser">Today's Friday and we thought maybe you want some music inspiration for the weekend. Here are some trending tracks and playlists we think you should give a listen!</span>
                              </a>
                              <div className="date">Feb 27</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk11" />
                                <label className="form-label" htmlFor="chk11" />
                              </div>
                              <a href="#" className="title">Erik, me (5)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Regarding our meeting –
                                <span className="teaser">That's great, see you on Thursday!</span>
                              </a>
                              <div className="date">Feb 24</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk12" />
                                <label className="form-label" htmlFor="chk12" />
                              </div>
                              <a href="#" className="title">KanbanFlow</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-primary badge me-2">Social</span>Task assigned: Clone ARP's website
                                – <span className="teaser">You have been assigned a task by Alex@Work on the board Web.</span>
                              </a>
                              <div className="date">Feb 24</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk13" />
                                <label className="form-label" htmlFor="chk13" />
                              </div>
                              <a href="#" className="title">Tobias Berggren</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Let's go fishing! –
                                <span className="teaser">Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.</span>
                              </a>
                              <div className="date">Feb 23</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk14" />
                                <label className="form-label" htmlFor="chk14" />
                              </div>
                              <a href="#" className="title">Charukaw, me (7)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Hey man – <span className="teaser">Nah man sorry i don't. Should i get it?</span>
                              </a>
                              <div className="date">Feb 23</div>
                            </div>
                          </li>
                          <li className="unread">
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk15" />
                                <label className="form-label" htmlFor="chk15" />
                              </div>
                              <a href="#" className="title">me, Peter (5)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject"><span className="bg-info badge me-2">Support</span>Home again! – <span className="teaser">That's just perfect! See you tomorrow.</span>
                              </a>
                              <div className="date">Feb 21</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk16" />
                                <label className="form-label" htmlFor="chk16" />
                              </div>
                              <a href="#" className="title">Stack Exchange</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">1 new items in your Stackexchange inbox
                                – <span className="teaser">The following items were added to your Stack Exchange global inbox since you last checked it.</span>
                              </a>
                              <div className="date">Feb 21</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk17" />
                                <label className="form-label" htmlFor="chk17" />
                              </div>
                              <a href="#" className="title">Google Drive Team</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">You can now use your storage in Google
                                Drive – <span className="teaser">Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.</span>
                              </a>
                              <div className="date">Feb 20</div>
                            </div>
                          </li>
                          <li>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id="chk18" />
                                <label className="form-label" htmlFor="chk18" />
                              </div>
                              <a href="#" className="title">me, Susanna (11)</a><span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <a href="#" className="subject">Train/Bus – <span className="teaser">Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.</span>
                              </a>
                              <div className="date">Feb 19</div>
                            </div>
                          </li>
                        </ul>
                      </div> {/* card */}
                      <div className="row">
                        <div className="col-7">
                          Showing 1 - 20 of 1,524
                        </div>
                        <div className="col-5">
                          <div className="btn-group float-end">
                            <button type="button" className="btn btn-sm btn-success waves-effect"><i className="fa fa-chevron-left" /></button>
                            <button type="button" className="btn btn-sm btn-success waves-effect"><i className="fa fa-chevron-right" /></button>
                          </div>
                        </div>
                      </div>
                    </div> {/* end Col-9 */}
                  </div>
                </div>{/* End row */}
              </div> {/* container-fluid */}
            </div>
            {/* End Page-content */}
            {/* Modal */}
            <div className="modal fade" id="composemodal" tabIndex={-1} role="dialog" aria-labelledby="composemodalTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="composemodalTitle">New Message</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <input type="email" className="form-control" placeholder="To" />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Subject" />
                      </div>
                      <div className="mb-3">
                        <textarea id="elm1" name="area" defaultValue={""} />
                      </div></form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Send <i className="fab fa-telegram-plane ms-1" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end main content*/}
        </div>
        {/* END layout-wrapper */}
      </div>
    );
};

export default Mailbox;

