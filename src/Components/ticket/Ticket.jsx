// import React from 'react';
// import { Link } from 'react-router-dom';

// const Ticket = () => {
//     return (
//         <div>
//           <meta charSet="UTF-8" />
//           <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
//           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
//           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
//           <title>Admin Dashboard</title>
//           <style dangerouslySetInnerHTML={{__html: "\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\nbackground: #001846 !important;\npadding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\nwidth: 120px;\n}\n\n.nav-link {\ncolor: #ffffff !important;\nfont-size: 18px;\nfont-weight: 500;\ntext-align: center;\ntext-transform: uppercase;\npadding: 20px 20px 20px 20px;\nmargin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\nbackground-color: #ffffff;\ncolor: #001846 !important;\ntransition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\nbackground-color: #001846;\n}\n\n.nav-dropdown-item {\ncolor: #ffffff;\ntext-transform: uppercase;\n}\n\n.navbar-toggler {\nbackground-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n.chat-page {\n    margin: 20px !important;\n}\n\n}\n.chat-page {\n    margin: 20px 50px 50px 50px;\n}\n\n.chat-list-tab2 {\n    color: #001846 !important;\n    padding: 10px 25px 10px 25px;\n    margin: 0;\n}\n\n.chat-online {\n    color: #34ce57\n}\n\n.chat-offline {\n    color: #e4606d\n}\n\n.chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-message-left,\n.chat-message-right {\n    display: flex;\n    flex-shrink: 0\n}\n\n.chat-message-left {\n    margin-right: auto\n}\n\n.chat-message-right {\n    flex-direction: row-reverse;\n    margin-left: auto\n}\n.py-3 {\n    padding-top: 1rem!important;\n    padding-bottom: 1rem!important;\n}\n.px-4 {\n    padding-right: 1.5rem!important;\n    padding-left: 1.5rem!important;\n}\n.flex-grow-0 {\n    flex-grow: 0!important;\n}\n.border-top {\n    border-top: 1px solid #dee2e6!important;\n}\n\n    " }} />
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <div className="container-fluid">
//           <Link className="navbar-brand" to="/">
//               <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
//             </Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon" />
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNavDropdown">
//               <ul className="navbar-nav">
//                 <li className="nav-item">
//                   <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

//                 </li> 
//                 <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
//                 </li>
//                 <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
//                 </li>
              
//                 <li className="nav-item dropdown">
//                   <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Analytics
//                   </a>
//                   <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//                     <li><a className="dropdown-item nav-dropdown-item" href="#">Merchants</a></li>
//                     <li><a className="dropdown-item nav-dropdown-item" href="#">Order</a></li>
//                     <li><a className="dropdown-item nav-dropdown-item" href="#">Transaction</a></li>
//                   </ul>
//                 </li>
//                 <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
//                 </li>
//                 <li className="nav-item">
              
//                   <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
               
