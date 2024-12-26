import React, { useState } from "react";
import '../css/style.css'

const TabContent = ({ id, isActive, places }) => (
  <div id={id} className={`tab-pane fade ${isActive ? "show active" : ""} p-0`}>
    <div className="row g-4">
      {places.map((place, index) => (
        <div className="col-lg-6" key={index}>
          <div className="destination-img">
            <img
              className="img-fluid rounded w-100"
              src={place.imgSrc}
              alt={place.title}
              style={{ height: "40vh" }}
            />
            <div className="destination-overlay p-4">
              <h4 className="text-white mb-2 mt-3">{place.title}</h4>
              <a href="#" className="btn-hover text-white">
                Designed By Levis😎<i className="fa fa-arrow-right ms-2"></i>
              </a>
            </div>
            <div className="search-icon">
              <a href={place.imgSrc} data-lightbox={place.lightbox}>
                <i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TabCont = () => {
  const [activeTab, setActiveTab] = useState("tab-2");

  const tabs = [
    { id: "tab-2", label: "Musanze" },
    { id: "tab-3", label: "Huye" },
    { id: "tab-4", label: "Rubavu" },
    { id: "tab-5", label: "Kayonza" },
    { id: "tab-6", label: "Nyarugenge" },
  ];

  const tabContents = {
    "tab-2": [
      {
        imgSrc: "./img/volcanoes1.jpg",
        title: "Volcanoes National Park",
        lightbox: "destination-5",
      },
      {
        imgSrc: "img/caves.jpg",
        title: "Musanze Caves",
        lightbox: "destination-6",
      },
    ],
    "tab-3": [
      {
        imgSrc: "img/huye_n.jpg",
        title: "Huye National Museum",
        lightbox: "destination-5",
      },
      {
        imgSrc: "img/king.jpg",
        title: "King's Palace Museum",
        lightbox: "destination-6",
      },
    ],
    "tab-4": [
      {
        imgSrc: "img/rubavu-large.jpg",
        title: "Lake Kivu",
        lightbox: "destination-5",
      },
      {
        imgSrc: "img/c3.jpg",
        title: "Ibere Rya Bigogwe",
        lightbox: "destination-6",
      },
    ],
    "tab-5": [
      {
        imgSrc: "img/aka.jpg",
        title: "Akagera National Park",
        lightbox: "destination-5",
      },
    ],
    "tab-6": [
      {
        imgSrc: "img/nyamirambo.jpg",
        title: "Nyamirambo Neighborhood",
        lightbox: "destination-5",
      },
      {
        imgSrc: "img/kandt.jpg",
        title: "Kandt House Museum",
        lightbox: "destination-6",
      },
    ],
  };

  return (
    <div className="container-fluid destination py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
          <h1 className="mb-0">Our Popular Tourism Place</h1>
        </div>
        <div className="tab-class text-center">
          <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <a
                  className={`d-flex py-2 mx-3 border border-primary bg-light rounded-pill ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="text-dark" style={{ width: "150px" }}>
                    {tab.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            {Object.keys(tabContents).map((key) => (
              <TabContent
                key={key}
                id={key}
                isActive={activeTab === key}
                places={tabContents[key]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabCont;
