import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchClient } from "../../components/store/features/clientSlice";
import Swal from "sweetalert2";
library.add(faQuestion);

const PatientMedicalHistory = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const user = useSelector((state) => state.users.users);
  const client = useSelector(
    (state) => state.clients?.selectedClient?.data.historial
  );

  useEffect(() => {
    dispatch(fetchClient(user));
  }, [dispatch]);

  const api = import.meta.env.VITE_ENDPOINT;

  const onSubmit = async (data) => {
    try {
      for (let key in data) {
        if (data[key] === "true") {
          data[key] = true;
        } else if (data[key] === "false") {
          data[key] = false;
        } else if (data[key] === "") {
          data[key] = null;
        }
      }

      const result = await Swal.fire({
        title: `¿Confirma las modificaciones?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const response = await axios.put(
          `${api}/historiales/${client.id}`,
          data
        );

        console.log("este es el response", response);
        console.log("esto es data", data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: "Información actualizada con éxito!",
          });
        }
      }
    } catch (response) {
      console.log("data user", data);
      console.error(response);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "Error al modificar la información!",
      });
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };
  return (
    <form className="w-[92vw] flex flex-col justify-center items-center lg:w-[70vw] mx-4 lg:h-[90vh] md:h-[80vh] h-[89vh] bg-primary py-4 rounded-3xl shadow-2xl z-10">
      <h2 className="lg:text-6xl text-4xl font-bold text-center italic text-white my-5">
        Historial Médico
      </h2>
      <div className="flex bg-secondary-150 shadow-xl lg:flex-row md:flex-row flex-col h-[55%] w-[95%]  overflow-y-auto mb-3">
        <div className="p-4 flex flex-col gap-4 md:w-1/2 xs:w-full">
          <div className=" flex items-center justify-between">
            <label className="text-1xl text-white">Enfermedades</label>
            <select
              defaultValue={client?.enfermedad}
              className="border p-2 rounded w-[3em]"
              {...register("enfermedad")}
              onBlur={() => handleBlur("enfermedad")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.enfermedad && (
            <p className="h-0 text-red-500">{errors.enfermedad.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleEnfermedad}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleEnfermedad", {
                validate: (val) => {
                  if (watch("enfermedad") == "true" && !val) {
                    return "Debe aclarar que enfermedad/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleEnfermedad")}
            />
          </div>
          {errors.detalleEnfermedad && (
            <p className="h-0 text-red-500">
              {errors.detalleEnfermedad.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Tratamiento Médico</label>
            <select
              defaultValue={client?.tratamientoMedico}
              className="border p-2 rounded w-[4em]"
              {...register("tratamientoMedico")}
              onBlur={() => handleBlur("tratamientoMedico")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.tratamientoMedico && (
            <p className="h-0 text-red-500">
              {errors.tratamientoMedico.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleTratamiento}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleTratamiento", {
                validate: (val) => {
                  if (watch("tratamientoMedico") == "true" && !val) {
                    return "Debe aclarar que tratamiento/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleTratamiento")}
            />
          </div>
          {errors.detalleTratamiento && (
            <p className="h-0 text-red-500">
              {errors.detalleTratamiento.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Medicación</label>
            <select
              defaultValue={client?.medicacion}
              className="border p-2 rounded w-[4em]"
              {...register("medicacion")}
              onBlur={() => handleBlur("medicacion")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.medicacion && (
            <p className="h-0 text-red-500">{errors.medicacion.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleMedicacion}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleMedicacion", {
                validate: (val) => {
                  if (watch("medicacion") == "true" && !val) {
                    return "Debe aclarar que medicacion/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleMedicacion")}
            />
          </div>
          {errors.detalleMedicacion && (
            <p className="h-0 text-red-500">
              {errors.detalleMedicacion.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Alergia</label>
            <select
              defaultValue={client?.alergia}
              className="border p-2 rounded w-[4em]"
              {...register("alergia")}
              onBlur={() => handleBlur("alergia")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.alergia && (
            <p className="h-0 text-red-500">{errors.alergia.message}</p>
          )}

          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleAlergia}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleAlergia", {
                validate: (val) => {
                  if (watch("alergia") == "true" && !val) {
                    return "Debe aclarar que alergia/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleAlergia")}
            />
          </div>
          {errors.detalleAlergia && (
            <p className="h-0 text-red-500">{errors.detalleAlergia.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Cicatrización</label>
            <select
              defaultValue={client?.cicatrizacion}
              className="border p-2 rounded w-[4em]"
              {...register("cicatrizacion")}
              onBlur={() => handleBlur("cicatrizacion")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.cicatrizacion && (
            <p className="h-0 text-red-500">{errors.cicatrizacion.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Fiebre Reumática</label>
            <select
              defaultValue={client?.fiebreReumatica}
              className="border p-2 rounded w-[4em]"
              {...register("fiebreReumatica")}
              onBlur={() => handleBlur("fiebreReumatica")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.fiebreReumatica && (
            <p className="h-0 text-red-500">{errors.fiebreReumatica.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Diabetes</label>
            <select
              defaultValue={client?.diabetes}
              className="border p-2 rounded w-[4em]"
              {...register("diabetes")}
              onBlur={() => handleBlur("diabetes")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.diabetes && (
            <p className="h-0 text-red-500">{errors.diabetes.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Problemas Cardíacos</label>
            <select
              defaultValue={client?.problemasCardiacos}
              className="border p-2 rounded w-[4em]"
              {...register("problemasCardiacos")}
              onBlur={() => handleBlur("problemasCardiacos")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.problemasCardiacos && (
            <p className="h-0 text-red-500">
              {errors.problemasCardiacos.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Aspirinas</label>
            <select
              defaultValue={client?.aspirinas}
              className="border p-2 rounded w-[4em]"
              {...register("aspirinas")}
              onBlur={() => handleBlur("aspirinas")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.aspirinas && (
            <p className="h-0 text-red-500">{errors.aspirinas.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Anticoagulantes</label>
            <select
              defaultValue={client?.anticoagulante}
              className="border p-2 rounded w-[4em]"
              {...register("anticoagulante")}
              onBlur={() => handleBlur("anticoagulante")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.anticoagulante && (
            <p className="h-0 text-red-500">{errors.anticoagulante.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Tabaquísmo</label>
            <select
              defaultValue={client?.tabaquismo}
              className="border p-2 rounded w-[4em]"
              {...register("tabaquismo")}
              onBlur={() => handleBlur("tabaquismo")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.tabaquismo && (
            <p className="h-0 text-red-500">{errors.tabaquismo.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Embarazo</label>
            <select
              defaultValue={client?.embarazo}
              className="border p-2 rounded w-[4em]"
              {...register("embarazo")}
              onBlur={() => handleBlur("embarazo")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.embarazo && (
            <p className="h-0 text-red-500">{errors.embarazo.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.mesesEmbarazo}
              className="border p-2 rounded w-[17em]"
              type="number"
              min={0}
              max={9}
              placeholder="Cuantos Meses?"
              {...register("mesesEmbarazo", {
                validate: (val) => {
                  if (watch("embarazo") == "true" && !val) {
                    return "Debe aclarar cuantos meses";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("mesesEmbarazo")}
            />
          </div>
          {errors.mesesEmbarazo && (
            <p className="h-0 text-red-500">{errors.mesesEmbarazo.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Hipertensión</label>
            <select
              defaultValue={client?.hipertension}
              className="border p-2 rounded w-[4em]"
              {...register("hipertension")}
              onBlur={() => handleBlur("hipertension")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.hipertension && (
            <p className="h-0 text-red-500">{errors.hipertension.message}</p>
          )}
        </div>
        <div className=" p-4 flex flex-col gap-4 md:w-1/2 xs:w-full">
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Hipotensión</label>
            <select
              defaultValue={client?.hipotension}
              className="border p-2 rounded w-[4em]"
              {...register("hipotension")}
              onBlur={() => handleBlur("hipotension")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.hipotension && (
            <p className="h-0 text-red-500">{errors.hipotension.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Problemas Renales</label>
            <select
              defaultValue={client?.problemasRenales}
              className="border p-2 rounded w-[4em]"
              {...register("problemasRenales")}
              onBlur={() => handleBlur("problemasRenales")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.problemasRenales && (
            <p className="h-0 text-red-500">
              {errors.problemasRenales.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Problemas Gástricos</label>
            <select
              defaultValue={client?.problemasGastricos}
              className="border p-2 rounded w-[4em]"
              {...register("problemasGastricos")}
              onBlur={() => handleBlur("problemasGastricos")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.problemasGastricos && (
            <p className="h-0 text-red-500">
              {errors.problemasGastricos.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleGastricos}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleGastricos", {
                validate: (val) => {
                  if (watch("problemasGastricos") == "true" && !val) {
                    return "Debe aclarar que problema/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleGastricos")}
            />
          </div>
          {errors.detalleGastricos && (
            <p className="h-0 text-red-500">
              {errors.detalleGastricos.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Convulsiones</label>
            <select
              defaultValue={client?.convulsiones}
              className="border p-2 rounded w-[4em]"
              {...register("convulsiones")}
              onBlur={() => handleBlur("convulsiones")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.convulsiones && (
            <p className="h-0 text-red-500">{errors.convulsiones.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Epilepsia</label>
            <select
              defaultValue={client?.epilepsia}
              className="border p-2 rounded w-[4em]"
              {...register("epilepsia")}
              onBlur={() => handleBlur("epilepsia")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.epilepsia && (
            <p className="h-0 text-red-500">{errors.epilepsia.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">
              Sifilis? Gonorrea? HIV?
            </label>
            <select
              defaultValue={client?.sifilisGonorreaHIV}
              className="border p-2 rounded w-[4em]"
              {...register("sifilisGonorreaHIV")}
              onBlur={() => handleBlur("sifilisGonorreaHIV")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.sifilisGonorreaHIV && (
            <p className="h-0 text-red-500">
              {errors.sifilisGonorreaHIV.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Operaciones</label>
            <select
              defaultValue={client?.operacion}
              className="border p-2 rounded w-[4em]"
              {...register("operacion")}
              onBlur={() => handleBlur("operacion")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.operacion && (
            <p className="h-0 text-red-500">{errors.operacion.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleOperacion}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleOperacion", {
                validate: (val) => {
                  if (watch("operacion") == "true" && !val) {
                    return "Debe aclarar que operacion/es";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleOperacion")}
            />
          </div>
          {errors.detalleOperacion && (
            <p className="h-0 text-red-500">
              {errors.detalleOperacion.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">
              Problemas Respiratorios
            </label>
            <select
              defaultValue={client?.problemasRespiratorios}
              className="border p-2 rounded w-[4em]"
              {...register("problemasRespiratorios")}
              onBlur={() => handleBlur("problemasRespiratorios")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.problemasRespiratorios && (
            <p className="h-0 text-red-500">
              {errors.problemasRespiratorios.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleRespiratorios}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleRespiratorios", {
                validate: (val) => {
                  if (watch("problemasRespiratorios") == "true" && !val) {
                    return "Debe aclarar que problema/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleRespiratorios")}
            />
          </div>
          {errors.detalleRespiratorios && (
            <p className="h-0 text-red-500">
              {errors.detalleRespiratorios.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Tiroides</label>
            <select
              defaultValue={client?.tiroides}
              className="border p-2 rounded w-[4em]"
              {...register("tiroides")}
              onBlur={() => handleBlur("tiroides")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.tiroides && (
            <p className="h-0 text-red-500">{errors.tiroides.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleTiroides}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleTiroides", {
                validate: (val) => {
                  if (watch("tiroides") == "true" && !val) {
                    return "Debe aclarar que tipo/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleTiroides")}
            />
          </div>
          {errors.detalleTiroides && (
            <p className="h-0 text-red-500">{errors.detalleTiroides.message}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="text-1xl text-white">Otros</label>
            <select
              defaultValue={client?.otros}
              className="border p-2 rounded w-[4em]"
              {...register("otros")}
              onBlur={() => handleBlur("otros")}
            >
              <option value="">-</option>
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </select>
          </div>
          {errors.otros && (
            <p className="h-0 text-red-500">{errors.otros.message}</p>
          )}
          <div className="flex items-center justify-between">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-1xl text-white"
            />
            <input
              defaultValue={client?.detalleOtros}
              className="border p-2 rounded w-[17em]"
              type="text"
              placeholder="Cual?"
              {...register("detalleOtros", {
                validate: (val) => {
                  if (watch("otros") == "true" && !val) {
                    return "Debe aclarar que otro/s detalle/s";
                  }
                  return true;
                },
              })}
              onBlur={() => handleBlur("detalleOtros")}
            />
          </div>
          {errors.detalleOtros && (
            <p className="h-0 text-red-500">{errors.detalleOtros.message}</p>
          )}
        </div>
      </div>
      <div className="px-5 w-full">
        <div className=" h-[8em] overflow-y-auto scrollbar-default flex items-center justify-between">
          <label className="text-1xl text-white">
            Al modificar esta información, declaro que todos los datos
            proporcionados respecto a mi estado de salud son verdaderos y que he
            comprendido todas las explicaciones que se me han facilitado en el
            lenguaje claro y sencillo. Se me aclararon todas las dudas, por lo
            que estoy completamente de acuerdo con los tratamientos que se me
            van a realizar.
          </label>
          <input
            className="border p-2 rounded w-[17em]"
            type="checkbox"
            {...register("consentimiento", {
              required: "Debe aceptar el consentimiento",
            })}
            defaultChecked={false}
            onBlur={() => handleBlur("consentimiento")}
            onClick={(e) => {}}
          />
        </div>
        {errors.consentimiento && (
          <p className="h-0 text-red-500">{errors.consentimiento.message}</p>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default PatientMedicalHistory;
