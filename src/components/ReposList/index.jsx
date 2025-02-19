import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                setTimeout(() => {
                    if (resJson.hasOwnProperty("status") && resJson.status == "404") {
                        setErro(`O usuário ${nomeUsuario} não foi encontrado`);
                    } else {
                        setRepos(resJson);
                    }
                    setEstaCarregando(false);
                }, 3000);
            })
            .catch(error => {
                console.log("AQUI" + error);
            })
    }, [nomeUsuario])

    return (
        <div className="container" >
            {
                estaCarregando 
                ? (
                    <h1>Carregando...</h1>
                ) : erro ? (
                    <h1>{erro}</h1>
                ) : (
                    <ul className={styles.list}>
                        {repos.map(repositorio => (
                            <li className={styles.listItem} key={repositorio.id}>
                                <div className={styles.itemName}>
                                    <b>Nome:</b>
                                    {repositorio.name}
                                </div>
                                <div className={styles.itemLanguage}>
                                    <b>Linguagem:</b>
                                    {repositorio.language}
                                </div>
                                <a className={styles.itemLink} target="_blank" href={repositorio.html_url}>Visitar no Github</a>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default ReposList;