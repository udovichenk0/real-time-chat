import * as yup from "yup";

export const schema = yup.object().shape({
    username: yup.string().min(6).max(20).required(),
    password: yup.string().min(8).max(32).required(),
});
