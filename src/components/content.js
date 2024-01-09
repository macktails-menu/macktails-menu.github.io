import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Footer from "./footer";

const Content = () => {
  const [initialFetch, setInitialFetch] = useState(true);
  const [dataMenu, setDataMenu] = useState("");
  var [menuDOM, setMenuDom] = useState("");
  const [activePage, setActivePage] = useState("classic");
  const [classicMenu, setClassicMenu] = useState([]);
  const [wellnessBlendMenu, setWellnessBlendMenu] = useState([]);
  const [limitedCraftMenu, setLimitedCraftMenu] = useState([]);
  const [teaCraftMenu, setTeaCraftMenu] = useState([]);
  const [coffeeCraftMenu, setCoffeeCraftMenu] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);

  const materializeNavInit = () => {
    var navBarElem = document.querySelectorAll(".sidenav");
    var navbar = M.Sidenav.init(navBarElem, {});
    var tabElem = document.querySelectorAll(".tabs");
    var tabs = M.Tabs.init(tabElem, {
      onShow: function (e) {
        window.history.pushState(null, null, "#" + e.getAttribute("datatype"));
      },
    });
  };

  const fetchMenuListing = (is_initial) => {
    if (is_initial === true) {
      fetch(
        "https://raw.githubusercontent.com/mactails-menu/menu-listing/master/menu.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setDataMenu(data);
          setClassicMenu(data.menu.signature_classic);
          setWellnessBlendMenu(data.menu.wellness_blend);
          setLimitedCraftMenu(data.menu.limited_craft);
          setTeaCraftMenu(data.menu.tea_craft);
          setCoffeeCraftMenu(data.menu.coffee_craft);
          setSocialMedia(data.social_media);
        });
      setInitialFetch(false);
    }
  };

  useEffect(() => {
    setActivePage(window.location.hash.replace("#", ""));

    if (document.readyState !== "loading") {
      materializeNavInit();
      fetchMenuListing(initialFetch);
    } else {
      document.addEventListener("DOMContentLoaded", materializeNavInit);
      document.addEventListener(
        "DOMContentLoaded",
        fetchMenuListing(initialFetch)
      );
    }

    setTimeout(function () {
      document.getElementById("root").style.display = "block";
      document.getElementById("loader").style.display = "none";
      document.getElementById("loader-msg").style.display = "none";
      var tabInstance = M.Tabs.getInstance(document.querySelector(".tabs"));
      tabInstance.updateTabIndicator();
    }, 1500);
  });

  const renderContent = (menu) => {
    var html = "";
    if (typeof menu != "undefined") {
      menu.forEach(function (e) {
        html += '<div class="col s12 m6 l4">';
        html += '<div class="card the-card">';
        html +=
          '<div class="card-image" style="background-image: url(' +
          e.image +
          ');">';
        html +=
          '<span class="card-title orange-text darken-3">' + e.name + "</span>";
        html += "</div>";
        html += '<div class="card-content fs18 black white-text">';
        html += "<p>" + e.description + "</p>";
        html += "</div>";
        html += '<div class="card-price fs20">';
        html += "<p>" + e.price + "</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
      });
    } else {
      html += '<p class="white-text">No item yet.</p>';
    }
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
  };

  return (
    <>
      <nav className="nav-extended black" style={{ marginBottom: "10px" }}>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo header-logo orange-text darken-3">
            Macktails
          </a>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <a
                id="classic"
                className={activePage === "classic" ? "active" : ""}
                href="#classic_content"
              >
                Signature Classic
              </a>
            </li>
            <li className="tab">
              <a
                id="wellness_blend"
                className={activePage === "wellness_blend" ? "active" : ""}
                href="#wellness_blend_content"
              >
                Wellness Blend
              </a>
            </li>
            <li className="tab">
              <a
                id="limited_craft"
                className={activePage === "limited_craft" ? "active" : ""}
                href="#limited_craft_content"
              >
                Limited Craft
              </a>
            </li>
            <li className="tab">
              <a
                id="tea_craft"
                className={activePage === "tea_craft" ? "active" : ""}
                href="#tea_craft_content"
              >
                Tea Craft
              </a>
            </li>
            <li className="tab">
              <a
                id="coffee_craft"
                className={activePage === "coffee_craft" ? "active" : ""}
                href="#coffee_craft_content"
              >
                Coffee Craft
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        id="classic_content"
        datatype="classic"
        className="col s12"
        style={{ padding: "0px 10px" }}
      >
        <div className="row" style={{ marginBottom: "0px !important" }}>
          {renderContent(classicMenu)}
        </div>
      </div>
      <div
        id="wellness_blend_content"
        datatype="wellness_blend"
        className="col s12"
        style={{ padding: "0px 10px" }}
      >
        <div className="row" style={{ marginBottom: "0px !important" }}>
          {renderContent(wellnessBlendMenu)}
        </div>
      </div>
      <div
        id="limited_craft_content"
        datatype="limited_craft"
        className="col s12"
        style={{ padding: "0px 10px" }}
      >
        <div className="row" style={{ marginBottom: "0px !important" }}>
          {renderContent(limitedCraftMenu)}
        </div>
      </div>
      <div
        id="tea_craft_content"
        datatype="tea_craft"
        className="col s12"
        style={{ padding: "0px 10px" }}
      >
        <div className="row" style={{ marginBottom: "0px !important" }}>
          {renderContent(teaCraftMenu)}
        </div>
      </div>
      <div
        id="coffee_craft_content"
        datatype="coffee_craft"
        className="col s12"
        style={{ padding: "0px 10px" }}
      >
        <div className="row" style={{ marginBottom: "0px !important" }}>
          {renderContent(coffeeCraftMenu)}
        </div>
      </div>
      <Footer socialmedia={socialMedia} />
    </>
  );
};

export default Content;
