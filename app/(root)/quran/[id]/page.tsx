interface pageProps {
  params: { id: string };
}
const Page = async ({ params }: pageProps) => {
  const { id } = await params;
  return (
    <div className="container">
      <h1> this is surah {id} </h1>
    </div>
  );
};
export default Page;
