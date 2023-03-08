import Hairdressers from "../images/us.png"


function AboutUsPage() {
    return ( 
<div className="aboutus">
    <div className="aboutus-text">

        <p>
            We are Maria and Fernando, two siblings who share a passion for <span>hairdressing</span> and <span>steampunk</span> aesthetic. Our love for this style is reflected in our shop's decor, which is inspired by Victorian era machinery and industrial design.
        <br/><br />
        We believe that every customer deserves the best service possible, which is why we take the time to understand your unique haircare needs and provide personalized recommendations. Our services range from classic haircuts to the latest trends, and we use only the highest quality products to ensure your hair looks and feels its best.

        <br/><br />
        We are committed to creating a welcoming and inclusive space where everyone feels comfortable and valued. Whether you're looking for a quick trim or a complete hair transformation, we are here to help you achieve the look you desire.
        <br/><br />
        We look forward to meeting you and helping you look and feel your best.
        </p>
    </div>

    <div>
    <img src={Hairdressers} alt="hairdressers"/>  
    </div>

</div>

);
}

export default AboutUsPage;