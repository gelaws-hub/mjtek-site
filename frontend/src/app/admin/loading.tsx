import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import DashboardSkeleton from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <DefaultLayout>
      <DashboardSkeleton />
    </DefaultLayout>
  );
}
