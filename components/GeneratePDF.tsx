import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
type props = {
  html?: React.MutableRefObject<HTMLDivElement>;
  className: string;
};
const GeneratePDF: React.FC<props> = ({ html, className }) => {
  const generateImage = async () => {
    const image = await toPng(html!.current, { quality: 0.95 });
    const doc = new jsPDF();

    doc.addImage(image, "JPEG", 5, 22, 200, 50);
    doc.save();
  };
  return (
    <button onClick={generateImage} className={className}>
      Get PDF!
    </button>
  );
};

export default GeneratePDF;
