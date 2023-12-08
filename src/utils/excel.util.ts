import { api } from "@/api";

export const downloadExcel = async (url: string, fileName?: string) => {
  return api
    .get(url, {
      headers: { "Content-Type": "blob" },
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName ?? Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};
