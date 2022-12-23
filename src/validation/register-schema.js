import Yup from "./validate"

export const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .required()
        .email(),
    username: Yup.string()
        .required(),
    full_name: Yup.string()
        .required(),
    password: Yup.string()
        .required()
})


