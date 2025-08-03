const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>My surah page: {id}</div>;
};
export default Page;
