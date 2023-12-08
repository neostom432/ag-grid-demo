import RuntimeError from "@/components/common/Error/RuntimeError";
import { COLOR_TOKEN } from "@/constants";
import BaseLayout from "@/containers/common/BaseLayout";
import { DataTableProvider } from "@/context/dataTableContext";
import { ModalContextProvider } from "@/context/modalContext";
import { SideMenuBarProvider } from "@/context/sideMenuBarContext";
import { SideTabContextProvider } from "@/context/sideTabContext";
import { TopBarContextProvider } from "@/context/topBarContext";
import GlobalStyles from "@/styles/GlobalStyles";
import { defaultOptions, mutationCache, queryCache } from "@/utils";
import preventBodyHorizontalScroll from "@/utils/scroll.util";
import { Box, CustomTheme, ErpTheme, Spinner, ThemeProvider } from "@parte-ds/ui";
import { Hydrate, QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from "@tanstack/react-query";
import * as agGrid from "ag-grid-enterprise";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import "ag-grid-community/styles/ag-grid.css";

import "@/styles/ag-theme-serp.css";
import "@/styles/chart.css";
import "@/styles/global.css";
import "@/styles/react-select.css";
import "@/styles/react-tooltip.css";

agGrid.LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY ?? "");
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, ...pageProps: any) => ReactNode;
};

/*
    NextPageWithLayout으로 Page의 타입을 지정하면,
    getLayout 속성함수를 사용할 수 있게된다. (사용해도 되고 안해도 되고 )
  */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; // 기존 AppProps타입에 Layout을 추가한 것.

const customTheme: CustomTheme = { ...ErpTheme, colors: COLOR_TOKEN };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Create a new QueryClient instance inside of your app, and on an instance ref (or in React state).
  // This ensures that data is not shared between different users and requests,
  // while still only creating the QueryClient once per component lifecycle.
  // https://tanstack.com/query/v4/docs/react/guides/ssr#using-hydration
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions,
      })
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  // 작은 화면으로 옮겼을때 가로 스크롤이 생기면서 세로 스크롤까지 생겨버리는걸 방지함
  useEffect(() => {
    const preventYScroll = () => preventBodyHorizontalScroll(true);
    window.addEventListener("resize", preventYScroll);
    return () => {
      window.removeEventListener("resize", preventYScroll);
      preventBodyHorizontalScroll(false);
    };
  }, []);

  const router = useRouter();
  const notFoundOrInternalError = router.route === "/404" || router.route === "/500";

  const { reset } = useQueryErrorResetBoundary();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider customTheme={customTheme}>
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={RuntimeError} onReset={reset}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {notFoundOrInternalError ? (
              getLayout(<Component {...pageProps} />, pageProps)
            ) : (
              <TopBarContextProvider>
                <SideMenuBarProvider>
                  <SideTabContextProvider>
                    <ModalContextProvider>
                      <DataTableProvider>
                        {isLoading ? (
                          <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                            <Spinner size={48} />
                          </Box>
                        ) : (
                          <BaseLayout>{getLayout(<Component {...pageProps} />, pageProps)}</BaseLayout>
                        )}
                      </DataTableProvider>
                    </ModalContextProvider>
                  </SideTabContextProvider>
                </SideMenuBarProvider>
              </TopBarContextProvider>
            )}
          </Hydrate>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
