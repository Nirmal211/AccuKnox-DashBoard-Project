import Header from "./Header";
const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full h-[92vh] flex justify-center items-center ">
        <h1 className="homeTitle text-8xl text-transparent">
          AccuKnox Dashboard project
        </h1>
      </div>
    </>
  );
};

export default Home;
