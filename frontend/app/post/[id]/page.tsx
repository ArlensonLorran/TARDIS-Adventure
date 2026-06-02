export default function PostPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <h1>Post {params.id}</h1>
    </main>
  );
}