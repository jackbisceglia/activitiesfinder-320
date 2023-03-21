import { createRouter } from "@swan-io/chicane";

export const Router = createRouter({
  Home: "/",
  Login: "/login",
});

// App Entry Point
function Route() {
  const route = Router.useRoute(["Home", "Login"]);

  return (
    <div className="mx-auto text-center">
      {/* NAVBAR */}
      <nav className="mb-4 font-bold text-rose-400 w-full h-14 bg-neutral-800 px-28">
        <div className="max-w-screen-lg mx-auto h-full items-center w-full flex flex-start">
          <a href="/">Activities Finder</a>
        </div>
      </nav>
      {/*  */}
      <main className="max-w-screen-lg mx-auto w-full"></main>
    </div>
  );
}

export default Route;