//                 </li>
//                 <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
          
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//           <main className="chat-page">
//             <h1 className="h3 mb-3">Ticket</h1>
//             <div className="card">
//               <div className="row g-0">
//                 <div className="col-12 col-lg-5 col-xl-3 border-right">
//                   <div className="px-4 d-none d-md-block">
//                     <div className="d-flex align-items-center">
//                       <div className="flex-grow-1">
//                         <input type="text" className="form-control my-3" placeholder="Search..." />
//                       </div>
//                     </div>
//                   </div>
//                   <ul className="nav nav-tabs chat-list-tab">
//                     <li className="nav-item chat-list-tab1">
//                       <a className="nav-link chat-list-tab2 active" aria-current="page" href="#">Open Ticket</a>
//                     </li>
//                     <li className="nav-item chat-list-tab1">
//                       <a className="nav-link chat-list-tab2" href="#">Close Ticket</a>
//                     </li>
//                   </ul>
//                   <div className="chat-user-list">
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="badge bg-success float-right">5</div>
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="badge bg-success float-right">2</div>
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="badge bg-success float-right">5</div>
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="badge bg-success float-right">2</div>
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                     <a href="#" className="list-group-item list-group-item-action border-0">
//                       <div className="d-flex align-items-start">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                         <div className="flex-grow-1 ml-3">
//                           1684051962640
//                           <div className="small">05 May 2023, 5:30 PM</div>
//                         </div>
//                       </div>
//                     </a>
//                   </div>
//                   <hr className="d-block d-lg-none mt-1 mb-0" />
//                 </div>
//                 <div className="col-12 col-lg-7 col-xl-9">
//                   <div className="py-2 px-4 border-bottom d-none d-lg-block">
//                     <div className="d-flex align-items-center py-1">
//                       <div className="position-relative">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                       </div>
//                       <div className="flex-grow-1 pl-3">
//                         <strong>1684051962640</strong>
//                         <div className="text-muted small"><em>Typing...</em></div>
//                       </div>
//                       <div>
//                         <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block" style={{backgroundColor: '#E70000', border: 'none'}}><svg width={24} height={24} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" /></svg></button>
//                         <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg></button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="position-relative">
//                     <div className="chat-messages p-4">
//                       <div className="chat-message-right pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:33 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:34 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
//                         </div>
//                       </div>
//                       <div className="chat-message-right mb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:35 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Cum ea graeci tractatos.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:36 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
//                           Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:37 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.
//                         </div>
//                       </div>
//                       <div className="chat-message-right mb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:38 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:39 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
//                         </div>
//                       </div>
//                       <div className="chat-message-right mb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:40 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Cum ea graeci tractatos.
//                         </div>
//                       </div>
//                       <div className="chat-message-right mb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:41 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:42 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
//                           Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
//                         </div>
//                       </div>
//                       <div className="chat-message-right mb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:43 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                           <div className="font-weight-bold mb-1">You</div>
//                           Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
//                         </div>
//                       </div>
//                       <div className="chat-message-left pb-4">
//                         <div>
//                           <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
//                           <div className="text-muted small text-nowrap mt-2">2:44 am</div>
//                         </div>
//                         <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
//                           <div className="font-weight-bold mb-1">1684051962640</div>
//                           Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex-grow-0 py-3 px-4 border-top">
//                     <div className="input-group">
//                       <input type="text" className="form-control" placeholder="Type your message" />
//                       <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
//                       <button className="btn btn-primary">Send</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//     );
// };

// export default Ticket;

import React from 'react';
import { Link } from 'react-router-dom';

