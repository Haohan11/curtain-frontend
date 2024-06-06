// import html2canvas from "@shilim-developer/html2canvas";
import * as htmlToImage from 'html-to-image';

const _exportImage = async () => {
  const target = document.getElementById("export_target");
  const dataUrl = await htmlToImage.toSvg(target);

  // const dataUrl = canvas.toDataURL("image/jpg");
  const canvas = document.createElement( "canvas" ); 
  let ctx = canvas.getContext( "2d" );
  let img = new Image();

  img.src = dataUrl

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage( img, 0, 0 );
    
    // let a = document.createElement("a");
    // a.download = "QRcode.png";
    // a.href = canvas.toDataURL( "image/png" );
    // a.click();
    const link = document.createElement("a");
    link.href = canvas.toDataURL( "image/jpeg" );
    link.download = "curtain.jpg";
    link.click();
    link.remove();
  }

};

const exportImage = async () => {
  const target = document.getElementById("export_target");
  const dataUrl = await htmlToImage.toSvg(target, {
    width: window.width,
    height: window.height
  });

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "curtain.svg";
  link.click();
  link.remove();
};

export default exportImage;
