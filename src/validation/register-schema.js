import Yup from "./validate"

export const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .required()
        .email(),
    username: Yup.string()
        .required()
        .test({
            message:'Geçerli bir kullanıcı adı girin',
            test:str => /^[a-z0-9\.\_]+$/i.test(str)
        }),

    full_name: Yup.string()
        .required(),
    password: Yup.string()
        .required()
})


