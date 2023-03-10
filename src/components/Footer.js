import Clock from "../images/clock.png"

function Footer() {
    return ( 
        <>
        <hr className="footer-sep"/>
        <div className="Footer">
            <div className="Location">
                <p>Storkower Strasse 132 <br />
                Berlin</p>
            </div>

            <div className="clock-image">
                <img src={Clock} alt="clock" />
            </div>

            <div className="opening">
                <table>

                    <tr>
                        <td>Monday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>09:00 - 16:00</td>
                    </tr>
                    
                </table>
            </div>

        </div>
        </>
     );
}

export default Footer;