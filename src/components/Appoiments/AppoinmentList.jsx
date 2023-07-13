import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, getUserById } from "../store/features/clientSlice";
import DateFilter from "./DateFilter";
import { fetchData } from "../store/features/calendarSlice";
import axios from "axios";
import { getAppointments } from "../store/features/appointmentsSlice";
const AppoinmentList = () => {
  const [list, setList] = useState([]);
  const [inputClients, setInputClients] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [dni, setDni] = useState("");
  const { data } = useSelector((state) => state.clients);
  const { calendarData } = useSelector((state) => state.calendar);
  const appointments = useSelector((state) => state.appointments.appointments);

  //fecha actual
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;

  const currentAppointments = appointments.filter((a) => {
    return a.fecha >= currentDateISO;
  });

  console.log(appointments);

  const users = useSelector((state) => state.selectedClient);

  const [values, setValues] = useState({
    dni: "",
    name: "",
    lastName: "",
    date: "",
    time: "",
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  //post request
  const handlePost = () => {
    const clientInfo = {
      dni: values.dni,
      fecha: values.date,
      hora: values.time,
      estado: true,
    };

    const appointmentsUrl =
      "https://api-sist-odontologico-production.up.railway.app/turnos";

    axios
      .post(`${appointmentsUrl}/${clientInfo.dni}`, clientInfo)
      .then((response) => {
        console.log("Response ->", response.data);
      })
      .catch((error) => {
        console.error("Error ->", error);
      });
  };

  const handleCreatePatient = React.useCallback(
    (patientInfo) => {
      setValues((prev) => ({ ...prev, ...patientInfo }));
    },
    [values]
  );

  const SearchRelatedPatient = async (e) => {
    e.preventDefault();
    try {
      if (dni !== "") {
        const response = await dispatch(getUserById(dni));
        console.log("que dice el response ->", response);

        const result = response.payload.data;

        setSearchResult(`${result.nombre} ${result.apellido}`);
        handleCreatePatient({
          name: result.nombre,
          lastName: result.apellido,
        });
      }
    } catch (error) {
      console.error("Error al buscar pacientes relacionados:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("values ->", values);

    if (values.dni) {
      setList((prev) => prev.concat(values));
    }
  };

  const handleInputValue = async (e) => {
    e.preventDefault();
    const event = e.target.value;
    setDni(event);
    handleCreatePatient({
      ...values,
      dni: event,
    });
  };

  const handleSelectChanged = (e) => {
    e.preventDefault();

    handleCreatePatient({
      time: e.target.value,
    });
  };

  const optionsList = React.useMemo(() => {
    const sortedList = list
      .sort((a, b) => (a.time < b.time ? -1 : 1))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    return sortedList;
  }, [list]);

  return (
    <main className="flex flex-col gap-3 w-[51em]">
      <form
        onSubmit={handleSubmit}
        className="flex bg-primary py-2 px-3 rounded-full justify-evenly items-center"
      >
        <input
          type="number"
          onBlur={SearchRelatedPatient}
          onChange={(e) => {
            handleInputValue(e);
          }}
          className="px-2 py-2 rounded-full w-[10em] pl-5 outline-none"
          placeholder="DNI..."
        />
        <div className="w-[18em] text-center">
          <p className="text-white  text-2xl w-auto">
            {searchResult.length > 0 && <span>{searchResult}</span>}
          </p>
        </div>
        <div>
          <DateFilter onSelect={handleCreatePatient} />
        </div>
        <select
          className="bg-secondary-100 text-white py-2 px-3 rounded-full"
          onChange={handleSelectChanged}
          defaultValue={"Hora"}
        >
          <option value={"16:00"}>16:00</option>
          <option value={"16:30"}>16:30</option>
          <option value={"17:00"}>17:00</option>
          <option value={"17:30"}>17:30</option>
          <option value={"18:00"}>18:00</option>
          <option value={"18:30"}>18:30</option>
          <option value={"19:00"}>19:00</option>
          <option value={"19:30"}>19:30</option>
        </select>
        <button type="submit" onClick={handlePost}>
          <FontAwesomeIcon
            className="h-[2.5em] text-green-800"
            icon={faCircleCheck}
          />
        </button>
      </form>
      <ul className="mt-4 bg-gray-300 text-black h-[40em] rounded-2xl px-2 py-5 overflow-y-auto scrollbar-hide">
        {currentAppointments.map((item, index) => (
          <li
            key={index}
            className="mb-2 shadow-md bg-primary py-2 rounded-full px-3 flex justify-evenly items-center"
          >
            <div>{item?.pacienteId}</div>
            <div>{item?.paciente?.nombre}</div>
            <div>{item?.paciente?.apellido}</div>
            <div>{item.fecha}</div>
            <div>{item.hora}</div>
            <div>
              <FontAwesomeIcon
                className="h-[1.5em] text-red-600 cursor-pointer"
                icon={faCircleXmark}
              />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AppoinmentList;