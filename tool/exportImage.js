// import html2canvas from "@shilim-developer/html2canvas";
import * as htmlToImage from "html-to-image";

const _exportImage = async () => {
  const target = document.getElementById("export_target");
  if (!target) {
    console.error("Element with id 'export_target' not found");
    return;
  }

  try {
    const svgUrl = await htmlToImage.toSvg(target, {
      width: window.width,
      height: window.height,
    });

    console.log("Data URL:", svgUrl);

    const img = document.createElement("img");
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", window.width);
      canvas.setAttribute("height", window.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, window.width, window.height);

      const dataUrl = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "curtain.jpg";
      link.click();
      link.remove();
    };

    img.src = svgUrl;
  } catch (error) {
    console.error("Error occurred while exporting image:", error);
  }
};

const exportImage = async () => {
  const target = document.getElementById("export_target");
  if (!target) {
    console.error("Element with id 'export_target' not found");
    return;
  }

  try {
    const dataUrl = await htmlToImage.toSvg(target, {
      width: target.clientWidth,
      height: target.clientHeight,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "curtain.svg";
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error occurred while exporting image:", error);
  }
};

export default exportImage;
