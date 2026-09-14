import WorkspaceView from "@/components/workspace/WorkspaceView";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <WorkspaceView projectId={projectId} />;
}
