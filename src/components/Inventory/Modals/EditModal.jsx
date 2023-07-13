import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { getProducts, putProducts } from '../../store/features/inventorySlice';
import Swal from 'sweetalert2'
import { format } from "date-fns";
const EditModal = ({selectedRow, setShowModal}) => {
  const fechaParts = selectedRow.vencimiento.split("/");
  const vencimientoDate = new Date(
    parseInt(fechaParts[2]),
    parseInt(fechaParts[1]),
    parseInt(fechaParts[0])
  );
  
  const formattedVencimiento = vencimientoDate.toISOString().substr(0, 10);
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
      } = useForm();
    
      const onSubmit = async (data) => {
        try {
          // Transformar la fecha de vencimiento
          const fechaParts = data.vencimiento.split("-");
          const year = parseInt(fechaParts[0]);
          const month = parseInt(fechaParts[1]) - 1; // Restar 1 para ajustar el valor del mes
          const day = parseInt(fechaParts[2]);
          const fechaVencimiento = new Date(year, month, day);
      
          // Formatear la fecha en formato dia mes año
          const fechaFormateada = format(fechaVencimiento, "dd/MM/yyyy");//usando format de date-fns
      
          const newData = { ...data, vencimiento: fechaFormateada };
          const result = await Swal.fire({
            title: "¿Quieres modificar este producto? Estos son tus cambios",
            html: `
              <div>Nombre: <strong>${newData.nombre}</strong></div>
              <div>Cantidad: <strong>${newData.cantidad}</strong></div>
              <div>Vencimiento: <strong>${newData.vencimiento}</strong></div>
              <div>Lote: <strong>${newData.lote}</strong></div>
              <div>Stock Mínimo: <strong>${newData.stockMinimo}</strong></div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, modificar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          });
          if (result.isConfirmed) {
            setShowModal(false);
            const response = await dispatch(putProducts(newData));
          } else {
            Swal.fire("Los cambios no se realizaron", "", "info");
          }
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
    <div className="bg-white border-solid border-primary border-2 h-[50%] w-[50%] rounded flex flex-col items-center">
      <h2 className="flex justify-center text-xl">Editando producto: <span className=" underline text-black">{selectedRow.nombre}</span></h2>
      <section>
        <form>
        <section className='flex flex-row justify-center items-center gap-5 mt-[10%]'>
         <article className='flex flex-col gap-1 w-[40%]'>
         <label htmlFor="">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            defaultValue={selectedRow.nombre}
            {...register("nombre")}
          />
          <label htmlFor="">Cantidad</label>
          <input
            type="number"
            min="0"
            id="cantidad"
            placeholder="cantidad"
            defaultValue={selectedRow.cantidad}
            className='bg-slate-300 border-solid border rounded-sm border-black'
            {...register("cantidad")}
          />
          <label htmlFor="">Stock minimo</label>
          <input
            type="number"
            min="0"
            id="stockMin"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            placeholder="stockMin"
            defaultValue={selectedRow.stockMinimo}
            {...register("stockMinimo")}       
          />
        </article>
        <article className='flex flex-col gap-1 w-[40%]'>
        <label htmlFor="">Lote</label>
        <input
            type="text"
            id="lote"
            placeholder="Lote"
            defaultValue={selectedRow.lote}
            className='bg-slate-300 border-solid border rounded-sm border-black'
            {...register("lote")}
          />
          <label htmlFor="">Fecha de vencimiento</label>
          <input
  type="date"
  id="vencimiento"
  placeholder="vencimiento"
  defaultValue={formattedVencimiento}
  className='bg-slate-300 border-solid border rounded-sm border-black'
  {...register("vencimiento")}       
/>
        </article>
       </section>
        </form>
      </section>
      <div className='flex mt-auto mb-[5%] justify-center gap-4 items-center'>
      <button className="p-1 bg-red-900 hover:bg-red-600 rounded-lg" onClick={() => setShowModal(false)}>Cancelar</button>
      <button
       className="p-1 bg-blue-500 hover:bg-blue-900 rounded-lg" 
       type='submit'
       onClick={handleSubmit((data) => onSubmit({ ...data, id: selectedRow.id }))}
       
       > Modificar </button>
      </div>
    </div>
  </div>
  )
}

export default EditModal