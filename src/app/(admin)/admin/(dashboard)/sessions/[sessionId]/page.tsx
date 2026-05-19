export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <div>
      <h1>출석 현황</h1>
      <p>{sessionId}</p>
    </div>
  );
}
