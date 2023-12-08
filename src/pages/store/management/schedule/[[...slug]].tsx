import ScheduleContent from "@/containers/store/management/schedule/Content";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function Schedule() {
  return <ScheduleContent />;
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const queryClient = new QueryClient();
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
