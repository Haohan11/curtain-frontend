// import html2canvas from "@shilim-developer/html2canvas";
import * as htmlToImage from 'html-to-image';

const exportImage = async () => {
  const target = document.getElementById("export_target");
  const canvas = await htmlToImage.toPng(target, {
    allowTaint: true,
    useCORS: true,
  });

  const dataUrl = canvas
  // const dataUrl = canvas.toDataURL("image/jpg");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "stock.jpg";
  link.click();
  link.remove();
};

export default exportImage;
