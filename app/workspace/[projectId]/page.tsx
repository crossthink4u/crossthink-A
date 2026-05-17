import WorkspaceView from '@/components/workspace/WorkspaceView';

export default function WorkspacePage({ params }: { params: { projectId: string } }) {
  return <WorkspaceView projectId={params.projectId} />;
}
