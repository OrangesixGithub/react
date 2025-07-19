import React from "react";
import { RadioProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";

type Props = {
    core: RadioProps<"HookForm">
};

/**
 * Core - `RadioHookForm`
 * Define o componente utilizando o HookForm
 */
export function RadioHookForm({ core, ...props }: RadioProps<"HookForm"> & Props) {
    let align = !props.align || props.align === "row" ? "flex-row" : "flex-column";

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return <div className="w-100 d-flex flex-column">
                <div className={`w-100 d-flex gap-3 ${align}`}>
                    {props.options.map((item) => {
                            return (
                                <div className="d-flex align-items-center form-check"
                                     key={item.value}>
                                    <input checked={item.value === field.value}
                                           className={"form-check-input " + (!errors[props.name] ? "" : "is-invalid")}
                                           disabled={props.disabled || item.disabled}
                                           id={props.name + "-" + item.value}
                                           type="radio"
                                           value={item.value}
                                           onChange={field.onChange}/>
                                    <label className="ms-2 form-check-label"
                                           htmlFor={props.name + "-" + item.value}>{item.label}</label>
                                </div>
                            );
                        }
                    )}
                </div>
                <InputFeedback {...props}
                               errors={errors}/>
            </div>;
        }}
                    control={props.control}
                    name={props.name}
                    rules={{ required: !props.required ? false : "Campo obrigatório" }}/>
    );
}