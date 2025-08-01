
import TaskModal from "@/app/User/(.)Task/[id]/taskModal";

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
  const IDparams = (await params).id

  return <TaskModal params={IDparams} />;
}
