import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="bg-conifer-900 text-white py-16 flex flex-col items-center">
    <div >
      <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4">Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
    </section>
  );
}