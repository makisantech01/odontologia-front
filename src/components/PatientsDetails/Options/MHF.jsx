import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../../Validations/FormValidation";
import * as yup from "yup";

const convertirABooleano = (valor) => {
  return valor === "si";
};

const MHF = () => {
  return (
    <div className="container mx-auto mt-8">
      <Formik
        initialValues={{
          enfermedad: "",
          detalleEnfermedad: "",
          tratamientoMedico: "",
          detalleTratamiento: "",
          medicacion: "",
          detalleMedicacion: "",
          alergia: "",
          detalleAlergia: "",
          cicatrizacion: "",
          fiebreReumatica: "",
          diabetes: "",
          problemasCardiacos: "",
          aspirinas: "",
          anticoagulante: "",
          tabaquismo: "",
          embarazo: "",
          mesesEmbarazo: "",
          hipertension: "",
          hipotension: "",
          problemasRenales: "",
          problemasGastricos: "",
          detalleGastricos: "",
          convulsiones: "",
          epilepsia: "",
          sifilisGonorreaHIV: "",
          operacion: "",
          detalleOperacion: "",
          problemasRespiratorios: "",
          detalleRespiratorios: "",
          tiroides: "",
          detalleTiroides: "",
          otros: "",
          detalleOtros: "",
          consentimiento: "",
        }}
        // validationSchema={yup.object({
        //   enfermedad: yup.string().required("Por favor selecione"),
        //   consentimiento: yup.string().required("Required"),
        // })}
        onSubmit={(values, { setSubmiting }) => {
          const formData = {
            enfermedad: convertirABooleano(values.enfermedad),
            detalleEnfermedad: values.detalleEnfermedad,
            consentimiento: convertirABooleano(values.consentimiento),
          };

          console.log(JSON.stringify(formData, null, 2));
          setSubmiting(false);
        }}
      >
        <Form>
          <div className="flex flex-col lg:flex-row w-full">
            <div className="lg:w-1/2 w-full flex flex-col">
              {/* Pregunta 1 */}
              <div className="mb-4 flex gap-2 lg:gap-5">
                <label className="font-bold">¿Sufre alguna enfermedad?</label>
                <div>
                  <label className="mr-4">
                    <Field
                      type="radio"
                      name="enfermedad"
                      value="si"
                      // checked={enfermedad === "si"}
                      // onChange={() => setFieldValue("enfermedad", "si")}
                      className="mr-3"
                    />
                    Si
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="enfermedad"
                      value="no"
                      // checked={enfermedad === "no"}
                      // onChange={() => {
                      //   setFieldValue("enfermedad", "no");
                      //   setFieldValue("detalleEnfermedad", "");
                      // }}
                      className="mr-3"
                    />
                    No
                  </label>
                  {/* <ErrorMessage
                    component="label"
                    name="enfermedad"
                    className="text-red-600"
                  /> */}
                </div>
              </div>
              {/* {touched.enfermedad && errors.enfermedad && (
                <div className="text-red-600">{errors.enfermedad}</div>
              )} */}
              {/* {enfermedad === "si" && (
                <div className="mb-4">
                  <label className="font-bold mr-3">¿Cuál?</label>
                  <Field
                    type="text"
                    name="detalleEnfermedad"
                    className="rounded p-1/2 text-white bg-gray-700 outline-none pl-2 cursor-text"
                  />
                  {touched.detalleEnfermedad && errors.detalleEnfermedad && (
                    <div className="text-red-600">
                      {errors.detalleEnfermedad}
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </div>
          {/* Pregunta 2 */}
          {/* <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="font-bold">¿Hace tratamiento medico?</label>
                  <div>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="tratamientoMedico"
                        value="si"
                        checked={values.tratamientoMedico === "si"}
                        onChange={() =>
                          setFieldValue("tratamientoMedico", "si")
                        }
                        className="mr-3"
                      />
                      Si
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="tratamientoMedico"
                        value="no"
                        checked={values.tratamientoMedico === "no"}
                        onChange={() => {
                          setFieldValue("tratamientoMedico", "no");
                          setFieldValue("detalleTratamiento", "");
                        }}
                        className="mr-3"
                      />
                      No
                    </label>
                  </div>
                </div>
                {values.tratamientoMedico === "si" && (
                  <div className="mb-4">
                    <label className="font-bold mr-3">¿Cuál?</label>
                    <Field
                      type="text"
                      name="detalleTratamiento"
                      className="rounded p-1/2 text-white bg-gray-700 outline-none pl-2 cursor-text"
                    />
                  </div>
                )} */}
          {/* Pregunta 3 */}
          {/* <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="font-bold">¿Toma alguna medicacion?</label>
                  <div>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="medicacion"
                        value="si"
                        checked={values.medicacion === "si"}
                        onChange={() => setFieldValue("medicacion", "si")}
                        className="mr-3"
                      />
                      Si
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="medicacion"
                        value="no"
                        checked={values.medicacion === "no"}
                        onChange={() => {
                          setFieldValue("medicacion", "no");
                          setFieldValue("detalleMedicacion", "");
                        }}
                        className="mr-3"
                      />
                      No
                    </label>
                  </div>
                </div>
                {values.medicacion === "si" && (
                  <div className="mb-4">
                    <label className="font-bold mr-3">¿Cuál?</label>
                    <Field
                      type="text"
                      name="detalleMedicacion"
                      className="rounded p-1/2 text-white bg-gray-700 outline-none pl-2 cursor-text"
                    />
                  </div>
                )} */}
          {/* Pregunta 4 */}
          {/* <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="font-bold">
                    ¿Es alérgico a alguna droga?
                  </label>
                  <div>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="alergia"
                        value="si"
                        checked={values.alergia === "si"}
                        onChange={() => setFieldValue("alergia", "si")}
                        className="mr-3"
                      />
                      Si
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="alergia"
                        value="no"
                        checked={values.alergia === "no"}
                        onChange={() => {
                          setFieldValue("alergia", "no");
                          setFieldValue("detalleAlergia", "");
                        }}
                        className="mr-3"
                      />
                      No
                    </label>
                  </div>
                </div>
                {values.alergia === "si" && (
                  <div className="mb-4">
                    <label className="font-bold mr-3">¿Cuál?</label>
                    <Field
                      type="text"
                      name="detalleMedicacion"
                      className="rounded p-1/2 text-white bg-gray-700 outline-none pl-2 cursor-text"
                    />
                  </div>
                )}
              </div>
              <div className="lg:w-1/2 w-full"> */}
          {/* Pregunta 1 */}
          {/* <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="font-bold">Hipertensión</label>
                  <div>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="hipertension"
                        value="si"
                        checked={values.hipertension === "si"}
                        onChange={(e) =>
                          setFieldValue(
                            "hipertension",
                            e.target.checked ? "si" : "no"
                          )
                        }
                        className="mr-3"
                      />
                      Si
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="hipertension"
                        value="no"
                        checked={values.hipertension === "no"}
                        onChange={() => {
                          setFieldValue("hipertension", "no");
                        }}
                        className="mr-3"
                      />
                      No
                    </label>
                  </div>
                </div> */}
          {/* Pregunta 2 */}
          {/* <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="font-bold">Hipotensión</label>
                  <div>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="hipotension"
                        value="si"
                        checked={values.hipotension === "si"}
                        onChange={(e) =>
                          setFieldValue(
                            "hipotension",
                            e.target.checked ? "si" : "no"
                          )
                        }
                        className="mr-3"
                      />
                      Si
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="hipotension"
                        value="no"
                        checked={values.hipotension === "no"}
                        onChange={() => {
                          setFieldValue("hipotension", "no");
                        }}
                        className="mr-3"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          <div className=" w-full flex justify-center items-center gap-3 py-3 px-5 font-thin">
            <label>
              He comprendido todos los explicaciones que se me han facilitado en
              el lenguaje claro y sencillo, he podido realizar todas las
              observaciones y se me han aclarado todas las dudas; por lo que
              estoy completamente de acuerdo con el tratamiento que se me va a
              realizar. Otorgo mi consentimiento para realizar el tratamiento
              necesario para rehabilitar mi solud bucodental propuesta por el/la
              Dr/a MP.
              <Field
                type="checkbox"
                id="consentimiento"
                name="consentimiento"
                value="si"
                // checked={consentimiento === "si"}
                // onChange={(e) => {
                //   setFieldValue(
                //     "consentimiento",
                //     e.target.checked ? "si" : "no"
                //   );
                // }}
                className="ml-5"
              />
              {/* <ErrorMessage
                component="label"
                name="consentimiento"
                className="text-red-600"
              /> */}
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enviar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MHF;