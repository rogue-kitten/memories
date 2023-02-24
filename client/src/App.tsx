import Form from './components/form/Form';
import Posts from './components/posts/posts';

function App() {
    return (
        <div className="w-screen h-screen bg-slate-100">
            <div className="container mx-auto flex justify-between items-start px-10 space-x-12 ">
                <Posts />
                <Form />
            </div>
        </div>
    );
}

export default App;
