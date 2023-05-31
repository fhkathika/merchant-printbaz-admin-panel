import React from 'react';

const AllMerchants = () => {
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n        .all-client {\n            margin: 50px;\n            padding: 20px;\n        }\n\n        h2,\n        h4 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .col-3,\n        .col-12 {\n            padding: 0 15px;\n            width: 100%;\n        }\n\n        .col-3 {\n            flex: 0 0 25%;\n            max-width: 25%;\n        }\n\n        .client-filter,\n        .client-list-title,\n        .client-list {\n            background: #fff;\n            margin-bottom: 2px;\n            padding: 15px;\n            border-radius: 5px;\n        }\n\n        .client-list {\n            cursor: pointer;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n            color: #000;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff !important;\n            font-weight: bold;\n        }\n\n        .form-control {\n            display: block;\n            width: 100%;\n            padding: 5px;\n            margin-bottom: 10px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n            font-size: 14px;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n            .col-3 {\n                flex: 0 0 50%;\n                max-width: 50%;\n            }\n        }\n\n        @media screen and (max-width: 768px) {\n            .col-3 {\n                flex: 0 0 100%;\n                max-width: 100%;\n            }\n\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .all-client {\n                margin: 10px;\n            }\n\n        }\n\n    " }} />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="dashboard.html">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="dashboard.html">Dashboard</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Merchants
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item nav-dropdown-item" href="client-list.html">All Merchants</a></li>
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
                    <li><a className="dropdown-item nav-dropdown-item" href="order-list.html">All Order</a></li>
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
                  <a className="nav-link active" aria-current="page" href="mail-box.html">Mail Box</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="live-chat.html">Live Chat</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="ticket.html">Ticket</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="file-manager.html">File Manager</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="all-client">
          <div className="row">
            <div className="col-12">
              <h2>All Merchants</h2>
            </div>
          </div>
          <div className="row client-filter">
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="id-filter">Id:</label>
              <input type="number" id="id-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="name-filter">Name:</label>
              <input type="text" id="name-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="brand-filter">Brand Name:</label>
              <input type="text" id="brand-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="email-filter">Email:</label>
              <input type="email" id="email-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="date-filter">Date:</label>
              <input type="date" id="date-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="status-filter">Status:</label>
              <select id="status-filter" className="form-control">
                <option value>All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Approved">Ban</option>
              </select>
            </div>
          </div>
          <div className="row client-list-title">
            <div className="col-lg-2 col-sm-12">
              <h4>ID</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Name</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Brand Name</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Email</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Date</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Status</h4>
            </div>
          </div>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>1958647802</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Abir Ali Khan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Artistic ABIR</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>printbaz.abir@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-03-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>5456821455</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Fariha Hasan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Art of Fariha</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>fariha.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>21-04-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>3569874159</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Shuvro Haque</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Printbaz</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>shuvro.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>10-01-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>0213589874</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Tashfin Rahaman</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Rebecca Traders</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>tashfin.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-02-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>1958647802</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Abir Ali Khan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Artistic ABIR</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>printbaz.abir@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-03-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>5456821455</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Fariha Hasan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Art of Fariha</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>fariha.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>21-04-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>3569874159</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Shuvro Haque</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Printbaz</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>shuvro.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>10-01-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>0213589874</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Tashfin Rahaman</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Rebecca Traders</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>tashfin.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-02-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>1958647802</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Abir Ali Khan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Artistic ABIR</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>printbaz.abir@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-03-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>5456821455</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Fariha Hasan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Art of Fariha</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>fariha.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>21-04-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>3569874159</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Shuvro Haque</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Printbaz</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>shuvro.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>10-01-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>0213589874</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Tashfin Rahaman</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Rebecca Traders</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>tashfin.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-02-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>1958647802</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Abir Ali Khan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Artistic ABIR</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>printbaz.abir@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-03-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>5456821455</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Fariha Hasan</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Art of Fariha</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>fariha.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>21-04-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>3569874159</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Shuvro Haque</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Printbaz</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>shuvro.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>10-01-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
          <a href="view-client.html">
            <div className="row client-list">
              <div className="col-lg-2 col-sm-12">
                <p>0213589874</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Tashfin Rahaman</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>Rebecca Traders</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>tashfin.printbaz@gmail.com</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p>01-02-2023</p>
              </div>
              <div className="col-lg-2 col-sm-12">
                <p className="status-btn">Approved</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
};

export default AllMerchants;

