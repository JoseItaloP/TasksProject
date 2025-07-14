
import TaskModal from "@/app/User/(.)Task/[id]/taskModal";

export default async function Page({ params }: {  params: Promise<{ id: number }>; }) {
  const IDparams = (await params).id
  return <TaskModal params={Number(IDparams)} />;
}
