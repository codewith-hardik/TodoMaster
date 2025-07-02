import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <TodoForm />
          <TodoList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
