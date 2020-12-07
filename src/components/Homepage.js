import home1 from '../statics/piano02.png'; 
import React from 'react';

const Homepage = () => {
    return (
        <div className="homepage">
            <section className="numberOne">
                
                <div className="left">
                    <h1>Easy Keys</h1>
                    <p>
                        We have realized how important it is to have an Easy and creative way to expand our experiences.
                    </p>
                </div>
                
                <div className="right">  
                
                <img alt="piano" src={home1}></img>
                
                </div>
                
            </section>
            
            <section className="numberTwo">
            <div className="rigth">
                </div>
                <button>Get the free version</button>

                <div className="left">
                    <h1>Let's try it out!</h1>
                    <p>
                       EasyKeys is a Web browser Keyboard more powerful than you could ever have imagined. 
                    </p>
                </div>
            
                
            </section>
        </div>
    );
};

export default Homepage;
