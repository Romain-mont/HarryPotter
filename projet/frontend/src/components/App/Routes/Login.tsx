import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../contexts/AuthContext';

import { Role } from '../../../@types/role';
import { Wizard } from '../../../@types/wizard';

import style from './Login.module.scss';

const Login: React.FC = () => {
  const { token, isAuthenticated, login } = useAuthContext();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [wizard, setWizard] = useState<Wizard|null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/wizard-roles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();

        setRoles(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Erreur lors de la récupération des rôles.');
      }
    }

    if ( token ) {
      fetchRoles();
    }
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const wizard = await login(email, password);

      if (wizard) {
        setWizard(wizard);
        setError('');
        
        return;
      } else {
        setError('Erreur lors de la connexion.');
      }
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
    }

    setLoading(false);
  };

  const onSelectRole = async (role: Role) => {
    console.log('Vous avez choisi le rôle ', role.name);
  }

  return (
    <main className={style.login}>
      <img src="/poudlard.png" alt="" />

      {isAuthenticated && wizard ? (
        <>
          <h2>Bienvenue {wizard.firstname}</h2>
          <label>Continuer en tant que</label>
        </>
      ) : (
        <h2>Connexion</h2>
      )}

      {isAuthenticated === false && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              aria-label="Adresse email"
              placeholder="Identifiant : email"
              defaultValue="Dumbledore@poudlard.co.uk"
              required
            />
            <label htmlFor="email">Adresse email</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              aria-label="mot de passe"
              placeholder="Mot de passe"
              defaultValue="poudlard"
              required
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <input
            type="submit"
            value={loading ? 'Chargement...' : 'Soumettre'}
            aria-label="soumission formulaire"
            disabled={loading}
          />
        </form>
      )}

      {isAuthenticated === true && roles.length && roles.map((role) => (
        <button key={role.id} onClick={() => onSelectRole(role)}>{role.name}</button>
      ))}

      {error && (
        <div className={style.error}>
          <h3>Oups !</h3>
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}

export default Login;