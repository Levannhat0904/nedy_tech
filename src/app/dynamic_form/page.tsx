"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSection, InputProps } from "./form";
export const formConfig: { [K in FormSection]: InputProps[] } = {
  register: [
    {
      label: "New username",
      type: "text",
      name: "username",
      placeholder: "New username",
      value: "",
      validations: [
        {
          type: "minLength",
          value: 3,
          message: "Min. 3 characters",
        },
        {
          type: "required",
          message: "Username is required",
        },
      ],
    },
    {
      label: "New Password",
      type: "password",
      name: "password",
      placeholder: "New password",
      value: "",
      validations: [
        {
          type: "required",
          message: "Password is required",
        },
        {
          type: "minLength",
          value: 5,
          message: "Min. 5 characters",
        },
      ],
    },
    {
      label: "Repeat your password",
      type: "password",
      name: "repeat_password",
      placeholder: "Repeat password",
      value: "",
      validations: [
        {
          type: "required",
          message: "Repeat password is required",
        },
        {
          type: "minLength",
          value: 5,
          message: "Min. 5 characters",
        },
        {
          type: "oneOf",
          message: "Passwords must match",
          ref: "password",
        },
      ],
    },
  ],
};
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();
  const onSubmit: SubmitHandler<InputProps> = (data) => console.log(data);
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {formConfig.register.map((field) => (
          <div
            key={field.name}
            className="flex w-[600px] justify-items-center flex-row gap-2"
          >
            <label className="flex-1 basis-1/3">{field.label}</label>
            <div>
              <input
                className=" border-2 flex-1 basis-2/3"
                style={{ width: 400, height: 30 }}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name as "name", {
                  required:
                    field.validations?.some((v) => v.type === "required") &&
                    field.validations.find((v) => v.type === "required")
                      ?.message,
                  minLength: field.validations?.find(
                    (v) => v.type === "minLength"
                  )?.value as number,
                })}
              />
              {errors[field.name as keyof InputProps] && (
                <span className="text-red-500 block">
                  {errors[field.name as keyof InputProps]?.message as string}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="mx-auto">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 block w-20 border"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

{
  /* Render các trường trong "another" */
}
{
  /* {formConfig.another.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label>{field.label}</label>

          {field.type === "select" ? (
            <select
              {...register(field.name, {
                required: field.validations[0]?.message,
              })}
            >
              <option value="">Select</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.desc}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            field.options?.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.name, {
                    required: field.validations[0]?.message,
                  })}
                />
                {option.desc}
              </label>
            ))
          ) : field.type === "checkbox" ? (
            <label>
              <input
                type="checkbox"
                {...register(field.name, {
                  required: field.validations[0]?.message,
                })}
              />
              {field.label}
            </label>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, {
                required: field.validations[0]?.message,
              })}
            />
          )}

          {errors[field.name] && (
            <span className="text-red-500">{errors[field.name].message}</span>
          )}
        </div>
      ))} */
}
