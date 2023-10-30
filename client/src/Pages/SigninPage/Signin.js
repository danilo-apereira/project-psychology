import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import Toast from '../../components/Toast/Toast';

import '../../assets/styles/auth/auth.css';
import '../../components/Buttons/auth/buttonAuth.css';
import logo from '../../assets/images/logo.png';

import { signin } from '../../redux/actions/auth';

function Signin() {
    document.title = 'Autentique-se / Psychology';

    useEffect(() => {
        const themeToggler = document.querySelector(".theme-toggler");

        const handleThemeTogglerClick = () => {
            document.body.classList.toggle('dark-theme-variables');
            themeToggler.querySelector('span:nth-child(1)')
            .classList.toggle('active');
            themeToggler.querySelector('span:nth-child(2)')
            .classList.toggle('active');
        };

        themeToggler.addEventListener('click', handleThemeTogglerClick);

        return () => {
            themeToggler.removeEventListener('click', handleThemeTogglerClick);
        };
    }, []);

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        cpf: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        cpf: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const hasErrors = Object.values(errors).some((error) => error !== '');
    const hasFilledUserData = () => formData.cpf !== '' && formData.password !== '';

    const formatCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }

        if (cpf.length <= 11) {
            cpf = cpf.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, function (match, p1, p2, p3, p4) {
                let formatted = p1;
                if (p2) formatted += '.' + p2;
                if (p3) formatted += '.' + p3;
                if (p4) formatted += '-' + p4;
                return formatted;
            });
        }

        return cpf.slice(0, 14);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'cpf') {
            const formattedCPF = formatCPF(value);

            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: formattedCPF
            }));
        } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value
            }));
        }

        if (value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Este campo é obrigatório'
            }));

            return;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (formData.cpf.length !== 14) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              cpf: 'Digite um CPF válido'
            }));

            return;
        }

        setLoading(true);

        dispatch(signin(formData.cpf, formData.password))
            .then(() => {
                setTimeout(function() {
                    navigate('/');
                    window.location.reload();
                }, 3000);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    if (isLoggedIn)
        return <Navigate to="/" />;

    return (
        <div className="container">
            <div>
                {loading ? (<Loading bool={loading} />) : null}
            </div>

            <div>
                <Toast type="info" message={message} />
            </div>

            <div className="header">
                <div className="theme-toggler">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>

                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>

            <form onSubmit={handleFormSubmit}>
                <h1>Bem-vindo</h1>

                <div className={` field ${errors.cpf ? 'error' : ''}`}>
                    <input
                        className={errors.cpf ? 'error' : ''}
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <span className={errors.cpf ? 'error' : ''}></span>
                    <label htmlFor="cpf">CPF</label>
                    {errors.cpf && <div className="error-msg">{errors.cpf}</div>}
                </div>

                <div className={` field ${errors.password ? 'error' : ''}`}>
                    <input
                        className={errors.password ? 'error' : ''}
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <span className={errors.password ? 'error' : ''}></span>
                    <label htmlFor="password">Senha</label>
                    {errors.password && <div className="error-msg">{errors.password}</div>}
                </div>

                <div className="auth">Não possui uma conta? <Link className="sign-link" to="/auth/signup">Registre-se</Link></div>
                <div className="auth text-muted"><Link className="sign-link" to="/forgot-password">Esqueceu sua senha?</Link></div>

                <button
                    className={`btn-standard ${loading || hasErrors || !hasFilledUserData () ? 'disabled-btn' : ''}`}
                    disabled={loading || hasErrors || !hasFilledUserData ()}
                    onClick={handleFormSubmit}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Signin;
