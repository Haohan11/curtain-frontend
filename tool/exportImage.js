import html2canvas from "html2canvas";

const exportImage = async () => {
  const target = document.getElementById("export_target")
  const canvas = await html2canvas(target, {
    allowTaint: true,
    useCORS: true
  });

  const dataUrl = canvas.toDataURL("image/jpg");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "stock.jpg";
  link.click();
  link.remove();
};

export default exportImage;
