"use client";
import { useRouter } from "next/navigation";

const LoadingScreen = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center font-roboto"
      style={{
        background: "linear-gradient(45deg, #22b455, #1dd1a1)",
      }}
    >
      <div
        className="w-[700px] h-[500px] rounded-xl bg-gray-200 text-center px-8 py-12 mx-4"
        style={{
          boxShadow: "16px 16px 40px #bebebe, -16px -16px 40px #fff",
        }}
      >
        <h1
          className="text-[16rem] font-black leading-none mb-3.5 animate-pulse"
          style={{
            background: "linear-gradient(45deg, #22b455, #1dd1a1, #0fb366)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(34, 180, 85, 0.3)",
          }}
        >
          404
        </h1>

        <h2 className="text-green-900 text-3xl font-bold mb-3.5 tracking-wide">
          Oops, Page Not Found
        </h2>

        <p className="text-green-800 font-medium text-lg mx-4 mb-6 leading-relaxed">
          Page that you&rsquo;re looking for isn&rsquo;t found
        </p>

        <button
          onClick={handleGoBack}
          className="px-8 py-3 rounded-xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #22b455, #1dd1a1, #22b455)",
            backgroundSize: "200%",
            boxShadow: "0 4px 15px rgba(34, 180, 85, 0.3)",
          }}
        >
          🏠 Go Back Home
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
