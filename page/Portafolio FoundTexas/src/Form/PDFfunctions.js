import jsPDF from 'jspdf';

export function createPDF(formData) {
    const Width = 4 * 72; // 2 inches converted to points (1 inch = 72 points)
    const fontSize = 12;

    // Define the line height (you can adjust this as needed)
    const lineHeight = fontSize * 1.2;

    // Calculate the height of the content dynamically based on the number of lines
    const Height = 13.2 * 72
    // Create a new PDF document with the custom page size
    const doc = new jsPDF({
        unit: 'pt', // Set unit to points
        format: [Width, Height], // Set custom page size
        fontSize: fontSize, // Set the font size for the entire document
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const hyphenText = "- ".repeat(pageWidth / 8);


    // Add content to the PDF document
    doc.text(`Nombre: ${formData.nombre}`, 10, 30);

    doc.text(`Fecha: ${formData.fecha.toLocaleDateString()}`, FormatToRight(doc, `Fecha: ${formData.fecha.toLocaleDateString()}`, fontSize), 50);

    doc.text(`ID: ${formData.ID}`, 10, 70);
    doc.text(`Estatura: ${formData.estatura} cm`, 10, 90);

    doc.text(`Edad: ${formData.edad} años`, 10, 110);
    doc.text(`Sexo: ${formData.sexo}`, FormatToRight(doc, `Sexo: ${formData.sexo}`, fontSize), 110);

    doc.text(hyphenText, 10, 120); //-----------------------------------------------------------------------------
    doc.text('Por encima ↑   Normal ■', 10, 130);
    doc.text('Por debajo ↓', 10, 150);
    doc.text(hyphenText, 15, 160); //-----------------------------------------------------------------------------

    valuePrint(doc, `Peso`, `${formData.peso} kg`, 170, fontSize);
    valuePrint(doc, `SMM`, `${formData.imc} kg`, 190, fontSize, `(Masa Muscular Esquelética)`);
    valuePrint(doc, `Masa Grasa`, `${formData.masaGrasa} kg`, 220, fontSize);

    doc.text(hyphenText, 10, 230); //-----------------------------------------------------------------------------

    valuePrint(doc, `Porcentaje de Grasa Corporal:`, `${formData.porcentajeGrasa} %`, 240, fontSize,
        `Rango normal:   Adulto sexo masculino 15.0~20.0
                      Adulto sexo femenino  20.0~30.0`);

    valuePrint(doc, `IMC`, `${formData.imc} kg/m2`, 280, fontSize, `(Índice de Masa Corporal)`);
    valuePrint(doc, `Proporción de Cintura a Cadera`, `${formData.cinturaCadera}`, 310, fontSize,
        `Rango normal:   Adulto sexo masculino 0.75~0.90
                      Adulto sexo femenino  0.70~0.85`);

    doc.text(hyphenText, 10, 340); //-----------------------------------------------------------------------------

    // Add the image
    const imgData = './Flex.png';
    const imageHeight = 220;

    doc.addImage(imgData, 'png', Width*(0.2), 350, imageHeight*0.8, imageHeight);

    doc.setFontSize(fontSize * 0.8);
    doc.text("●", 10, 580);
    doc.text("   La 'masa muscular segmentaria' se considera", 10, 580);
    doc.text("   'masa magra segmentaria'", 10, 590);
    doc.setFontSize(fontSize);

    doc.setFontSize(fontSize*1.2);
    doc.text('Masa muscular segmentaria (kg)', 10, 355);
    doc.setFontSize(fontSize);
    doc.text(`${formData.mmsIt}`, 40, 380);
    doc.text(`${formData.mmsDt}`, FormatToRight(doc, `${formData.mmsDt}`, fontSize) - 30, 380);
    doc.text(`${formData.mmsC}`, (Width) / 2, 330 + imageHeight / 2);

    doc.setFontSize(fontSize * 1.2);
    doc.text(`Izquierda`, 30, 330 + imageHeight / 2);
    doc.text(`Derecha`, FormatToRight(doc, `${formData.mmsDt}`, fontSize) - 60, 330 + imageHeight / 2);
    doc.setFontSize(fontSize);

    doc.text(`${formData.mmsId}`, 40, 500);
    doc.text(`${formData.mmsDd}`, FormatToRight(doc, `${formData.mmsDt}`, fontSize) - 30, 500);

    doc.text(hyphenText, 10, 600); //-----------------------------------------------------------------------------

    valuePrint(doc, `Tipo de Cuerpo`, `${formData.tipoCuerpo}`, 610, fontSize);
    valuePrint(doc, `Índice metabòlico basal`, `${formData.imb} kcal`, 630, fontSize);
    valuePrint(doc, `TBW`, `${formData.propECW} L`, 650, fontSize);
    valuePrint(doc, `EWC`, `${formData.ECW} L`, 670, fontSize);
    valuePrint(doc, `ICW`, `${formData.ICW} L`, 690, fontSize);

    doc.text(hyphenText, 10, 700); //-----------------------------------------------------------------------------

    valuePrint(doc, `Proporción de EWC`, `${formData.propECW}`, 710, fontSize);

    doc.text(hyphenText, 10, 720); //-----------------------------------------------------------------------------

    valuePrint(doc, `Peso Objetivo`, `${formData.pObj} kg`, 730, fontSize);
    valuePrint(doc, `Control de grasa`, `${formData.contGrasa} kg`, 750, fontSize);
    valuePrint(doc, `Control de músculo`, `${formData.contMusc} kg`, 770, fontSize);

    doc.text(hyphenText, 10, 780); //-----------------------------------------------------------------------------
    doc.text(`Meta Propuesta`, 10, 790);

    valuePrint(doc, `Objetivo PBF`, `${formData.objPBF} %`, 810, fontSize, `(PBF:Porcentaje de grasa corporal)`);
    valuePrint(doc, `Peso Predecido`, `${formData.pesoPred} `, 840, fontSize);
    valuePrint(doc, `Masa Grasa Predecida`, `${formData.MGP} `, 860, fontSize);
    valuePrint(doc, `Control`, `${formData.control}`, 880, fontSize);

    doc.text(hyphenText, 10, 890); //-----------------------------------------------------------------------------

    valuePrint(doc, `Impedancia`, `${formData.impedancia}`, 900, fontSize);

    doc.setFontSize(fontSize * 0.8);
    doc.text("www.accuniq.com", (Width/2) -35, 920);

    // Save the PDF with a unique name (e.g., timestamp)
    const fileName = `form_submission_${Date.now()}.pdf`;
    doc.save(fileName);

    return doc;
}

export function valuePrint(doc, text, value, yCoord, fontSize, extraText = '') {

    doc.text(text + `:`, 10, yCoord);
    doc.text(value, FormatToRight(doc, value, fontSize), yCoord);

    if (extraText != '') {
        doc.setFontSize(fontSize * 0.8);
        doc.text(extraText, 10, yCoord + 10);
        doc.setFontSize(fontSize);
    }
}

export function FormatToRight(doc, text, fontSize) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(text) * fontSize;
    const xCoordinate = pageWidth - 10 - textWidth;

    return xCoordinate;
}

export function getDefaults() {
    return (
      {
        nombre: '',
        fecha: new Date(),
        ID: '',
        estatura: 0,
        edad: 0,
        sexo: 'Femenino',
        peso: 0,
        smm: 0.0,
        masaGrasa: 0,
        porcentajeGrasa: 13.6,
        imc: 0.0,
        perCintura: 0, perCadera:0 , cinturaCadera: 0.80,
        mmsIt: 0.0, mmsId: 0.0, mmsDt: 0.0, mmsC: 0.0, mmsDd: 0.0,
        tipoCuerpo: 'Bajo Peso',
        imb: 447.6,
        TBW: 54.5,
        ECW: 22.2,
        ICW: 32.3,
        propECW: 0.407,
        pObj: '',
        contGrasa: '',
        contMusc: '',
        objPBF: '',
        pesoPred: '',
        MGP: '',
        control: '',
        impedancia: '',
      }
    );
  }