import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIdCard,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginUser,
  RegisterUser,
} from "../components/store/features/usersSlice";
import Swal from 'sweetalert2'
library.add(faIdCard, faLock, faEyeSlash, faEye);

const Register = () => {
  const loading = useSelector((state) => state.users.regLoading);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(RegisterUser(data));
      console.log(response.type);
      if (response.type=== "user/RegisterUser/fulfilled"){
       await dispatch(LoginUser(data));
        nav("/datos-personales");
      }
      else {
        Swal.fire(
          "Hubo un error al registrarse, inténtelo nuevamente",
          "",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 h-screen w-screen flex items-center justify-center">
      <div className=" flex flex-col gap-10 justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className="lg:w-[500px] xs:w-[94vw] md:w-[450px] bg-primary p-4 rounded-3xl shadow-black shadow-2xl z-10">
          <h2 className="text-6xl font-bold underline text-center italic text-white mb-[1.8em] mt-5">
            Registro
          </h2>
          <div className="flex justify-center flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="text-4xl text-white"
                />
                <input
                  className="border p-2 rounded w-[17em]"
                  type="number"
                  min={10000000}
                  max={99999999}
                  placeholder="Ingrese su DNI"
                  {...register("dni", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^\d{8}$/,
                      message: "El DNI debe tener 8 números",
                    },
                  })}
                  onBlur={() => handleBlur("dni")}
                />
              </div>
              {errors.dni && (
                <p className="h-0 text-red-500">{errors.dni.message}</p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-row">
              <div className="flex items-center flex-col">
                <div className="relative flex-grow items-center ">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-4xl text-white mr-2"
                  />
                  <input
                    className="border p-2 rounded w-[17em]"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password", {
                      required: "Campo obligatorio",
                    })}
                    onBlur={() => handleBlur("password")}
                  />
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="h-0 text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-row">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-4xl text-white mr-2"
                  />
                  <div className="relative flex-grow">
                    <input
                      className="border p-2 rounded w-[17em]"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...register("confirm_password", {
                        required: "Campo obligatorio",
                        validate: (val) => {
                          if (watch("password") != val) {
                            return "Las contraseñas no coinciden";
                          }
                        },
                      })}
                      onBlur={() => handleBlur("confirm_password")}
                    />
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
                {errors.confirm_password && (
                  <p className="h-0 mb-10 text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center py-1">
              <Link to={"/datos-personales"}>
                <button
                  className="font-bold w-[8em] border-none rounded-2xl p-3  bg-button-100 hover:bg-button-100/80 text-white text-2xl"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  {loading === true ? "Cargando..." : "Registrarse"}
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link to={"/"}>
                <button className="font-bold w-[8em] border-none rounded-2xl p-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl">
                  Atrás
                </button>
              </Link>
            </div>
          </div>
        </form>
        <img
          src={bottonWave}
          className=" absolute z-[1] bottom-0 left-0 w-[40%]"
        />
      </div>
    </div>
  );
};

export default Register;
