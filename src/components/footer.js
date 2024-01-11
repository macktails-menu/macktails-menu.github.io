import React, {useEffect} from "react";

const Footer = (props) => {
    var social_media = props.socialmedia;

    const renderFooter = () => {
        var html = '';
        social_media.forEach((social) => {
            Object.keys(social).forEach(function(e){
                html += '<div class="col s4 m4 l4 xl4 hide-on-med-and-up" style="padding: 5px; padding-bottom: 20px;">';
                    html += '<a href="' + social[e].url + '" class="fs16 social-mobile" target="_blank">';
                        html += '<span class="lni ' + social[e].logo +' fs24 social-mobile" aria-hidden="true"></span>';
                        html += social[e].name; 
                    html += '</a>';
                html += '</div>';

                html += '<a href="' + social[e].url + '" class="fs16 hide-on-small-only social-up" target="_blank">';
                    html += '<span class="lni ' + social[e].logo +' fs24 social-up" aria-hidden="true"></span>';
                    html += social[e].name; 
                html += '</a>';
            });
        });

        return <div className="row" dangerouslySetInnerHTML={{__html: html}}></div>;
    }

    const gotoTop = (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const getScrollPosition = (el = window) => ({
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
      });

    useEffect(() => {
        var goToTopBtn = document.getElementById('gotoTop');
        window.addEventListener("scroll", (event) => {
            var windowPosition = getScrollPosition();
            if(windowPosition.y > 100) {
                goToTopBtn.style.display = 'block';
            } else {
                goToTopBtn.style.display = 'none';
            }
        });
    });

    return (
        <>
            <a href="test" className="waves-effect waves-light orange darken-3 btn-small btn-goto-top " id="gotoTop" onClick={(e) => gotoTop(e)}>
                <span className="fa fa-arrow-up fs18"></span> Back to Top
            </a>
            <footer className="page-footer blue-grey darken-3">
                <div className="footer-copyright blue-grey darken-3">
                    <div className="container" style={{padding: '0px 20px', width: '100%'}}>
                        <div className="social-media-container">
                            {
                                renderFooter(social_media)
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;