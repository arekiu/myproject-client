import logoImage from "../images/logo1.png"

function HomePage() {
    return (
      <div>
        {/* <h1>Home</h1> */}
        <img className="img-logo" src={logoImage} alt="logo"/>
      </div>
    );
  }

  export default HomePage;