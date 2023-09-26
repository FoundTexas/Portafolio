import React, { useState } from 'react';
import jsPDF from 'jspdf';
import TextInput from './TextInput'; // Reusable TextInput component;
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import './Form.css'; // Import your custom CSS for styling

function Form() {
  const [formData, setFormData] = useState(getDefaults());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const Width = 4 * 72; // 2 inches converted to points (1 inch = 72 points)
    const fontSize = 12;

    // Define the line height (you can adjust this as needed)
    const lineHeight = fontSize * 1.2;

    // Calculate the height of the content dynamically based on the number of lines
    const Height = 13 * 72
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
      `Rango normal:   Adulto sexo masculino 15.0-20.0
                      Adulto sexo femenino  20.0-30.0`);

    valuePrint(doc, `IMC`, `${formData.imc} kg/m2`, 280, fontSize, `(Índice de Masa Corporal)`);
    valuePrint(doc, `Proporción de Cintura a Cadera`, `${formData.cinturaCadera}`, 310, fontSize);

    doc.text(hyphenText, 10, 320); //-----------------------------------------------------------------------------

    // Add the image
    const imgData = './Flex.png'; // Replace with the actual path to your image
    const imageHeight = 260;
    doc.addImage(imgData, 'png', 10, 330, Width - 20, imageHeight);

    doc.text('Masa muscular segmentaria (kg)', 10, 330);
    doc.text(`${formData.mmsIt}`, 40, 370);
    doc.text(`${formData.mmsDt}`, FormatToRight(doc, `${formData.mmsDt}`, fontSize) - 30, 370);
    doc.text(`${formData.mmsC}`, (Width - 10) / 2, 300 + imageHeight / 2);

    doc.setFontSize(fontSize * 1.2);
    doc.text(`Izquierda`, 30, 320 + imageHeight / 2);
    doc.text(`Derecha`, FormatToRight(doc, `${formData.mmsDt}`, fontSize) - 60, 320 + imageHeight / 2);
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
    valuePrint(doc, `Peso Predecido`, `${formData.pesoPred} kg`, 840, fontSize);
    valuePrint(doc, `Masa Grasa Predecida`, `${formData.MGP} kg`, 860, fontSize);
    valuePrint(doc, `Control`, `${formData.control}`, 880, fontSize);

    doc.text(hyphenText, 10, 890); //-----------------------------------------------------------------------------

    valuePrint(doc, `Impedancia`, `${formData.impedancia}`, 900, fontSize);

    doc.setFontSize(fontSize * 0.8);
    doc.text("www.accuniq.com", 10, 920);

    // Save the PDF with a unique name (e.g., timestamp)
    const fileName = `form_submission_${Date.now()}.pdf`;
    doc.save(fileName);

    // Clear the form after submission
    setformData(getDefaults());
  };



  return (
    <div className="vertical-container">
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>

        <div className="container">
          <TextInput
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            label="Nombre"
            type="text"
          />
          <TextInput
            name="ID"
            value={formData.ID}
            onChange={handleInputChange}
            label="ID"
            type="text"
          />

          <div>
            <label htmlFor="fecha">Fecha: </label>
            <DatePicker
              id="fecha"
              selected={formData.fecha}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Format the date as needed
            />
          </div>
        </div>

        <br />

        <div className="container">

          <TextInput
            name="estatura"
            value={formData.estatura}
            display={formData.estatura}
            onChange={handleInputChange}
            label="Estatura"
            type="number"
            unit="cm"
          />
          <TextInput
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            label="Edad"
            type="number"
            unit="años"
          />
          <TextInput
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            label="Sexo"
            type="text"
          />
          <TextInput
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            label="Peso"
            type="number"
            unit="kg"
          />
        </div>

        <br />

        <div className="container">
          <TextInput
            name="smm"
            value={formData.smm}
            onChange={handleInputChange}
            label="SMM (Masa Muscular Esquelética)"
            type="number"
            unit="kg"
          />
          <TextInput
            name="masaGrasa"
            value={formData.masaGrasa}
            onChange={handleInputChange}
            label="Masa Grasa"
            type="number"
            unit="kg"
          />

        </div>

        <div className="vertical-container">

          <TextInput
            name="porcentajeGrasa"
            value={formData.porcentajeGrasa}
            onChange={handleInputChange}
            label="Porcentaje de Grasa Corporal"
            type="number"
            unit="%"
          />
          <TextInput
            name="imc"
            value={formData.imc}
            onChange={handleInputChange}
            label="IMC (Índice de Masa Corporal)"
            type="number"
            unit="kg/m2"
          />
          <TextInput
            name="cinturaCadera"
            value={formData.cinturaCadera}
            onChange={handleInputChange}
            label="Proporción de Cintura a Cadera"
            type="number"
          />
        </div>

        <h2>Masa muscular segmentaria (kg)</h2>

        <div className="man">
          <div className="vertical-container">
            <TextInput
              name="mmsIt"
              value={formData.mmsIt}
              onChange={handleInputChange}
              label=""
              type="number"
              className="mmsIt"
            />
            <h2>Derecha</h2>

            <TextInput
              name="mmsId"
              value={formData.mmsId}
              onChange={handleInputChange}
              label=""
              type="number"
              className="mmsId"
            />
          </div>
          <div className="vertical-container">
            <TextInput
              name="mmsC"
              value={formData.mmsC}
              onChange={handleInputChange}
              label=""
              type="number"
              className="mmsC"
            />
          </div>
          <div className="vertical-container">

            <TextInput
              name="mmsDt"
              value={formData.mmsDt}
              onChange={handleInputChange}
              label=""
              type="number"
              className="mmsDt"
            />
            <h2>Izquierda</h2>
            <TextInput
              name="mmsDd"
              value={formData.mmsDd}
              onChange={handleInputChange}
              label=""
              type="number"
              className="mmsDd"
            />
          </div>
        </div>

        <br />

        <div className="vertical-container">
          <div className="container">
            <TextInput
              name="tipoCuerpo"
              value={formData.tipoCuerpo}
              onChange={handleInputChange}
              label="Tipo de Cuerpo"
              type="text"
            />
            <TextInput
              name="imb"
              value={formData.imb}
              onChange={handleInputChange}
              label="Ìndice metabólico basal"
              type="number"
              unit="kcal"
            />
          </div>

          <TextInput
            name="TBW"
            value={formData.TBW}
            onChange={handleInputChange}
            label="TBW"
            type="number"
            unit="L"
          />
          <TextInput
            name="ECW"
            value={formData.ECW}
            onChange={handleInputChange}
            label="ECW"
            type="number"
            unit="L"
          />
          <TextInput
            name="ICW"
            value={formData.ICW}
            onChange={handleInputChange}
            label="ICW"
            type="number"
            unit="L"
          />
        </div>
        <div className="container">
          <TextInput
            name="propECW"
            value={formData.propECW}
            onChange={handleInputChange}
            label="Proporción de ECW"
            type="number"
          />
        </div>
        <div className="vertical-container">
          <TextInput
            name="pObj"
            value={formData.pObj}
            onChange={handleInputChange}
            label="Peso Objetivo"
            type="number"
            unit="kg"
          />
          <TextInput
            name="contGrasa"
            value={formData.contGrasa}
            onChange={handleInputChange}
            label="Control de grasa"
            type="number"
            unit="kg"
          />
          <TextInput
            name="contMusc"
            value={formData.contMusc}
            onChange={handleInputChange}
            label="Control de músculo"
            type="number"
            unit="kg"
          />
        </div>

        <div className="vertical-container">
          <h1>Meta Propuesta</h1>
          <TextInput
            name="objPBF"
            value={formData.objPBF}
            onChange={handleInputChange}
            label="Objetivo PBF"
            type="number"
            unit="%"
          />
          <TextInput
            name="pesoPred"
            value={formData.pesoPred}
            onChange={handleInputChange}
            label="Peso Predecido"
            type="number"
            unit="kg"
          />
          <TextInput
            name="MGP"
            value={formData.MGP}
            onChange={handleInputChange}
            label="Masa Grasa Predecida"
            type="number"
            unit="kg"
          />
          <TextInput
            name="control"
            value={formData.control}
            onChange={handleInputChange}
            label="control"
            type="text"
          />
          <TextInput
            name="impedancia"
            value={formData.impedancia}
            onChange={handleInputChange}
            label="Impedancia"
            type="text"
          />
        </div>


        <br />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function sectionPrint() {

}

function valuePrint(doc, text, value, yCoord, fontSize, extraText = '') {

  doc.text(text + `:`, 10, yCoord);
  doc.text(value, FormatToRight(doc, value, fontSize), yCoord);

  if (extraText != '') {
    doc.setFontSize(fontSize * 0.8);
    doc.text(extraText, 10, yCoord + 10);
    doc.setFontSize(fontSize);
  }
}

function FormatToRight(doc, text, fontSize) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getStringUnitWidth(text) * fontSize;
  const xCoordinate = pageWidth - 10 - textWidth;

  return xCoordinate;
}

function getDefaults() {
  return (
    {
      nombre: '',
      fecha: new Date(),
      ID: '',
      estatura: '',
      edad: '',
      sexo: '',
      peso: '',
      smm: '',
      masaGrasa: '',
      porcentajeGrasa: '',
      imc: '',
      cinturaCadera: '',
      mmsIt: '', mmsId: '', mmsDt: '', mmsC: '', mmsDd: '',
      tipoCuerpo: 'Obeso',
      imb: '',
      TBW: '54.5',
      ECW: '22.2',
      ICW: '32.3',
      propECW: '0.407',
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

export default Form;