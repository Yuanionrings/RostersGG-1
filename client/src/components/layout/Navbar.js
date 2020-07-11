import React,{Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar bg-light justify-content-center">
                    <Link className="navbar-brand text-dark font-weight-bold" to="/">RostersGG</Link>
                </nav>
            </div>
        ) 
    }
}

export default Navbar;