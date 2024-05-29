import Word from "./word/Word";
import Words from "./word/Words";
import Header from "./header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Words text = "Hello World"/>
            <Word word = "hundred"/>
        </div>
    );
}

export default App;
