"use client";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  name: string;
  email: string;
};
enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}
interface IFormInput {
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  addres: string;
  gender: GenderEnum;
}
interface IFormType {
  label: string;
  inputName: string;
  placeholder: string;
  required: boolean;
}
const dynamicForm: IFormType = [
  {
    label: "firstName",
  },
];
export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <input
          className=" border-2"
          style={{ width: 400, height: 30 }}
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-fuchsia-950">This name is required</span>
        )}
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
