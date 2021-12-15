import logo from '../styles/logo.png';
import '../styles/App.css';
import MenuBar from '../components/MenuBar';
function App() {
  return (
    <div className="App">
      <MenuBar />
      <header>
        <img src={logo} alt="logo" style={{height: '100%', marginTop: '30px', marginBottom: '30px'}} />
        <h1>Welcome to EatSafeNYC!</h1>
        <p style={{margin: '40px', paddingBottom: '100px'}}>
        The COVID-19 pandemic has brought a new awareness for health and safety. As we begin to reopen
        society, it is crucial that we do so safely. We can still enjoy the fruits of life (especially when those fruits
        and foods are in the best city, New York City)! However, we, as foodies and founders, realized that it was 
        very difficult to find which restaurants had safety protocols, outdoor seating, and any general
        reaction to the new COVID-safety compliance requirement in NYC. So, we made EatSafeNYC so you and we can eat safe! :)
        </p>
      </header>
    </div>
  );
}

export default App;
