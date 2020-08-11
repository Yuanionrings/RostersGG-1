import React from 'react';

function Footer(){
    return (
        <div className="footer">
            {/*<div className="footer-main primary-bg-light">
                <h2>Test</h2>
            </div>*/}
            <div className="footer-bottom primary-bg-dark">
                <p className="secondary-text-light">
                    <a href='https://www.rosters.gg/legal/terms-and-conditions'>Terms and Conditions</a>
                    <a href='https://www.rosters.gg/legal/privacy-policy'>Privacy Policy</a>
                    <a href='https://www.rosters.gg/'>Cookies</a>
                     © 2020 Rosters.gg
                </p>
            </div>
        </div>
    );
}

export default Footer;