const Ticket = () => {
  return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link rel="stylesheet" href="styles.css" />
    <title>Admin Dashboard</title>
    <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            margin-top: 3px;\n            margin-bottom: 3px;\n\n        }\n\n        .ticket-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n\n        }\n\n        .ticket-info h2 {\n            display: inline-block;\n            font-size: 25px;\n            font-weight: 700;\n        }\n\n        .ticket-info p {\n            font-size: 14px;\n            font-weight: 600;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .mer-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n\n        }\n\n        .mer-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n        .mer-info h2 {\n            display: inline-block;\n            font-size: 20px;\n            font-weight: 700;\n            color: rgb(0, 157, 255);\n        }\n\n        .mer-info button {\n            float: right;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n\n        }\n\n        .mer-info button:hover {\n            border: 1px solid #cfd7df;\n            color: #ca0909;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n\n        }\n\n        .mer-info h3 {\n            font-size: 14px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n            font-style: italic;\n        }\n\n        .mer-info p {\n            font-size: 16px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .ticket-replay {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n\n        }\n\n        .ticket-replay img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .filter-text h2 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .filter-text h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            margin-bottom: 25px;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n        .filter-update-button button {\n            width: 100%;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n            font-weight: 700;\n\n        }\n\n        .filter-update-button button:hover {\n            border: 1px solid #cfd7df;\n            color: #ffffff;\n            background: rgb(0, 194, 0);\n            transition: .1s ease-in;\n\n        }\n\n        .profile-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .profile-section img {\n            width: 80px;\n            display: inline-block;\n            border-radius: 5px;\n            margin-left: 30%;\n        }\n\n        .profile-section h2 {\n            margin-top: 20px;\n            font-size: 18px;\n            font-weight: 700;\n            display: inline-block;\n        }\n\n        .profile-section h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            display: inline-block;\n        }\n\n        .profile-section p {\n            margin-top: 15px;\n            font-size: 16px;\n            font-weight: 600;\n            display: inline-block;\n        }\n\n    " }} />
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
    <section className="ticket-system">
      <div className="row">
        <div className="col-12">
          <div className="ticket-header">
            <h1>Ticket View</h1>
          </div>
          <div className="ticket-top-menu">
            <button className="ttm-button"><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Replay</button>
            <button className="ttm-button"><i className="fa fa-check-circle" aria-hidden="true" style={{marginRight: '5px'}} />Close</button>
            <button className="ttm-button"><i className="fa fa-trash" aria-hidden="true" style={{marginRight: '5px'}} />Delete</button>
            <button className="ttm-button"><i className="fa fa-paper-plane" aria-hidden="true" style={{marginRight: '5px'}} />Send Copy</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <div className="ticket-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1117395441697443860/pngegg_15.png" alt="" />
                <h2>On Hold - Artwork Issue</h2>
                <p>Order ID: 6473426967f7ef918a38503b</p>
                <p>Ticket ID: 6473426967f7ef918a38503b</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="mer-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                <h2>Md. Raihan Ahamad Rabbi</h2>
                <button><i className="fa fa-trash" aria-hidden="true" /></button>
                <h3>2 days ago (Fri, 9 Jun 2023 at 3:46 AM)</h3> <br />
                <p>Hi,
                  <br /><br />
                  The television I ordered from your site was delivered with a cracked screen. I need some help with a refund or a replacement.
                  <br />
                  Here is the order number FD07062010
                  <br /><br />
                  Thanks,<br />
                  Raihan
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="mer-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                <h2 style={{color: 'red'}}>Shuvro Haque</h2>
                <button><i className="fa fa-trash" aria-hidden="true" /></button>
                <h3>a few seconds ago (Sun, 11 Jun 2023 at 11:40 AM)</h3> <br />
                <p>Hi,
                  <br /><br />
                  The television I ordered from your site was delivered with a cracked screen. I need some help with a refund or a replacement.
                  <br />
                  Here is the order number FD07062010
                  <br /><br />
                  Thanks,<br />
                  Shuvro
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="ticket-replay">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                <button className="ttm-button"><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Replay</button>
                <button className="ttm-button"><i className="fa fa-sticky-note" aria-hidden="true" style={{marginRight: '5px'}} />Add Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="filter-section">
            <div className="filter-text">
              <h2>Open<i className="fa fa-circle" aria-hidden="true" style={{color: 'rgb(0, 194, 0)', marginLeft: '5px', fontSize: '16px'}} /></h2>
              <h3>by Mon, Jun 12, 2023 4:00 PM</h3>
            </div>
            <div className="dropdown filter-dropdown">
              <button style={{width: '100%', textAlign: 'left'}} className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Issue
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">General Query</a></li>
                <li><a className="dropdown-item" href="#">On hold- Artwork issue</a></li>
                <li><a className="dropdown-item" href="#">On hold- Billing Issue</a></li>
                <li><a className="dropdown-item" href="#">On hold - Out of stock</a></li>
                <li><a className="dropdown-item" href="#">Returned</a></li>
                <li><a className="dropdown-item" href="#">Cancellation</a></li>
              </ul>
            </div>
            <div className="dropdown filter-dropdown">
              <button style={{width: '100%', textAlign: 'left'}} className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Agents
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Me</a></li>
                <li><a className="dropdown-item" href="#">Shuvro Haque</a></li>
                <li><a className="dropdown-item" href="#">Tashfin Rahaman</a></li>
                <li><a className="dropdown-item" href="#">Abir Ali Khan</a></li>
                <li><a className="dropdown-item" href="#">Fariha Hasan</a></li>
              </ul>
            </div>
            <div className="dropdown filter-dropdown">
              <button style={{width: '100%', textAlign: 'left'}} className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Status
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Pending</a></li>
                <li><a className="dropdown-item" href="#">Open</a></li>
                <li><a className="dropdown-item" href="#">Close</a></li>
              </ul>
            </div>
            <div className="dropdown filter-dropdown">
              <button style={{width: '100%', textAlign: 'left'}} className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Priority
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Low</a></li>
                <li><a className="dropdown-item" href="#">Medium</a></li>
                <li><a className="dropdown-item" href="#">Hign</a></li>
              </ul>
            </div>
            <div className="filter-update-button">
              <button>Update</button>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="profile-section">
            <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
            <h2 style={{display: 'inline-block'}}>Md. Raihan Ahamad Rabbi</h2>
            <h3>by Mon, Jun 12, 2023 4:00 PM</h3><br />
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree" style={{margin: 0, width: '100%'}}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Merchent Information
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p style={{marginBottom: 0}}>Email: <br /><span style={{fontWeight: 'normal'}}>raihanibnsiraj.pencil@gmail.com</span></p><br />
                  <p>Phone: <br /><span style={{fontWeight: 'normal'}}>01688700662</span></p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour" style={{margin: 0, width: '100%'}}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Time Logs
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p style={{marginBottom: 0}}>Md. Raihan Ahamad Rabbi: <br /><span style={{fontWeight: 'normal'}}>2 days ago (Fri, 9 Jun 2023 at 3:46 AM)</span></p><br />
                  <p style={{marginBottom: 0}}>Shuvro Haque: <br /><span style={{fontWeight: 'normal'}}>a few seconds ago (Sun, 11 Jun 2023 at 11:40 AM)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Ticket;



