import XlsxToJson from "../components/XlsxToJson";

const Home = () => {

    const jsonToTxT = (json) => {
        try {
        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob([document.getElementById('myInput').innerText], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "ResultFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }, 1000);
    }
    catch (error) {
        console.error(error);
        return (
            <p> {error} </p>
        );
    }
}

 return(
    <div className="page-shell">
        <section className="hero-section">
            <div>
                <p className="eyebrow">Conversão de planilha</p>
                <h1>Movimento de terceiro de débito</h1>
                <p className="hero-copy">Faça o upload da planilha, visualize o conteúdo formatado e baixe o TXT final de forma mais organizada.</p>
            </div>
            <button className="hero-button" onClick={jsonToTxT}>Baixar .txt</button>
        </section>
        <section className="content-card">
            <XlsxToJson />
        </section>
    </div>
 );
}

export default Home;
