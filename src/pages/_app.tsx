import "ag-grid-community/styles/ag-grid.css";
import * as agGrid from "ag-grid-enterprise";

import "@/styles/ag-theme-serp.css";
import { cn } from "@/utils";
import { Box } from "@parte-ds/ui";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";

agGrid.LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY ?? "");

type Data = {
  shopCd: string;
  shopNm: string;
  tit: string;
};
export default function App() {
  const [data, setData] = useState<Data[]>();

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          shopCd: "FIIGT",
          shopNm: "Shop OC52G",
          tit: "NASZOQL6T9POOCEID4AKBB2DTJK26TV7VS0S3IVI80",
        },
        {
          shopCd: "OZI77",
          shopNm: "Shop R64FX",
          tit: "V4HR7SNUXXCDIU6BDBUEEEKZTYI7XKAOH0U",
        },
        {
          shopCd: "K820I",
          shopNm: "Shop TA51O",
          tit: "0IZWNJERM4DZIO7RYJBZRCV6AI8UMZ3QWA31U",
        },
        {
          shopCd: "ZU4M8",
          shopNm: "Shop STT5G",
          tit: "DJ5EXI9VJ68GCFB081EIATEPVJD93CD8VPFH",
        },
        {
          shopCd: "K97H0",
          shopNm: "Shop DHAPM",
          tit: "C302LMP1THTUFA1N07A",
        },
        {
          shopCd: "V45ZV",
          shopNm: "Shop PWYWA",
          tit: "FVQOEYUMC7OR0EZ11H426QBVZ99D4P9J0V5Y3JJX1TWOX41S",
        },
        {
          shopCd: "1LQAI",
          shopNm: "Shop 6KIRC",
          tit: "W7J2FP35JCL44JIJ1ZU2RYBU4Q5LK58N0VQLV0GVU",
        },
        {
          shopCd: "PJB5P",
          shopNm: "Shop MGGL3",
          tit: "1MZ5",
        },
        {
          shopCd: "C4SM0",
          shopNm: "Shop Q07XL",
          tit: "E71GM0K4H9NBE9CN4H0M9ISVPY3G1PYRS85GJ5OC92POBOD",
        },
        {
          shopCd: "70PRY",
          shopNm: "Shop N6V91",
          tit: "6UNH8E184P",
        },
        {
          shopCd: "PBHBQ",
          shopNm: "Shop ZZBCD",
          tit: "J3ZJ81PRGEQHUHXXQ8K73FP36LCHYY1GC47YJR9Y2M8DPUJ8",
        },
        {
          shopCd: "KMGYJ",
          shopNm: "Shop ZK2DO",
          tit: "1W0AIAR8XPVUKNIBE1Q3B24RZKFHUX4ORGTDDI0UE",
        },
        {
          shopCd: "SHAA7",
          shopNm: "Shop 3O9UX",
          tit: "TQYMUKMFS4W5GBE6F3NCEZJM0ZEEJII041ZGWDPGTVKWO",
        },
        {
          shopCd: "Z6YD2",
          shopNm: "Shop 1VB1K",
          tit: "YXNEQ99UJJM2O1BGWC7ZWE3VNJ82RVHYQLHR9F2VEU",
        },
        {
          shopCd: "UJJD9",
          shopNm: "Shop 8T2XS",
          tit: "W8CY5I3VN4ECXB6DCYBJZUNM8RLGR9MVSFL4ZLIDBOQ3U",
        },
        {
          shopCd: "PW9TH",
          shopNm: "Shop O46Q3",
          tit: "BT56MTF78R3L",
        },
        {
          shopCd: "9CRBA",
          shopNm: "Shop BH3Q4",
          tit: "7HZEKB7TLOH",
        },
        {
          shopCd: "YJTEK",
          shopNm: "Shop GGAJQ",
          tit: "MXMVAJXFHVPIGBSCV0887L74RUL98C96G04CI",
        },
        {
          shopCd: "EFOEK",
          shopNm: "Shop HEW2U",
          tit: "4MLAQZVFSGUK7E79CDBZ10OFEIWU07GDGK1KVTA1L1",
        },
        {
          shopCd: "6CTMM",
          shopNm: "Shop R4DEM",
          tit: "DAH2OUL",
        },
        {
          shopCd: "EV4CH",
          shopNm: "Shop PZNMK",
          tit: "VRHNTMIIQ",
        },
        {
          shopCd: "ON174",
          shopNm: "Shop 8N4Z5",
          tit: "JSXO7S7JZFGL42CBWOL6",
        },
        {
          shopCd: "07YZM",
          shopNm: "Shop WCX0A",
          tit: "97PU3WAYHAE",
        },
        {
          shopCd: "LX56I",
          shopNm: "Shop 5UV52",
          tit: "OLQ7FZ4J8S58CKJNA4HDGAJ3EUV",
        },
        {
          shopCd: "IPUL4",
          shopNm: "Shop F59K4",
          tit: "TSKAPGMS2B4VXCIH3QIAUIQTOH9ZPAT7E1VQ0FVOHT28",
        },
        {
          shopCd: "UACRR",
          shopNm: "Shop OQXJH",
          tit: "7FZE9UJQ0XRCZ1HAMJERBCW03LEWC57K",
        },
        {
          shopCd: "6J3Q5",
          shopNm: "Shop 2LDIG",
          tit: "P2TEQQEM1XNMDRTNWGM2HSD",
        },
        {
          shopCd: "2FDCK",
          shopNm: "Shop 73NAN",
          tit: "CYQOC70EY889NKDYJQ",
        },
        {
          shopCd: "QONW2",
          shopNm: "Shop ETCR9",
          tit: "RWZ5YKTMXOSN7WMXP0V6DAWA2IWDS",
        },
        {
          shopCd: "SCW7D",
          shopNm: "Shop 9VB3D",
          tit: "NL6CRDBAVMHKOMF1SZ4T4JRAR06F0E6",
        },
        {
          shopCd: "E45NK",
          shopNm: "Shop MXPLU",
          tit: "JT1PKNT2WL3X5V64WJHZ5LSKBGTJHZ7",
        },
        {
          shopCd: "S6AVM",
          shopNm: "Shop CH4LM",
          tit: "H37QETLIZPY0MV77N0YNM68OWZGOL978EDYLSLLFJ",
        },
        {
          shopCd: "TQJCU",
          shopNm: "Shop 4EG0P",
          tit: "QJLQTUM5601X8CYZFTGEPSUN37WHVH0J9WL35W0TBHXTQTUV",
        },
        {
          shopCd: "H9CHZ",
          shopNm: "Shop ILTPF",
          tit: "M2QSM03Z89G4AF9ONNY44LJKAIJKIWAK",
        },
        {
          shopCd: "EPDQC",
          shopNm: "Shop EMIFW",
          tit: "OG076EFPI",
        },
        {
          shopCd: "VOQ6B",
          shopNm: "Shop Y8D7W",
          tit: "M7VVA4THUWZZP",
        },
        {
          shopCd: "H6ZBS",
          shopNm: "Shop T659H",
          tit: "J1T1MB2QR8I1XXPBLJ9LOWHR3769XN9",
        },
        {
          shopCd: "UFO1V",
          shopNm: "Shop XZ9KT",
          tit: "KY2ZU6AJA",
        },
        {
          shopCd: "6HPI1",
          shopNm: "Shop BT7TG",
          tit: "JIPHCVMME26L34RUOGDGG4Z6KJMJP6N0PW",
        },
        {
          shopCd: "N40HC",
          shopNm: "Shop 1EL0T",
          tit: "0FDRMT0Y2202XMGJHSPH5181X39UNJ2EMFLWPE8S3UBI7YSK",
        },
        {
          shopCd: "EOKXY",
          shopNm: "Shop 5T1H6",
          tit: "2PJRJAPA5GT07IUDY22JM7B",
        },
        {
          shopCd: "CF1SS",
          shopNm: "Shop 3ZQOZ",
          tit: "5COJE8A39M0T3Z7VW",
        },
        {
          shopCd: "CJHIW",
          shopNm: "Shop O4A2F",
          tit: "VF1SWP",
        },
        {
          shopCd: "LLD0Q",
          shopNm: "Shop IJMBV",
          tit: "KC50UARGL",
        },
        {
          shopCd: "78VU4",
          shopNm: "Shop KI4D0",
          tit: "BOK0S5OSCE959DWRYWL8J4B6PEVZW",
        },
        {
          shopCd: "3QQ9M",
          shopNm: "Shop ZFJC1",
          tit: "Y7",
        },
        {
          shopCd: "GF9GP",
          shopNm: "Shop 0RW9R",
          tit: "V4S9Z",
        },
        {
          shopCd: "6ZJPA",
          shopNm: "Shop 0GGSX",
          tit: "B24AHVJBOY45IC2FUSJZ4AFPLERV58XCSMB695FCW0",
        },
        {
          shopCd: "HZ32O",
          shopNm: "Shop 69PS1",
          tit: "FY8JADQHOJHI5BJ0",
        },
        {
          shopCd: "PN9PZ",
          shopNm: "Shop AA1RR",
          tit: "LTJLIEA5HALX9KSK",
        },
      ]);
    }, 1500);
  }, []);

  const columnDefs = useMemo<agGrid.ColDef<Data>[]>(
    () => [
      {
        headerName: "매장코드",
        field: "shopCd",
        width: 120,
      },
      {
        headerName: "매장명",
        field: "shopNm",
        width: 160,
      },
      {
        headerName: "일정 타이틀",
        field: "tit",
        width: 240,
      },
      {
        headerName: "BLANK",
        flex: 1,
      },
    ],
    []
  );
  return (
    <Box width="100vw" height="100vh" backgroundColor="green">
      <AgGridReact className={cn(`ag-theme-serp`)} rowData={data} columnDefs={columnDefs} autoSizeStrategy={{ type: "fitCellContents" }} />
    </Box>
  );
}
