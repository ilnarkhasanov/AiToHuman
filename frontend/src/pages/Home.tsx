import TextProcessor from "../components/TextProcessor";

function Home() {
  return (
    <div id="page-background" className="bg-gray-100">
      <main className="w-full max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl sm:text-4xl text-gray-800 pt-6 pb-2 font-lato font-extrabold">
          Detect and Humanize AI Text
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8 font-lato">
          Paste your text below to analyze for AI-generated content and
          transform it to a human-like style.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-5 ">
          {/* TODO: status should be dynamic */}
          <TextProcessor status="idle" />
        </div>
      </main>
    </div>
  );
}

export default Home;
