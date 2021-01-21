import './App.css';
import NBAData from './components/NBAData';

function App() {
    return (
        // <div className="container p-2">
        //     <div className="row">
        //         <div className="col">
        //             <Table headers={Object.keys(schema)} rows={db} />
        //         </div>
        //     </div>
        // </div>

        <div>
            <NBAData></NBAData>
        </div>
    );
}

export default App;
