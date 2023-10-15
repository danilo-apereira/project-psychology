import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const signup = (email, nome, cpf, telefone, senha) => {
    return axios.post(API_URL + 'signup', {
        email,
        nome,
        cpf,
        telefone,
        senha
    });
};

const signin = (cpf, senha) => {
    return axios
        .post(API_URL, 'signin', {
            cpf,
            senha
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

export default { signup, signin, logout };
