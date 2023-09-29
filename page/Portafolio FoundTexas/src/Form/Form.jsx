import React, { useState, useEffect } from 'react';
import { createPDF, getDefaults } from './PDFfunctions'; // Import the named exports 'createPDF' and 'FormatToRight'
import TextInput from './TextInput'; // Reusable TextInput component;
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import './Form.css'; // Import your custom CSS for styling

function Form() {
  const [formData, setFormData] = useState(getDefaults());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let trimmedValue = value;

    if (value < 0 && !isNaN(value)) {
      trimmedValue = 0;
      alert("You can't pick a negative!");
      return false;
    }

    if (value === "") {

      setFormData({
        ...formData,
        [name]: trimmedValue,
      });

      return;
    }

    if (!isNaN(trimmedValue)) {
      trimmedValue = value.includes('.') ? parseFloat(trimmedValue) : parseInt(trimmedValue, 10);
    }

    if (name === 'peso') {
      updateSMM(name, value);
      updateIMC(name, value);
      updateIMB(name, value);
      updateTBW(name, value);
    }

    if (name === 'estatura') {
      updateIMC(name, value);
      updateIMB(name, value);
      updateTBW(name, value);
    }

    if (name === 'perCadera') {
      updatePropDeCint(name, value);
    }

    if (name === 'perCintura' || name === 'sexo') {
      updatePorcentajeGrasa(name, value);
      updatePropDeCint(name, value);
    }

    if (name === 'perCintura' || name === 'edad') {
      updatePorcentajeGrasa(name, value);
    }

    if (name === 'edad' || name === 'sexo') {
      updateIMB(name, value);
      updateTBW(name, value);
    }

    setFormData({
      ...formData,
      [name]: trimmedValue,
    });
  };

  const updateIMC = (name, value) => {
    const peso = (name === 'peso') ? value : parseFloat(formData.peso);
    let altura = parseFloat(((name === 'estatura') ? value : parseFloat(formData.estatura)) / 100);

    if (altura == 0) altura = 1;

    const val = parseFloat(peso / (altura * altura)).toFixed(1);
    formData.imc = val;

    formData.tipoCuerpo = (val >= 30) ? "Obeso" : (val >= 25) ? "SobrePeso" : (val >= 18.5) ? "Normal" : "Bajo Peso";
  }

  const updatePropDeCint = (name, value) => {
    const perCintura = (name === 'perCintura') ? value : parseFloat(formData.perCintura);
    let perCadera = parseFloat(((name === 'perCadera') ? value : parseFloat(formData.perCadera)));
    const isFemenino = ((name === 'sexo') ? value : formData.sexo) == "Femenino";

    if (!isFemenino) perCadera = 90;

    if (perCadera == 0) perCadera = 1;

    const val = parseFloat(perCintura / perCadera).toFixed(2);
    formData.cinturaCadera = val;
  }

  const updatePorcentajeGrasa = (name, value) => {
    const perCintura = (name === 'perCintura') ? value : parseFloat(formData.perCintura);
    const edad = (name === 'edad') ? value : parseFloat(formData.edad);
    const isFemenino = ((name === 'sexo') ? value : formData.sexo) == "Femenino";

    const porcentajeGrasa = (perCintura * parseFloat(isFemenino ? 0.567 : 0.439)) + parseFloat(edad * (isFemenino ? 0.101 : 0.221)) - parseFloat(isFemenino ? 31.8 : 9.4);

    formData.porcentajeGrasa = porcentajeGrasa.toFixed(1);
    updateMasaGrasa('porcentajeGrasa', porcentajeGrasa.toFixed(1));
  }

  const updateMasaGrasa = (name, value) => {
    const peso = (name === 'peso') ? value : parseFloat(formData.peso);
    const porcentajeGrasa = (name === 'porcentajeGrasa') ? value : parseFloat(formData.porcentajeGrasa);

    const val = peso - parseFloat(porcentajeGrasa * peso) / 100;
    formData.masaGrasa = val.toFixed(1);

    updateSMM('masaGrasa', val.toFixed(1));
  }

  const updateIMB = (name, value) => {
    const peso = (name === 'peso') ? value : parseFloat(formData.peso);
    let altura = parseFloat(((name === 'estatura') ? value : parseFloat(formData.estatura)));
    const edad = (name === 'edad') ? value : parseFloat(formData.edad);
    const isFemenino = ((name === 'sexo') ? value : formData.sexo) == "Femenino";

    const val = parseFloat(
      (isFemenino ? 447.593 : 88.362) + ((isFemenino ? 9.247 : 13.397) * peso) + ((isFemenino ? 3.098 : 4.799) * altura) -
      ((isFemenino ? 4.33 : 5.677) * edad));

    formData.imb = val.toFixed(1);
  }

  const updateTBW = (name, value) => {
    const peso = (name === 'peso') ? value : parseFloat(formData.peso);
    let altura = parseFloat(((name === 'estatura') ? value : parseFloat(formData.estatura)));
    const edad = (name === 'edad') ? value : parseFloat(formData.edad);
    const isFemenino = ((name === 'sexo') ? value : formData.sexo) == "Femenino";

    const val = parseFloat(
      (isFemenino ? 0 : -0.09516 * edad) + ((isFemenino ? 0.1069 : 0.1074) * altura) +
      ((isFemenino ? 0.2466 : 0.3362) * peso) + (isFemenino ? -2.097 : 2.447));

    formData.TBW = val.toFixed(1);
    formData.ECW = (val * 0.4).toFixed(1);
    formData.ICW = (val * 0.6).toFixed(1);
  }

  const updateSMM = (name, value) => {
    const peso = (name === 'peso') ? value : parseFloat(formData.peso);
    const masaGrasa = (name === 'masaGrasa') ? value : parseFloat(formData.masaGrasa);

    const val = peso - parseFloat(peso - masaGrasa);
    formData.smm = val.toFixed(1);

    segmentMuscEsq(val)
  }

  const segmentMuscEsq = (value) => {

    const arms = value * 0.09;
    const center = value * 0.55;
    const legL = value * 0.15;
    const legR = value * 0.12;

    formData.mmsIt = arms.toFixed(1);
    formData.mmsId = legL.toFixed(1);
    formData.mmsDt = arms.toFixed(1);
    formData.mmsC = center.toFixed(1);
    formData.mmsDd = legR.toFixed(1);

  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPDF(formData);

    setFormData(getDefaults());
  };

  return (
    <>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>

        <div className="container">
          <div>
            <h2 htmlFor="sexo">Sexo: </h2>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
            >
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>
          <TextInput
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            label="Nombre"
            type="text"
            isNeeded="true"
          />
          <TextInput
            name="ID"
            value={formData.ID}
            onChange={handleInputChange}
            label="ID"
            type="text"
          />

          <div>
            <h2 htmlFor="fecha">Fecha: </h2>
            <DatePicker
              id="fecha"
              selected={formData.fecha}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Format the date as needed
            />
          </div>
        </div>

        <div className="container">
          <TextInput
            name="estatura"
            value={formData.estatura}
            onChange={handleInputChange}
            label="Estatura"
            type="number"
            unit="cm"
            isNeeded="true"
          />
          <TextInput
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            label="Edad"
            type="number"
            unit="años"
            isNeeded="true"
          />
          <TextInput
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            label="Peso"
            type="number"
            unit="kg"
            isNeeded="true"
          />
          <TextInput
            name="perCintura"
            value={formData.perCintura}
            onChange={handleInputChange}
            label="Cintura"
            type="number"
            unit="cm"
            isNeeded="true"
          />
          <TextInput
            name="perCintura"
            value={formData.perCintura}
            onChange={handleInputChange}
            label="Cintura"
            type="number"
            unit="cm"
            isNeeded="true"
            isVisible={formData.sexo == "Femenino"}
          />
        </div>

        <div className="container">

          <div className="vertical-container">
            <h2>Masa muscular segmentaria (kg)</h2>
            <div className="man">
              <div className="container">
                <div className="vertical-container">
                  <h2>{formData.mmsIt}kg</h2>
                  <h1>Izquierda</h1>
                  <h2>{formData.mmsId}kg</h2>
                  <br />
                  <br />
                  <br />
                </div>

                <br />
                <br />
                <br />

                <div className="vertical-container">
                  <h2>{formData.mmsC} kg</h2>
                  <br />
                  <br />
                </div>

                <br />
                <br />
                <br />

                <div className="vertical-container">
                  <h2>{formData.mmsDt} kg</h2>
                  <h1>Derecha</h1>
                  <h2>{formData.mmsDd} kg</h2>
                  <br />
                  <br />
                  <br />
                </div>

              </div>
            </div>
          </div>

          <div>
            <div className="container">
              <div className="vertical-container">
                <div className="container">
                  <div>
                    <h2>SMM: {formData.smm} kg</h2>
                    <p>(Masa Muscular Esqueletica)</p>
                  </div>
                  <div>
                    <h2>IMC: {formData.imc} kg/m2</h2>
                    <p>(Indice de Masa Corporal)</p>
                  </div>
                  <div>
                    <h2>IMB: {formData.imb} kcal</h2>
                    <p>(Ìndice metabólico basal)</p>
                  </div>
                </div>
                <div className="container">
                  <div>
                    <h2>Tipo de Cuerpo:</h2>
                    <h3>{formData.tipoCuerpo}</h3>
                  </div>
                  <div>
                    <h2>Masa Grasa:</h2>
                    <h3>{formData.masaGrasa} kg</h3>
                  </div>

                </div>
                <div className="container">
                  <div>
                    <h2>TBW: {formData.TBW} L</h2>
                    <p>(Agua corporal total)</p>
                  </div>
                  <div>
                    <h2>ECW: {formData.ECW} L</h2>
                    <p>(Agua extracelular)</p>
                  </div>
                  <div>
                    <h2>ICW: {formData.ICW} L</h2>
                    <p>(Agua intracelular)</p>
                  </div>
                </div>
              </div>

              <div>
                <h2>Porcentaje de Grasa Corporal:</h2>
                <h3>{formData.porcentajeGrasa} %</h3>

                <p>Adulto sexo masculino 15.0 ~ 20.0</p>
                <p>Adulto sexo femenino  20.0 ~ 30.0</p>

                <h2>Proporción de Cintura a Cadera: {formData.cinturaCadera} </h2>
                <p>Adulto sexo masculino 0.75 ~ 0.90</p>
                <p>Adulto sexo masculino 0.70 ~ 0.85</p>

                <h2>Proporción ECW: </h2>
                <h3>{formData.cinturaCadera} </h3>
              </div>
            </div>
          </div>

        </div>

        <div className="vertical-container">
          <h1>Meta Propuesta</h1>

          <div className="container">
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
          <div className="container">
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
          </div>

          <TextInput
            name="impedancia"
            value={formData.impedancia}
            onChange={handleInputChange}
            label="Impedancia"
            type="text"
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
    </>
  );
}

export default Form;