import Loading from "@/components/common/Loading";
import Layout from "@/containers/common/BaseLayout/Layout";
import { Box } from "@parte-ds/ui";
import { GetServerSideProps } from "next";
import { useTheme } from "styled-components";
import { logger } from "../../logger";

export default function Home() {
  const { colors } = useTheme();

  return (
    <Layout>
      <Layout.Query>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="60px" backgroundColor={colors.G300} color={colors.N0}>
          조회 영역
        </Box>
      </Layout.Query>
      <Layout.FullHeight autoPadding paddingTop={16} paddingBottom={24} display="flex" flexDirection="column" gap={8}>
        <Loading columnCnt={4} />
      </Layout.FullHeight>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  logger.log("info", "Hello simple log!");
  logger.info("Hello log with metas", { color: "blue" });

  return {
    props: {},
  };
};
